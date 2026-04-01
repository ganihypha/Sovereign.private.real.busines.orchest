// ============================================================
// CREWAI INTEGRATION ROUTES
// Sovereign Business Engine v3.0
// Bridge between Sovereign Web <-> CrewAI AMP (LIVE)
// AMP URL: https://crew-ai-sovereign-orchest-ef50eb91-6c9d-4fc-f916c3e6.crewai.com
// ============================================================
import { Hono } from 'hono'

interface Env {
  SUPABASE_URL: string
  SUPABASE_SERVICE_KEY: string
  CREWAI_AMP_URL?: string
  CREWAI_AMP_TOKEN?: string
}

export const crewaiRoutes = new Hono<{ Bindings: Env }>()

// -----------------------------------------------
// GET /api/ai/status - CrewAI connection status + live ping
// -----------------------------------------------
crewaiRoutes.get('/status', async (c) => {
  const ampUrl = c.env.CREWAI_AMP_URL
  const ampToken = c.env.CREWAI_AMP_TOKEN

  // Try to ping AMP to check if crew is actually online
  let ampOnline = false
  let ampInputs: any = null
  if (ampUrl && ampToken) {
    try {
      const res = await fetch(`${ampUrl.replace(/\/+$/, '')}/inputs`, {
        headers: { 'Authorization': `Bearer ${ampToken}` }
      })
      if (res.ok) {
        ampOnline = true
        ampInputs = await res.json().catch(() => null)
      }
    } catch { /* silent */ }
  }

  return c.json({
    success: true,
    crewai: {
      amp_configured: !!(ampUrl && ampToken),
      amp_online: ampOnline,
      amp_url: ampUrl ? ampUrl.replace(/\/+$/, '') : null,
      amp_inputs: ampInputs,
      deployment: {
        studio: 'https://app.crewai.com/studio/v2/projects/1975e35d-5b36-4b73-a4c4-2d4d249a2905/editor',
        amp_dashboard: 'https://app.crewai.com/crewai_plus/deployments/119445',
        github: 'https://github.com/ganihypha/Crew.ai.sovereign.orchest',
        version: '3.2.0',
        llm: 'groq/llama-3.3-70b-versatile'
      },
      agents: [
        { name: 'demand_analyst', layer: 'demand', role: 'Demand Validation Analyst' },
        { name: 'revenue_tracker', layer: 'demand', role: 'Revenue Intelligence Agent' },
        { name: 'lead_scout', layer: 'system', role: 'Lead Discovery & Scoring Agent' },
        { name: 'system_validator', layer: 'system', role: 'System Operations Validator' },
        { name: 'closer_agent', layer: 'system', role: 'WhatsApp Outreach & Closing Agent' },
        { name: 'trust_auditor', layer: 'trust', role: 'Trust & Authority Validator' },
        { name: 'content_strategist', layer: 'trust', role: 'Content Strategy & Planning Agent' },
        { name: 'sovereign_orchestrator', layer: 'meta', role: 'Sovereign Business Orchestrator' }
      ],
      total_agents: 8,
      total_tasks: 8,
      tasks: [
        'analyze_demand', 'track_revenue', 'scout_leads', 'validate_system',
        'compose_outreach', 'audit_trust', 'plan_content', 'generate_validation_report'
      ]
    }
  })
})

