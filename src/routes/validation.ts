// Market Validation Intelligence Routes
// 3-Layer Validation: Demand | System | Trust
// The Real Market Validated Data Engine
import { Hono } from 'hono'
import { getServiceClient } from '../lib/supabase'
import type { Env } from '../index'

export const validationRoutes = new Hono<{ Bindings: Env }>()

// === VALIDATION DASHBOARD STATS ===
validationRoutes.get('/stats', async (c) => {
  try {
    const db = getServiceClient(c.env)

    // Demand Validation (@fashionkas.official)
    const [products, orders, customers] = await Promise.all([
      db.selectCount('products', 'is_active=eq.true'),
      db.selectCount('orders'),
      db.selectCount('customers')
    ])
    const completedOrders = await db.selectCount('orders', 'status=eq.completed')
    const revenueRes = await db.select('orders', 'select=total_amount&status=eq.completed')
    const revenue = revenueRes.data
      ? (revenueRes.data as any[]).reduce((s: number, o: any) => s + (o.total_amount || 0), 0)
      : 0

    // System Validation (@resellerkas.official)
    const [leads, contacted, converted] = await Promise.all([
      db.selectCount('leads'),
      db.selectCount('leads', 'status=eq.contacted'),
      db.selectCount('leads', 'status=eq.converted')
    ])
    const outreachLogs = await db.selectCount('outreach_logs')

    // Trust Validation (@haidar_faras_m)
    const hotLeads = await db.selectCount('leads', 'score=gte.70')

    // Validation Events
    const events = await db.select('validation_events', 'order=created_at.desc&limit=10')

    // Validation Metrics
    const metrics = await db.select('validation_metrics', 'order=recorded_at.desc&limit=30')

    const totalLeads = leads.count || 0
    const totalConverted = converted.count || 0
    const conversionRate = totalLeads > 0 ? ((totalConverted / totalLeads) * 100).toFixed(1) : '0'
    const contactRate = totalLeads > 0 ? (((contacted.count || 0) / totalLeads) * 100).toFixed(1) : '0'

    return c.json({
      success: true,
      data: {
        // Demand Layer
        demand: {
          brand: '@fashionkas.official',
          role: 'Demand Validation',
          metrics: {
            activeProducts: products.count || 0,
            totalOrders: orders.count || 0,
            completedOrders: completedOrders.count || 0,
            totalCustomers: customers.count || 0,
            totalRevenue: revenue,
            avgOrderValue: (completedOrders.count || 0) > 0 ? Math.round(revenue / (completedOrders.count || 1)) : 0
          },
          proof: 'Product-Market Fit: ' + (orders.count || 0) + ' orders from ' + (customers.count || 0) + ' customers'
        },
        // System Layer
        system: {
          brand: '@resellerkas.official',
          role: 'System/Scale Validation',
          metrics: {
            totalLeads: totalLeads,
            contactedLeads: contacted.count || 0,
            convertedLeads: totalConverted,
            contactRate: contactRate + '%',
            conversionRate: conversionRate + '%',
            outreachSent: outreachLogs.count || 0,
            digitalGapsClosed: totalConverted
          },
          proof: 'Scaling: ' + conversionRate + '% conversion from ' + totalLeads + ' leads'
        },
        // Trust Layer
        trust: {
          brand: '@haidar_faras_m',
          role: 'Trust/Authority Validation',
          metrics: {
            hotLeads: hotLeads.count || 0,
            trustScore: totalLeads > 0 ? Math.round(((hotLeads.count || 0) / totalLeads) * 100) : 0,
            totalLeads: totalLeads,
            authorityProof: 'Founder-driven acquisition'
          },
          proof: 'Authority: ' + (hotLeads.count || 0) + ' high-confidence leads (score 70+)'
        },
        // Overall Engine Health
        engineHealth: {
          validationScore: Math.round(
            ((orders.count || 0) > 0 ? 33 : 0) +
            (totalConverted > 0 ? 33 : 0) +
            ((hotLeads.count || 0) > 0 ? 34 : 0)
          ),
          status: (orders.count || 0) > 0 && totalConverted > 0 ? 'VALIDATED' : 'COLLECTING',
          dataPoints: (orders.count || 0) + totalLeads + (customers.count || 0) + (outreachLogs.count || 0),
          lastUpdate: new Date().toISOString()
        },
        recentEvents: events.data || [],
        metrics: metrics.data || []
      }
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// === LOG VALIDATION EVENT ===
validationRoutes.post('/events', async (c) => {
  try {
    const db = getServiceClient(c.env)
    const body = await c.req.json()

    const event = {
      layer: body.layer || 'demand', // demand | system | trust
      event_type: body.event_type || 'observation',
      title: body.title,
      description: body.description || '',
      data_value: body.data_value || null,
      source: body.source || 'manual',
      impact: body.impact || 'medium' // low | medium | high | critical
    }

    if (!event.title) return c.json({ success: false, message: 'Title required' }, 400)

    const res = await db.insert('validation_events', event)
    if (res.error) return c.json({ success: false, message: res.error }, 400)
    return c.json({ success: true, data: res.data })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// === GET VALIDATION EVENTS ===
validationRoutes.get('/events', async (c) => {
  try {
    const db = getServiceClient(c.env)
    const layer = c.req.query('layer') || ''
    let query = 'order=created_at.desc&limit=50'
    if (layer) query += `&layer=eq.${layer}`
    const res = await db.select('validation_events', query)
    return c.json({ success: true, data: res.data || [] })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// === DELETE VALIDATION EVENT ===
validationRoutes.delete('/events/:id', async (c) => {
  try {
    const db = getServiceClient(c.env)
    await db.delete('validation_events', `id=eq.${c.req.param('id')}`)
    return c.json({ success: true })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// === RECORD VALIDATION METRIC ===
validationRoutes.post('/metrics', async (c) => {
  try {
    const db = getServiceClient(c.env)
    const body = await c.req.json()

    const metric = {
      layer: body.layer || 'demand',
      metric_name: body.metric_name,
      metric_value: body.metric_value || 0,
      unit: body.unit || 'count',
      notes: body.notes || '',
      recorded_at: body.recorded_at || new Date().toISOString()
    }

    if (!metric.metric_name) return c.json({ success: false, message: 'Metric name required' }, 400)

    const res = await db.insert('validation_metrics', metric)
    if (res.error) return c.json({ success: false, message: res.error }, 400)
    return c.json({ success: true, data: res.data })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// === GET VALIDATION METRICS ===
validationRoutes.get('/metrics', async (c) => {
  try {
    const db = getServiceClient(c.env)
    const layer = c.req.query('layer') || ''
    let query = 'order=recorded_at.desc&limit=100'
    if (layer) query += `&layer=eq.${layer}`
    const res = await db.select('validation_metrics', query)
    return c.json({ success: true, data: res.data || [] })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// === MARKET VALIDATION REPORT (Comprehensive) ===
validationRoutes.get('/report', async (c) => {
  try {
    const db = getServiceClient(c.env)

    const [orders, leads, customers, events, metrics, outreach] = await Promise.all([
      db.select('orders', 'order=created_at.desc'),
      db.select('leads', 'order=score.desc'),
      db.select('customers', 'order=created_at.desc'),
      db.select('validation_events', 'order=created_at.desc&limit=50'),
      db.select('validation_metrics', 'order=recorded_at.desc&limit=100'),
      db.selectCount('outreach_logs')
    ])

    const allOrders = (orders.data || []) as any[]
    const allLeads = (leads.data || []) as any[]
    const allCustomers = (customers.data || []) as any[]

    const completedOrders = allOrders.filter((o: any) => o.status === 'completed')
    const totalRevenue = completedOrders.reduce((s: number, o: any) => s + (o.total_amount || 0), 0)
    const convertedLeads = allLeads.filter((l: any) => l.status === 'converted')
    const hotLeads = allLeads.filter((l: any) => l.score >= 70)

    return c.json({
      success: true,
      data: {
        generatedAt: new Date().toISOString(),
        engineIdentity: 'Sovereign Business Engine v2.0',
        summary: {
          validationScore: Math.round(
            (completedOrders.length > 0 ? 33 : 0) +
            (convertedLeads.length > 0 ? 33 : 0) +
            (hotLeads.length > 0 ? 34 : 0)
          ),
          totalDataPoints: allOrders.length + allLeads.length + allCustomers.length + (outreach.count || 0),
          proofStatus: completedOrders.length > 0 && convertedLeads.length > 0 ? 'MARKET VALIDATED' : 'DATA COLLECTING'
        },
        demandValidation: {
          totalOrders: allOrders.length,
          completedOrders: completedOrders.length,
          totalRevenue,
          uniqueCustomers: allCustomers.length,
          avgOrderValue: completedOrders.length > 0 ? Math.round(totalRevenue / completedOrders.length) : 0,
          orderSources: allOrders.reduce((acc: any, o: any) => { acc[o.source || 'manual'] = (acc[o.source || 'manual'] || 0) + 1; return acc }, {}),
          verdict: completedOrders.length >= 10 ? 'STRONG DEMAND' : completedOrders.length >= 3 ? 'GROWING DEMAND' : 'EARLY STAGE'
        },
        systemValidation: {
          totalLeads: allLeads.length,
          contactedLeads: allLeads.filter((l: any) => l.status === 'contacted').length,
          convertedLeads: convertedLeads.length,
          outreachSent: outreach.count || 0,
          conversionRate: allLeads.length > 0 ? ((convertedLeads.length / allLeads.length) * 100).toFixed(1) + '%' : '0%',
          platforms: allLeads.reduce((acc: any, l: any) => { acc[l.platform || 'unknown'] = (acc[l.platform || 'unknown'] || 0) + 1; return acc }, {}),
          verdict: convertedLeads.length >= 5 ? 'SYSTEM PROVEN' : convertedLeads.length >= 1 ? 'SYSTEM WORKING' : 'SYSTEM TESTING'
        },
        trustValidation: {
          hotLeads: hotLeads.length,
          trustScore: allLeads.length > 0 ? Math.round((hotLeads.length / allLeads.length) * 100) : 0,
          highestScore: allLeads.length > 0 ? allLeads[0]?.score || 0 : 0,
          verdict: hotLeads.length >= 10 ? 'HIGH AUTHORITY' : hotLeads.length >= 3 ? 'BUILDING TRUST' : 'ESTABLISHING'
        },
        validationTimeline: events.data || [],
        metricHistory: metrics.data || []
      }
    })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})
