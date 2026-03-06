#!/usr/bin/env python3
"""
神戸お片付けサポートセンター - SEO記事自動生成スクリプト
Firecrawl + Google Gemini（無料）で記事を生成してSanityに投稿

使い方:
  python3 generate_article.py --topic "三宮でおすすめの遺品整理業者5選"
  python3 generate_article.py --topic "神戸市のゴミ屋敷清掃料金相場" --no-crawl --dry-run

必要な設定（.envファイル）:
  GEMINI_API_KEY=  ← Google AI Studio から無料取得 (aistudio.google.com)
  FIRECRAWL_API_KEY=fc-24818e9e93eb434d8b40bda6d6447fa8
  SANITY_API_TOKEN=  ← Sanity.io > Settings > API > Tokens
  SANITY_PROJECT_ID=mqj7r953
  SANITY_DATASET=production
"""

import os
import re
import json
import time
import argparse
import unicodedata
from datetime import date
from pathlib import Path

import requests
from firecrawl import FirecrawlApp
import google.genai as genai
from google.genai import types

# =====================================================================
# 設定読み込み
# =====================================================================
BASE_DIR = Path(__file__).parent

def load_env():
    env_path = BASE_DIR / ".env"
    if env_path.exists():
        for line in env_path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip())

load_env()

GEMINI_API_KEY    = os.environ.get("GEMINI_API_KEY", "")
FIRECRAWL_API_KEY = os.environ.get("FIRECRAWL_API_KEY", "")
SANITY_API_TOKEN  = os.environ.get("SANITY_API_TOKEN", "")
SANITY_PROJECT_ID = os.environ.get("SANITY_PROJECT_ID", "mqj7r953")
SANITY_DATASET    = os.environ.get("SANITY_DATASET", "production")
SANITY_API_URL    = f"https://{SANITY_PROJECT_ID}.api.sanity.io/v2024-03-03/data/mutate/{SANITY_DATASET}"

# Gemini モデル優先順（1.5-flashは無料枠が確実にある）
GEMINI_MODELS = [
    "gemini-2.5-flash",
    "gemini-2.5-pro",
    "gemini-1.5-flash",
]

# カテゴリマッピング
CATEGORY_MAP = {
    "遺品整理":     "isan-seiri",
    "生前整理":     "seizen-seiri",
    "ゴミ屋敷清掃": "gomiyashiki",
    "ゴミ屋敷":     "gomiyashiki",
    "特殊清掃":     "tokusu-seiou",
    "地域":         "area-guide",
    "選":           "area-guide",
    "エリア":       "area-guide",
    "料金":         "tips",
    "費用":         "tips",
    "相場":         "tips",
}

# =====================================================================
# ユーティリティ
# =====================================================================
def slugify(topic: str) -> str:
    date_str = date.today().strftime("%Y%m%d")
    ascii_part = re.sub(r"[^\w]", "", unicodedata.normalize("NFKD", topic).encode("ascii", "ignore").decode())
    return f"{ascii_part[:20].lower()}-{date_str}" if ascii_part else f"article-{date_str}"

def detect_category(topic: str) -> str:
    for keyword, cat in CATEGORY_MAP.items():
        if keyword in topic:
            return cat
    return "tips"

# =====================================================================
# Step 1: Firecrawl でローカル情報収集
# =====================================================================
def crawl_local_info(topic: str, num_sources: int = 2) -> str:
    print(f"\n📡 Firecrawl で情報収集中: '{topic}'")

    if not FIRECRAWL_API_KEY:
        print("  ⚠️  FIRECRAWL_API_KEY 未設定 - デフォルトコンテキストを使用")
        return _default_context()

    app = FirecrawlApp(api_key=FIRECRAWL_API_KEY)
    queries = [
        f"神戸市 {topic} 2025",
        f"兵庫県 {topic} 業者 選び方",
    ][:num_sources]

    combined = ""
    for q in queries:
        try:
            print(f"  🔍 {q}")
            res = app.search(q, limit=3)
            items = res.data if hasattr(res, "data") else (res if isinstance(res, list) else [])
            for item in items[:2]:
                url = getattr(item, "url", "")
                text = getattr(item, "markdown", "") or getattr(item, "content", "")
                if text:
                    combined += f"\n\n## Source: {url}\n{text[:1500]}"
        except Exception as e:
            print(f"  ⚠️  エラー: {e}")
        time.sleep(1)

    return combined[:5000] if combined else _default_context()