// -----------------------------------------------
// GET /api/ai/inputs - Get required CrewAI inputs
// -----------------------------------------------
crewaiRoutes.get('/inputs', async (c) => {
  const ampUrl = c.env.CREWAI_AMP_URL
  const ampToken = c.env.CREWAI_AMP_TOKEN

  if (!ampUrl || !ampToken) {
    return c.json({ success: false, error: 'CrewAI AMP not configured' }, 400)
  }

  try {
    const res = await fetch(`${ampUrl.replace(/\/+$/, '')}/inputs`, {
      headers: { 'Authorization': `Bearer ${ampToken}` }
    })
    const data = await res.json()
    return c.json({ success: true, inputs: data })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// -----------------------------------------------
// POST /api/ai/crew/kickoff - Trigger a CrewAI run
// -----------------------------------------------
crewaiRoutes.post('/crew/kickoff', async (c) => {
  const ampUrl = c.env.CREWAI_AMP_URL
  const ampToken = c.env.CREWAI_AMP_TOKEN

  if (!ampUrl || !ampToken) {
    return c.json({
      success: false,
      error: 'CrewAI AMP not configured',
      setup: {
        amp_url: 'https://crew-ai-sovereign-orchest-ef50eb91-6c9d-4fc-f916c3e6.crewai.com',
        step1: 'Set CREWAI_AMP_URL in Cloudflare secrets',
        step2: 'Set CREWAI_AMP_TOKEN (Bearer token from AMP dashboard)',
      }
    }, 400)
  }

  const body = await c.req.json().catch(() => ({}))
  const { inputs = {} } = body as any

  // Default inputs for Sovereign Validation Crew
  const crewInputs = {
    total_products: 8,
    target_platform: 'instagram',
    min_lead_score: 70,
    outreach_day: 0,
    ...inputs
  }

  try {
    const response = await fetch(`${ampUrl.replace(/\/+$/, '')}/kickoff`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ampToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: crewInputs })
    })

    const result = await response.json() as any

    // Store kickoff event in Supabase
    if (c.env.SUPABASE_URL && c.env.SUPABASE_SERVICE_KEY) {
      try {
        await fetch(`${c.env.SUPABASE_URL}/rest/v1/validation_events`, {
          method: 'POST',
          headers: {
            'apikey': c.env.SUPABASE_SERVICE_KEY,
            'Authorization': `Bearer ${c.env.SUPABASE_SERVICE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            layer: 'demand',
            event_type: 'ai_kickoff',
            title: 'CrewAI Sovereign Validation Crew - Kicked Off',
            description: `Kickoff ID: ${result.kickoff_id || result.id || 'N/A'}. Inputs: ${JSON.stringify(crewInputs).substring(0, 300)}`,
            source: 'crewai',
            impact: 'high'
          })
        })
      } catch { /* silent */ }
    }

    return c.json({
      success: true,
      message: 'Sovereign Validation Crew kicked off!',
      kickoff_id: result.kickoff_id || result.id,
      status: result.status || 'running',
      amp_response: result
    })
  } catch (error: any) {
    return c.json({
      success: false,
      error: 'Failed to reach CrewAI AMP',
      message: error.message,
      amp_url: ampUrl
    }, 500)
  }
})

// -----------------------------------------------
// GET /api/ai/crew/status/:kickoffId - Check execution status
// -----------------------------------------------
crewaiRoutes.get('/crew/status/:kickoffId', async (c) => {
  const ampUrl = c.env.CREWAI_AMP_URL
  const ampToken = c.env.CREWAI_AMP_TOKEN
  const kickoffId = c.req.param('kickoffId')

  if (!ampUrl || !ampToken) {
    return c.json({ success: false, error: 'CrewAI AMP not configured' }, 400)
  }

  try {
    const response = await fetch(`${ampUrl.replace(/\/+$/, '')}/status/${kickoffId}`, {
      headers: { 'Authorization': `Bearer ${ampToken}` }
    })

    const result = await response.json() as any

    // If completed, store result as insight in Supabase
    if (result.status === 'completed' && result.result && c.env.SUPABASE_URL && c.env.SUPABASE_SERVICE_KEY) {
      try {
        await fetch(`${c.env.SUPABASE_URL}/rest/v1/validation_events`, {
          method: 'POST',
          headers: {
            'apikey': c.env.SUPABASE_SERVICE_KEY,
            'Authorization': `Bearer ${c.env.SUPABASE_SERVICE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            layer: 'demand',
            event_type: 'ai_insight',
            title: `AI Analysis Complete - Kickoff: ${kickoffId}`,
            description: typeof result.result === 'string' ? result.result.substring(0, 1000) : JSON.stringify(result.result).substring(0, 1000),
            source: 'crewai',
            impact: 'high'
          })
        })
      } catch { /* silent */ }
    }

    return c.json({
      success: true,
      kickoff_id: kickoffId,
      status: result.status || 'unknown',
      result: result
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// -----------------------------------------------
// POST /api/ai/webhook - Receive CrewAI callback results
// -----------------------------------------------
crewaiRoutes.post('/webhook', async (c) => {
  const body = await c.req.json().catch(() => ({})) as any
  const { kickoff_id, status, result, crew_name, layer } = body

  // Store in Supabase
  if (result && c.env.SUPABASE_URL && c.env.SUPABASE_SERVICE_KEY) {
    try {
      await fetch(`${c.env.SUPABASE_URL}/rest/v1/validation_events`, {
        method: 'POST',
        headers: {
          'apikey': c.env.SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${c.env.SUPABASE_SERVICE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          layer: layer || 'demand',
          event_type: 'ai_webhook',
          title: `AI Result: ${crew_name || 'CrewAI'} [${status || 'completed'}]`,
          description: typeof result === 'string' ? result.substring(0, 1000) : JSON.stringify(result).substring(0, 1000),
          source: 'crewai',
          impact: 'high'
        })
      })
    } catch { /* silent */ }
  }

  return c.json({
    success: true,
    message: 'Webhook received and stored',
    kickoff_id,
    stored: true
  })
})

// -----------------------------------------------
// GET /api/ai/insights - Latest AI-generated insights
// -----------------------------------------------
crewaiRoutes.get('/insights', async (c) => {
  if (!c.env.SUPABASE_URL || !c.env.SUPABASE_SERVICE_KEY) {
    return c.json({ success: false, error: 'Supabase not configured' }, 500)
  }

  try {
    const response = await fetch(
      `${c.env.SUPABASE_URL}/rest/v1/validation_events?source=eq.crewai&order=created_at.desc&limit=20`,
      {
        headers: {
          'apikey': c.env.SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${c.env.SUPABASE_SERVICE_KEY}`
        }
      }
    )

    const data = await response.json() as any

    return c.json({
      success: true,
      source: 'crewai',
      count: Array.isArray(data) ? data.length : 0,
      insights: data
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})
