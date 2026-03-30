// Dashboard Routes - Real-time analytics & 3-Layer monitoring
import { Hono } from 'hono'
import { getServiceClient } from '../lib/supabase'
import type { Env } from '../index'

export const dashboardRoutes = new Hono<{ Bindings: Env }>()

// Get dashboard overview stats
dashboardRoutes.get('/stats', async (c) => {
  try {
    const db = getServiceClient(c.env)

    const [products, orders, customers, leads] = await Promise.all([
      db.selectCount('products'),
      db.selectCount('orders'),
      db.selectCount('customers'),
      db.selectCount('leads')
    ])

    // Revenue calculation
    const revenueRes = await db.select('orders', 'select=total_amount&status=eq.completed')
    const revenue = revenueRes.data 
      ? (revenueRes.data as any[]).reduce((sum: number, o: any) => sum + (o.total_amount || 0), 0)
      : 0

    // Today's orders
    const today = new Date().toISOString().split('T')[0]
    const todayOrders = await db.selectCount('orders', `created_at=gte.${today}T00:00:00`)

    // Pending orders
    const pendingOrders = await db.selectCount('orders', 'status=eq.pending')

    // Hot leads  
    const hotLeads = await db.selectCount('leads', 'score=gte.70')

    return c.json({
      success: true,
      data: {
        totalProducts: products.count || 0,
        totalOrders: orders.count || 0,
        totalCustomers: customers.count || 0,
        totalLeads: leads.count || 0,
        totalRevenue: revenue,
        todayOrders: todayOrders.count || 0,
        pendingOrders: pendingOrders.count || 0,
        hotLeads: hotLeads.count || 0,
        layers: {
          brand: { account: '@fashionkas.official', status: 'active', role: 'Revenue Engine' },
          growth: { account: '@resellerkas.official', status: 'active', role: 'Growth Engine' },
          founder: { account: '@haidar_faras_m', status: 'active', role: 'Trust Engine' }
        }
      }
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Get recent activity
dashboardRoutes.get('/activity', async (c) => {
  try {
    const db = getServiceClient(c.env)
    
    const [recentOrders, recentLeads] = await Promise.all([
      db.select('orders', 'order=created_at.desc&limit=5'),
      db.select('leads', 'order=created_at.desc&limit=5')
    ])

    return c.json({
      success: true,
      data: {
        recentOrders: recentOrders.data || [],
        recentLeads: recentLeads.data || []
      }
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})
