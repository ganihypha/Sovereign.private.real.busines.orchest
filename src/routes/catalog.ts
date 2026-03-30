// Public Catalog Routes (no auth required)
import { Hono } from 'hono'
import { getServiceClient } from '../lib/supabase'
import type { Env } from '../index'

export const catalogRoutes = new Hono<{ Bindings: Env }>()

// Public catalog by slug
catalogRoutes.get('/:slug', async (c) => {
  try {
    const db = getServiceClient(c.env)
    const slug = c.req.param('slug')
    const res = await db.select('products', 'is_active=eq.true&order=created_at.desc')
    return c.json({ success: true, data: res.data || [], store: slug })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})
