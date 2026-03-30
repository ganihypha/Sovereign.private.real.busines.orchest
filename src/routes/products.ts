// Product Routes - CRUD + stock management
import { Hono } from 'hono'
import { getServiceClient } from '../lib/supabase'
import type { Env } from '../index'

export const productsRoutes = new Hono<{ Bindings: Env }>()

// List products
productsRoutes.get('/', async (c) => {
  try {
    const db = getServiceClient(c.env)
    const search = c.req.query('search') || ''
    const category = c.req.query('category') || ''
    
    let query = 'order=created_at.desc'
    if (search) query += `&or=(name.ilike.*${search}*,sku.ilike.*${search}*)`
    if (category) query += `&category=eq.${category}`

    const res = await db.select('products', query)
    return c.json({ success: true, data: res.data || [] })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Get single product
productsRoutes.get('/:id', async (c) => {
  try {
    const db = getServiceClient(c.env)
    const res = await db.select('products', `id=eq.${c.req.param('id')}`, true)
    if (!res.data) return c.json({ success: false, message: 'Not found' }, 404)
    return c.json({ success: true, data: res.data })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Create product
productsRoutes.post('/', async (c) => {
  try {
    const db = getServiceClient(c.env)
    const body = await c.req.json()
    
    const product = {
      name: body.name,
      sku: body.sku || `SKU-${Date.now()}`,
      category: body.category || 'fashion',
      price: body.price || 0,
      cost_price: body.cost_price || 0,
      stock: body.stock || 0,
      min_stock: body.min_stock || 5,
      description: body.description || '',
      image_url: body.image_url || '',
      is_active: true
    }

    const res = await db.insert('products', product)
    if (res.error) return c.json({ success: false, message: res.error }, 400)
    return c.json({ success: true, data: res.data })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Update product
productsRoutes.put('/:id', async (c) => {
  try {
    const db = getServiceClient(c.env)
    const body = await c.req.json()
    const res = await db.update('products', `id=eq.${c.req.param('id')}`, body)
    if (res.error) return c.json({ success: false, message: res.error }, 400)
    return c.json({ success: true, data: res.data })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Delete product
productsRoutes.delete('/:id', async (c) => {
  try {
    const db = getServiceClient(c.env)
    const res = await db.delete('products', `id=eq.${c.req.param('id')}`)
    return c.json({ success: true })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})
