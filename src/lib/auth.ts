// Auth utilities - PIN-based auth with JWT
// Uses Web Crypto API (no Node.js crypto)

export async function createJWT(payload: any, secret: string): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' }
  const now = Math.floor(Date.now() / 1000)
  const data = { ...payload, iat: now, exp: now + 86400 * 7 } // 7 days

  const encoder = new TextEncoder()
  const headerB64 = btoa(JSON.stringify(header)).replace(/=/g, '')
  const payloadB64 = btoa(JSON.stringify(data)).replace(/=/g, '')
  const message = `${headerB64}.${payloadB64}`

  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message))
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(signature))).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')

  return `${message}.${sigB64}`
}

export async function verifyJWT(token: string, secret: string): Promise<any | null> {
  try {
    const [headerB64, payloadB64, sigB64] = token.split('.')
    if (!headerB64 || !payloadB64 || !sigB64) return null

    const encoder = new TextEncoder()
    const message = `${headerB64}.${payloadB64}`

    const key = await crypto.subtle.importKey(
      'raw', encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
    )

    const sigStr = atob(sigB64.replace(/-/g, '+').replace(/_/g, '/'))
    const sigArray = new Uint8Array(sigStr.length)
    for (let i = 0; i < sigStr.length; i++) sigArray[i] = sigStr.charCodeAt(i)

    const valid = await crypto.subtle.verify('HMAC', key, sigArray, encoder.encode(message))
    if (!valid) return null

    const payload = JSON.parse(atob(payloadB64))
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null

    return payload
  } catch {
    return null
  }
}
