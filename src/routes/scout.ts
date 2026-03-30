// Scout Agent Routes - Lead Discovery & Digital Gap Scoring
import { Hono } from 'hono'
import { getServiceClient } from '../lib/supabase'
import type { Env } from '../index'

export const scoutRoutes = new Hono<{ Bindings: Env }>()

// List leads
scoutRoutes.get('/leads', async (c) => {
  try {
    const db = getServiceClient(c.env)
    const status = c.req.query('status') || ''
    const minScore = c.req.query('min_score') || ''
    let query = 'order=score.desc,created_at.desc'
    if (status) query += `&status=eq.${status}`
    if (minScore) query += `&score=gte.${minScore}`
    const res = await db.select('leads', query)
    return c.json({ success: true, data: res.data || [] })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Add lead manually
scoutRoutes.post('/leads', async (c) => {
  try {
    const db = getServiceClient(c.env)
    const body = await c.req.json()
    const lead = {
      shop_name: body.shop_name,
      platform: body.platform || 'instagram',
      username: body.username || '',
      phone: body.phone || '',
      followers: body.followers || 0,
      score: body.score || 50,
      digital_gap: body.digital_gap || 'medium',
      status: 'new',
      notes: body.notes || '',
      source: body.source || 'manual'
    }
    const res = await db.insert('leads', lead)
    if (res.error) return c.json({ success: false, message: res.error }, 400)
    return c.json({ success: true, data: res.data })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Update lead
scoutRoutes.put('/leads/:id', async (c) => {
  try {
    const db = getServiceClient(c.env)
    const body = await c.req.json()
    const res = await db.update('leads', `id=eq.${c.req.param('id')}`, body)
    return c.json({ success: true, data: res.data })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Delete lead
scoutRoutes.delete('/leads/:id', async (c) => {
  try {
    const db = getServiceClient(c.env)
    await db.delete('leads', `id=eq.${c.req.param('id')}`)
    return c.json({ success: true })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Auto-score leads
scoutRoutes.post('/score', async (c) => {
  try {
    const db = getServiceClient(c.env)
    const leadsRes = await db.select('leads', 'status=eq.new&order=created_at.desc&limit=20')
    const leads = (leadsRes.data || []) as any[]
    const scored = leads.map((lead: any) => {
      let score = 30
      if (lead.followers > 1000) score += 20
      if (lead.followers > 5000) score += 15
      if (lead.digital_gap === 'high') score += 25
      else if (lead.digital_gap === 'medium') score += 15
      if (lead.phone) score += 10
      return { id: lead.id, score: Math.min(score, 100) }
    })
    for (const s of scored) {
      await db.update('leads', `id=eq.${s.id}`, { score: s.score, status: 'scored' })
    }
    return c.json({ success: true, scored: scored.length })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})
