// Reports Routes - Analytics & Export
import { Hono } from 'hono'
import { getServiceClient } from '../lib/supabase'
import type { Env } from '../index'

export const reportsRoutes = new Hono<{ Bindings: Env }>()

// Get revenue report
reportsRoutes.get('/revenue', async (c) => {
  try {
    const db = getServiceClient(c.env)
    const period = c.req.query('period') || '30'
    const daysAgo = new Date(Date.now() - parseInt(period) * 86400000).toISOString()
    
    const res = await db.select('orders', `created_at=gte.${daysAgo}&status=eq.completed&order=created_at.desc`)
    const orders = (res.data || []) as any[]
    
    const totalRevenue = orders.reduce((sum: number, o: any) => sum + (o.total_amount || 0), 0)
    const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0

    return c.json({
      success: true,
      data: {
        period: `${period} days`,
        totalRevenue,
        totalOrders: orders.length,
        avgOrderValue,
        orders
      }
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Get product performance
reportsRoutes.get('/products', async (c) => {
  try {
    const db = getServiceClient(c.env)
    const res = await db.select('products', 'order=created_at.desc')
    
    const products = (res.data || []) as any[]
    const lowStock = products.filter((p: any) => p.stock <= p.min_stock)
    const outOfStock = products.filter((p: any) => p.stock <= 0)

    return c.json({
      success: true,
      data: {
        totalProducts: products.length,
        lowStock: lowStock.length,
        outOfStock: outOfStock.length,
        lowStockItems: lowStock,
        products
      }
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Get lead conversion report
reportsRoutes.get('/leads', async (c) => {
  try {
    const db = getServiceClient(c.env)
    const [allLeads, contacted, converted] = await Promise.all([
      db.selectCount('leads'),
      db.selectCount('leads', 'status=eq.contacted'),
      db.selectCount('leads', 'status=eq.converted')
    ])

    const total = allLeads.count || 0
    const contactRate = total > 0 ? ((contacted.count || 0) / total * 100).toFixed(1) : '0'
    const convertRate = total > 0 ? ((converted.count || 0) / total * 100).toFixed(1) : '0'

    return c.json({
      success: true,
      data: {
        totalLeads: total,
        contacted: contacted.count || 0,
        converted: converted.count || 0,
        contactRate: `${contactRate}%`,
        conversionRate: `${convertRate}%`
      }
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})
