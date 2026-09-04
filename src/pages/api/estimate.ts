import type { APIRoute } from 'astro'

/**
 * 見積もり相談フォームの受け口。
 *
 * これまでフォームは送信処理を持たず、1.2秒後に「送信完了」と表示するだけで、
 * 入力内容はどこにも届いていなかった。ここで実際にメール送信する。
 *
 * 環境変数（Vercel側で設定）:
 *   RESEND_API_KEY … Resend の APIキー（必須。未設定なら送信せずエラーを返す）
 *   TO_EMAIL       … 受信先（未設定時は下記の既定値）
 *   FROM_EMAIL     … 送信元（Resendで認証済みドメインのアドレス）
 */

export const prerender = false

const TO_EMAIL_DEFAULT = 'adachi@slicebar1947.com'
// 認証済みドメインが未設定でも動くよう、Resendの共有送信元を既定にする
const FROM_EMAIL_DEFAULT = 'onboarding@resend.dev'

// 簡易レートリミット（IP単位）。同一IPからの連投を防ぐ
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 3
const RATE_WINDOW = 60_000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

/** メール本文に使うため、制御文字と過長入力を落とす */
function clean(v: unknown, max = 1000): string {
  return String(v ?? '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .trim()
    .slice(0, max)
}

function escapeHtml(s: string): string {
  return s.replace(/[<>&"']/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c] as string)
  )
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' },
    })

  // 1. 参照元チェック（他サイトからの投稿を弾く）
  const origin = request.headers.get('origin') || ''
  const referer = request.headers.get('referer') || ''
  const allowed = ['kobe-kataduke-support.jp', 'kobe-kataduke-astro', 'localhost']
  if (!allowed.some((h) => origin.includes(h) || referer.includes(h))) {
    return json({ ok: false, error: 'Forbidden' }, 403)
  }

  // 2. レートリミット
  if (!checkRateLimit(clientAddress || 'unknown')) {
    return json({ ok: false, error: '送信が続けて行われました。1分ほど置いて再度お試しください。' }, 429)
  }

  // 3. 入力の取得
  let data: Record<string, unknown> = {}
  try {
    const ct = request.headers.get('content-type') || ''
    if (ct.includes('application/json')) {
      data = await request.json()
    } else {
      const fd = await request.formData()
      fd.forEach((v, k) => {
        // service はチェックボックスで複数来る
        if (k in data) data[k] = `${data[k]}, ${v}`
        else data[k] = v
      })
    }
  } catch {
    return json({ ok: false, error: '入力内容を読み取れませんでした。' }, 400)
  }

  // 4. ハニーポット（自動投稿対策）。値が入っていれば静かに成功を返す
  if (clean(data._hp)) return json({ ok: true })

  const name = clean(data.name, 100)
  const phone = clean(data.phone, 40)
  const roomType = clean(data.roomType, 60)
  const service = clean(data.service, 200)
  const message = clean(data.message, 2000)

  // 5. 必須項目
  const errors: string[] = []
  if (!name) errors.push('お名前をご入力ください。')
  if (!phone) errors.push('ご連絡先をご入力ください。')
  if (!roomType) errors.push('間取りを選択してください。')
  if (errors.length) return json({ ok: false, error: errors.join('\n') }, 400)

  // 6. 送信
  const apiKey = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY
  if (!apiKey) {
    // キー未設定のまま「送信できた」と見せない。届いていないことを明示する。
    console.error('[estimate] RESEND_API_KEY が未設定のため送信できません')
    return json(
      { ok: false, error: 'ただいまフォームからの送信を受け付けられません。お手数ですがLINEからご相談ください。' },
      503
    )
  }

  const to = import.meta.env.TO_EMAIL || process.env.TO_EMAIL || TO_EMAIL_DEFAULT
  const from = import.meta.env.FROM_EMAIL || process.env.FROM_EMAIL || FROM_EMAIL_DEFAULT

  const rows: [string, string][] = [
    ['お名前', name],
    ['ご連絡先', phone],
    ['間取り', roomType],
    ['ご希望の作業', service || '（未選択）'],
    ['ご相談内容', message || '（記入なし）'],
  ]

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)
    const result = await resend.emails.send({
      from,
      to,
      replyTo: undefined,
      subject: `【見積もり相談】${name} 様（${roomType}）`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
      html: `
        <h2 style="font-family:sans-serif">見積もり相談が届きました</h2>
        <table style="font-family:sans-serif;border-collapse:collapse">
          ${rows
            .map(
              ([k, v]) =>
                `<tr><th align="left" style="padding:6px 12px;background:#f0f4fa;white-space:nowrap">${k}</th>` +
                `<td style="padding:6px 12px">${escapeHtml(v).replace(/\n/g, '<br>')}</td></tr>`
            )
            .join('')}
        </table>
        <p style="font-family:sans-serif;color:#666;font-size:12px">神戸お片付けサポートセンター（自動送信）</p>
      `,
    })

    if ((result as any)?.error) {
      console.error('[estimate] Resend error:', (result as any).error)
      return json(
        { ok: false, error: '送信に失敗しました。お手数ですがLINEからご相談ください。' },
        502
      )
    }
    return json({ ok: true })
  } catch (e) {
    console.error('[estimate] 送信例外:', e)
    return json({ ok: false, error: '送信に失敗しました。お手数ですがLINEからご相談ください。' }, 502)
  }
}
