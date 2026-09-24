/**
 * 記事内に出す広告（アフィリエイト）の設定
 * ──────────────────────────────────────────────
 * ・url が空の案件は、記事上に一切表示されない（空の広告枠を出さないため）
 * ・ASPの承認が下りたら url を入れるだけで公開される
 * ・主収入は自社フォームからの業者紹介（1件6,000円）なので、
 *   記事では「自社の見積もりCTA → その下に広告」の順で置く
 * ・表示には必ず「PR」を付ける（景品表示法のステルスマーケティング規制）
 */

export interface Offer {
  /** 枠の見出し */
  heading: string
  /** 補足の一文。読者にとっての利点を書く */
  body: string
  /** ボタンの文言 */
  cta: string
  /** ASPの成果計測URL。空のあいだは表示されない */
  url: string
}

export const OFFERS: Record<string, Offer> = {
  // 申請中：「遺品整理」
  ihinseiri_quote: {
    heading: '複数社の見積もりを、まとめて取りたい方へ',
    body: '遺品整理の費用は業者によって差が出ます。相場を確かめるだけでも、比較しておく意味はあります。',
    cta: '一括見積もりを依頼する',
    url: '',
  },
  // 申請中：「終活」
  shukatsu: {
    heading: '終活の準備を、何から始めるか迷っている方へ',
    body: '生前整理、相続、お墓、保険。やることを整理するところから相談できるサービスです。',
    cta: '終活の相談先を見る',
    url: '',
  },
  // 未申請（承認後にURLを入れる）
  kaitori: {
    heading: '処分する前に、値がつくか確かめる',
    body: '家具・家電・骨董品などは、買取に回すことで処分費用を抑えられる場合があります。',
    cta: '買取の査定を依頼する',
    url: '',
  },
  souzoku: {
    heading: '相続の手続きに不安がある方へ',
    body: '期限のある手続きもあります。早い段階で専門家に確認しておくと、慌てずに進められます。',
    cta: '相続の相談先を探す',
    url: '',
  },
  fudosan: {
    heading: '空き家をどうするか決めかねている方へ',
    body: '売る・貸す・持ち続ける。判断の前に、いまの価値を把握しておくと選びやすくなります。',
    cta: '無料査定を依頼する',
    url: '',
  },
}

/** 記事ごとに、文脈が合う案件だけを出す（無関係な広告は出さない） */
export const ARTICLE_OFFER: Record<string, keyof typeof OFFERS> = {
  'ihinseiri-hiyou-souba-kobe': 'ihinseiri_quote',
  'ihinseiri-gyousha-erabikata-kobe': 'ihinseiri_quote',
  'gomiyashiki-hiyou-kobe': 'ihinseiri_quote',
  'tokushu-seisou-kobe': 'ihinseiri_quote',
  'sodai-gomi-gyousha-chigai-kobe': 'ihinseiri_quote',
  '5tips-funeral-director': 'ihinseiri_quote',
  'ihinseiri-kaitori-hiyou-sageru': 'kaitori',
  'seizen-seiri-susumekata-kobe': 'shukatsu',
  'oya-no-ie-katazuke-tejun': 'shukatsu',
  'ihinseiri-itsukara-kobe': 'souzoku',
  'akiya-jissou-kobe': 'fudosan',
}

export function offerFor(slug: string): Offer | null {
  const key = ARTICLE_OFFER[slug]
  if (!key) return null
  const offer = OFFERS[key]
  return offer && offer.url ? offer : null
}
