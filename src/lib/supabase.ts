// Supabase REST client for Cloudflare Workers (no node deps)
// Uses fetch API only - compatible with edge runtime

export interface SupabaseResponse<T = any> {
  data: T | null
  error: string | null
  count?: number
}

export class SupabaseClient {
  private url: string
  private key: string
  
  constructor(url: string, key: string) {
    this.url = url.replace(/\/$/, '')
    this.key = key
  }

  private async request<T>(
    table: string,
    method: string = 'GET',
    options: {
      body?: any
      query?: string
      headers?: Record<string, string>
      single?: boolean
      count?: boolean
    } = {}
  ): Promise<SupabaseResponse<T>> {
    try {
      const queryStr = options.query || ''
      const url = `${this.url}/rest/v1/${table}${queryStr ? '?' + queryStr : ''}`
      
      const headers: Record<string, string> = {
        'apikey': this.key,
        'Authorization': `Bearer ${this.key}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
      
      if (options.single) {
        headers['Accept'] = 'application/vnd.pgrst.object+json'
      }
      if (options.count) {
        headers['Prefer'] = 'count=exact'
      }
      if (method === 'POST') {
        headers['Prefer'] = headers['Prefer'] 
          ? headers['Prefer'] + ', return=representation' 
          : 'return=representation'
      }
      if (method === 'PATCH' || method === 'DELETE') {
        headers['Prefer'] = 'return=representation'
      }

      const res = await fetch(url, {
        method,
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined
      })

      if (!res.ok) {
        const err = await res.text()
        return { data: null, error: `${res.status}: ${err}` }
      }

      const contentRange = res.headers.get('content-range')
      const count = contentRange ? parseInt(contentRange.split('/')[1]) : undefined

      const data = await res.json() as T
      return { data, error: null, count }
    } catch (e: any) {
      return { data: null, error: e.message }
    }
  }

  async select<T = any>(table: string, query: string = '', single = false): Promise<SupabaseResponse<T>> {
    return this.request<T>(table, 'GET', { query: `select=*&${query}`, single })
  }

  async selectCount(table: string, query: string = ''): Promise<SupabaseResponse<any[]>> {
    return this.request(table, 'GET', { query: `select=*&${query}`, count: true })
  }

  async insert<T = any>(table: string, data: any): Promise<SupabaseResponse<T>> {
    return this.request<T>(table, 'POST', { body: data, single: true })
  }

  async update<T = any>(table: string, query: string, data: any): Promise<SupabaseResponse<T>> {
    return this.request<T>(table, 'PATCH', { query, body: data })
  }

  async delete(table: string, query: string): Promise<SupabaseResponse<any>> {
    return this.request(table, 'DELETE', { query })
  }

  async rpc<T = any>(fn: string, params: any = {}): Promise<SupabaseResponse<T>> {
    try {
      const res = await fetch(`${this.url}/rest/v1/rpc/${fn}`, {
        method: 'POST',
        headers: {
          'apikey': this.key,
          'Authorization': `Bearer ${this.key}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      })
      if (!res.ok) {
        const err = await res.text()
        return { data: null, error: `${res.status}: ${err}` }
      }
      const data = await res.json() as T
      return { data, error: null }
    } catch (e: any) {
      return { data: null, error: e.message }
    }
  }
}

export function createClient(url: string, key: string): SupabaseClient {
  return new SupabaseClient(url, key)
}

export function getServiceClient(env: { SUPABASE_URL: string; SUPABASE_SERVICE_KEY: string }): SupabaseClient {
  return new SupabaseClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY)
}

export function getAnonClient(env: { SUPABASE_URL: string; SUPABASE_ANON_KEY: string }): SupabaseClient {
  return new SupabaseClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
}
