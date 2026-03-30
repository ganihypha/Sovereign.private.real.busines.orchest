// Auth Routes - PIN-based login
import { Hono } from 'hono'
import { createJWT, verifyJWT } from '../lib/auth'
import type { Env } from '../index'

export const authRoutes = new Hono<{ Bindings: Env }>()

// Login with master PIN
authRoutes.post('/login', async (c) => {
  try {
    const { pin } = await c.req.json()
    if (!pin) return c.json({ success: false, message: 'PIN required' }, 400)
    if (pin !== c.env.MASTER_PIN) return c.json({ success: false, message: 'Invalid PIN' }, 401)

    const token = await createJWT({ role: 'founder', sub: 'sovereign-admin' }, c.env.JWT_SECRET)
    return c.json({ success: true, token, role: 'founder' })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Verify token
authRoutes.get('/verify', async (c) => {
  try {
    const authHeader = c.req.header('Authorization')
    if (!authHeader?.startsWith('Bearer ')) return c.json({ success: false, message: 'No token' }, 401)
    const payload = await verifyJWT(authHeader.slice(7), c.env.JWT_SECRET)
    if (!payload) return c.json({ success: false, message: 'Invalid token' }, 401)
    return c.json({ success: true, user: payload })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})