def _default_context() -> str:
    return """神戸市の基本情報:
- 9区構成（東灘・灘・中央・兵庫・北・長田・須磨・垂水・西）
- 六甲山系の急坂と細路地が多く、搬出作業が困難なケースあり
- 遺品整理士（NPO法人遺品整理士認定協会）の資格が信頼の目安
- 一般的な費用: 1K/3万〜、1LDK/8万〜、3LDK/15万〜
- 神戸市で遺品整理を依頼する際のポイント:
  ① 無料見積もり対応 ② 遺品整理士在籍 ③ 買取・値引きサービス"""

# =====================================================================
# Step 2: Gemini で記事生成
# =====================================================================
SYSTEM_PROMPT = """あなたは神戸市の遺品整理・ゴミ屋敷清掃の地域密着SEOライターです。

【書き方のルール】
- 読者: 神戸市周辺の50〜70代（親の遺品整理・実家のゴミ屋敷で困っている人）
- 文体: 親しみやすく、信頼感がある。押しつけがましくない
- 地名・地域の特性を具体的に使う（灘区の坂、北区の広さ、三宮のアクセスなど）
- 実際に役立つ数値・金額・所要時間を含める
- 各記事の末尾に「神戸お片付けサポートセンター」への自然なCTAを入れる

【必須出力形式（JSONのみ出力）】
{
  "title": "検索意図に合致した記事タイトル（35〜60文字）",
  "seoTitle": "SEOメタタイトル（50〜60文字）",
  "seoDescription": "メタディスクリプション（120〜160文字）",
  "excerpt": "記事リード文（100〜150文字）",
  "body": "本文（Markdown形式/## と ### 見出しを使用/2000〜3000文字）"
}"""

def generate_article_with_gemini(topic: str, context: str) -> dict:
    print(f"\n✍️  Gemini で記事生成中...")

    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY が設定されていません。\n  → https://aistudio.google.com で無料取得できます")

    client = genai.Client(api_key=GEMINI_API_KEY)

    user_prompt = f"""【テーマ】: {topic}

【参考情報（ローカル調査結果）】:
{context}

上記を踏まえ、神戸市民に役立つローカルSEO記事を作成してください。
必ずJSONフォーマットのみで出力してください（前後の説明は不要）。"""

    for model_id in GEMINI_MODELS:
        try:
            print(f"  🤖 モデル: {model_id}")
            resp = client.models.generate_content(
                model=model_id,
                contents=user_prompt,
                config=types.GenerateContentConfig(
                    system_instruction=SYSTEM_PROMPT,
                    max_output_tokens=4096,
                    temperature=0.7,
                ),
            )
            raw = resp.text.strip()

            # JSON抽出
            json_match = re.search(r'\{[\s\S]*\}', raw)
            if json_match:
                data = json.loads(json_match.group())
                data["_model"] = model_id
                print(f"  ✅ 生成完了（{model_id}）")
                return data
        except Exception as e:
            err_str = str(e)
            if "not found" in err_str.lower() or "invalid" in err_str.lower():
                print(f"  ⚠️  モデル {model_id} 利用不可 → 次を試行")
                continue
            raise

    raise RuntimeError("利用可能なGeminiモデルが見つかりません")

