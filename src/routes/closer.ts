// Closer Agent Routes - WA Outreach & Follow-up Automation
import { Hono } from 'hono'
import { getServiceClient } from '../lib/supabase'
import type { Env } from '../index'

export const closerRoutes = new Hono<{ Bindings: Env }>()

// Get outreach campaigns
closerRoutes.get('/campaigns', async (c) => {
  try {
    const db = getServiceClient(c.env)
    const res = await db.select('outreach_campaigns', 'order=created_at.desc')
    return c.json({ success: true, data: res.data || [] })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Create outreach campaign
closerRoutes.post('/campaigns', async (c) => {
  try {
    const db = getServiceClient(c.env)
    const body = await c.req.json()
    
    const campaign = {
      name: body.name,
      template: body.template || 'default',
      target_score: body.target_score || 70,
      status: 'draft',
      total_sent: 0,
      total_replied: 0,
      message_day0: body.message_day0 || '',
      message_day3: body.message_day3 || '',
      message_day7: body.message_day7 || ''
    }

    const res = await db.insert('outreach_campaigns', campaign)
    if (res.error) return c.json({ success: false, message: res.error }, 400)
    return c.json({ success: true, data: res.data })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Get message templates
closerRoutes.get('/templates', async (c) => {
  const templates = [
    {
      id: 'intro',
      name: 'Intro - Puji Toko',
      day: 0,
      message: `Halo kak! Aku perhatiin toko kakak bagus banget lho! Koleksi fashion-nya lengkap. Btw, kakak masih catat orderan manual via WA ya? Ada tools gratis yang bisa bantu rapiin orderan kakak dalam hitungan detik. Mau aku share link-nya?`
    },
    {
      id: 'demo',
      name: 'Demo - Soft Link',
      day: 3,
      message: `Halo lagi kak! Ini link demo FashionKas yang aku ceritain kemarin: fashionkas.pages.dev. Bisa langsung coba gratis, tinggal daftar aja. Kalau ada yang bingung, tanya aku aja ya!`
    },
    {
      id: 'trial',
      name: 'Trial Access',
      day: 7,
      message: `Kak, gimana nih udah sempat coba FashionKas? Aku kasih akses Pro gratis 7 hari ya buat kakak cobain fitur lengkapnya. Tinggal klik link ini aja. Semangat jualan kak!`
    },
    {
      id: 'followup',
      name: 'Follow Up Closing',
      day: 14,
      message: `Halo kak! Gimana pengalaman pakai FashionKas? Kalau cocok, lagi ada promo spesial Rp 49rb/bulan. Mau lanjut pakai?`
    }
  ]
  return c.json({ success: true, data: templates })
})

// Send single outreach
closerRoutes.post('/send', async (c) => {
  try {
    const db = getServiceClient(c.env)
    const body = await c.req.json()
    const { lead_id, message, phone } = body

    if (!phone || !message) {
      return c.json({ success: false, message: 'Phone and message required' }, 400)
    }

    // Log the outreach
    const log = {
      lead_id: lead_id || null,
      phone,
      message,
      status: 'sent',
      sent_at: new Date().toISOString()
    }
    await db.insert('outreach_logs', log)

    // Update lead status
    if (lead_id) {
      await db.update('leads', `id=eq.${lead_id}`, { status: 'contacted', last_contact: new Date().toISOString() })
    }

    return c.json({ success: true, message: 'Outreach logged' })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})

// Get outreach logs
closerRoutes.get('/logs', async (c) => {
  try {
    const db = getServiceClient(c.env)
    const res = await db.select('outreach_logs', 'order=sent_at.desc&limit=50')
    return c.json({ success: true, data: res.data || [] })
  } catch (e: any) {
    return c.json({ success: false, message: e.message }, 500)
  }
})
