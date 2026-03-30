// Order Routes - Create, manage, track orders
import { Hono } from 'hono'
import { getServiceClient } from '../lib/supabase'
import type { Env } from '../index'

export const ordersRoutes = new Hono<{ Bindings: Env }>()

// List orders
ordersRoutes.get('/', async (c) => {
  try {
    const db = getServiceClient(c.env)
    const status = c.req.query('status') || ''
    let query = 'order=created_at.desc'
    if (status) query += `&status=eq.${status}`
    
    const res = await db.select('orders', query)
    return c.json({ success: true, data: res.data || [] })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Get single order
ordersRoutes.get('/:id', async (c) => {
  try {
    const db = getServiceClient(c.env)
    const res = await db.select('orders', `id=eq.${c.req.param('id')}`, true)
    if (!res.data) return c.json({ success: false, message: 'Not found' }, 404)
    return c.json({ success: true, data: res.data })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Create order
ordersRoutes.post('/', async (c) => {
  try {
    const db = getServiceClient(c.env)
    const body = await c.req.json()
    
    const order = {
      customer_name: body.customer_name,
      customer_phone: body.customer_phone,
      items: JSON.stringify(body.items || []),
      total_amount: body.total_amount || 0,
      status: 'pending',
      notes: body.notes || '',
      source: body.source || 'manual'
    }

    const res = await db.insert('orders', order)
    if (res.error) return c.json({ success: false, message: res.error }, 400)
    return c.json({ success: true, data: res.data })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Update order status
ordersRoutes.put('/:id', async (c) => {
  try {
    const db = getServiceClient(c.env)
    const body = await c.req.json()
    const res = await db.update('orders', `id=eq.${c.req.param('id')}`, body)
    if (res.error) return c.json({ success: false, message: res.error }, 400)
    return c.json({ success: true, data: res.data })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Delete order
ordersRoutes.delete('/:id', async (c) => {
  try {
    const db = getServiceClient(c.env)
    await db.delete('orders', `id=eq.${c.req.param('id')}`)
    return c.json({ success: true })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})
