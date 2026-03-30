// Customer Routes - CRM
import { Hono } from 'hono'
import { getServiceClient } from '../lib/supabase'
import type { Env } from '../index'

export const customersRoutes = new Hono<{ Bindings: Env }>()

// List customers
customersRoutes.get('/', async (c) => {
  try {
    const db = getServiceClient(c.env)
    const search = c.req.query('search') || ''
    let query = 'order=created_at.desc'
    if (search) query += `&or=(name.ilike.*${search}*,phone.ilike.*${search}*)`
    
    const res = await db.select('customers', query)
    return c.json({ success: true, data: res.data || [] })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Create customer
customersRoutes.post('/', async (c) => {
  try {
    const db = getServiceClient(c.env)
    const body = await c.req.json()
    
    const customer = {
      name: body.name,
      phone: body.phone,
      address: body.address || '',
      city: body.city || '',
      tier: body.tier || 'bronze',
      total_orders: 0,
      total_spent: 0,
      notes: body.notes || ''
    }

    const res = await db.insert('customers', customer)
    if (res.error) return c.json({ success: false, message: res.error }, 400)
    return c.json({ success: true, data: res.data })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Update customer
customersRoutes.put('/:id', async (c) => {
  try {
    const db = getServiceClient(c.env)
    const body = await c.req.json()
    const res = await db.update('customers', `id=eq.${c.req.param('id')}`, body)
    return c.json({ success: true, data: res.data })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Delete customer
customersRoutes.delete('/:id', async (c) => {
  try {
    const db = getServiceClient(c.env)
    await db.delete('customers', `id=eq.${c.req.param('id')}`)
    return c.json({ success: true })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})