# =====================================================================
# Step 3: Sanity に投稿
# =====================================================================
def post_to_sanity(article: dict, topic: str, dry_run: bool = False) -> str | None:
    slug = slugify(topic)
    category = detect_category(topic)
    today = date.today().isoformat()

    # Portable Text 変換
    blocks = []
    for i, line in enumerate(article.get("body", "").split("\n")):
        line = line.strip()
        if not line:
            continue
        if line.startswith("## "):
            style, text = "h2", line[3:]
        elif line.startswith("### "):
            style, text = "h3", line[4:]
        else:
            style = "normal"
            text = re.sub(r'\*\*(.*?)\*\*', r'\1', line)
        blocks.append({
            "_type": "block",
            "_key": f"b{i}",
            "style": style,
            "children": [{"_type": "span", "_key": "s0", "text": text, "marks": []}],
            "markDefs": []
        })

    doc = {
        "_type": "blogPost",
        "_id": f"drafts.{slug}",
        "title": article.get("title", topic),
        "slug": {"_type": "slug", "current": slug},
        "publishedAt": today,
        "category": category,
        "excerpt": article.get("excerpt", ""),
        "seoTitle": article.get("seoTitle", ""),
        "seoDescription": article.get("seoDescription", ""),
        "body": blocks,
        "isAiGenerated": True,
    }

    if dry_run:
        print("\n📄 [DRY RUN] 生成ドキュメント（先頭2000文字）:")
        print(json.dumps(doc, ensure_ascii=False, indent=2)[:2000])
        return None

    if not SANITY_API_TOKEN:
        print("\n⚠️  SANITY_API_TOKEN 未設定のため DRY RUN として出力します")
        print(f"\n📝 タイトル: {doc['title']}")
        print(f"   スラッグ: {slug}")
        print(f"   カテゴリ: {category}")
        print(f"   本文ブロック数: {len(blocks)}")
        return None

    print(f"\n📤 Sanity に投稿中 (ID: drafts.{slug})...")
    resp = requests.post(
        SANITY_API_URL,
        headers={"Authorization": f"Bearer {SANITY_API_TOKEN}", "Content-Type": "application/json"},
        json={"mutations": [{"createOrReplace": doc}]},
        timeout=15,
    )

    if resp.status_code == 200:
        doc_id = resp.json().get("results", [{}])[0].get("id", "unknown")
        print(f"  ✅ 投稿完了！ID: {doc_id}")
        print(f"  🔗 Studio: https://kobe-kataduke-astro.vercel.app/admin/structure/blogPost")
        return doc_id
    else:
        print(f"  ❌ 投稿失敗 ({resp.status_code}): {resp.text[:300]}")
        return None

# =====================================================================
# メイン
# =====================================================================
def main():
    parser = argparse.ArgumentParser(description="神戸お片付けサポートセンター - AI記事生成")
    parser.add_argument("--topic", required=True, help="記事テーマ（例: 三宮でおすすめの遺品整理業者5選）")
    parser.add_argument("--num-sources", type=int, default=2, help="Firecrawl収集ソース数 (default: 2)")
    parser.add_argument("--no-crawl", action="store_true", help="Firecrawlをスキップ")
    parser.add_argument("--dry-run", action="store_true", help="Sanityへの投稿をスキップしてプレビュー")
    args = parser.parse_args()

    print("=" * 60)
    print("🏠 神戸お片付けサポートセンター - AI記事生成ツール")
    print("=" * 60)
    print(f"テーマ : {args.topic}")
    print(f"モデル : Gemini (google-genai)")
    print()

    if not GEMINI_API_KEY:
        print("❌ GEMINI_API_KEY が未設定です")
        print()
        print("【Gemini APIキーの無料取得手順】")
        print("1. https://aistudio.google.com にアクセス")
        print("2. 右上「Get API key」をクリック")
        print("3. 「Create API key」→ キーをコピー")
        print("4. .env ファイルに GEMINI_API_KEY=取得したキー を追加")
        return

    # Step 1: 情報収集
    context = _default_context() if args.no_crawl else crawl_local_info(args.topic, args.num_sources)

    # Step 2: 記事生成
    article = generate_article_with_gemini(args.topic, context)
    print(f"\n📝 タイトル: {article.get('title', 'N/A')}")

    # Step 3: 投稿
    post_to_sanity(article, args.topic, dry_run=args.dry_run)

    print("\n✅ 完了！")

if __name__ == "__main__":
    main()
