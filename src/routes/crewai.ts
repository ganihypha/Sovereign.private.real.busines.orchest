// ============================================================
// CREWAI INTEGRATION ROUTES
// Sovereign Business Engine v3.0
// Bridge between Sovereign Web <-> CrewAI AMP
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
// GET /api/ai/status - CrewAI connection status
// -----------------------------------------------
crewaiRoutes.get('/status', async (c) => {
  const ampUrl = c.env.CREWAI_AMP_URL
  const ampToken = c.env.CREWAI_AMP_TOKEN

  return c.json({
    success: true,
    crewai: {
      amp_configured: !!(ampUrl && ampToken),
      amp_url: ampUrl ? ampUrl.replace(/\/+$/, '') : null,
      studio_project: 'https://app.crewai.com/studio/v2/projects/1975e35d-5b36-4b73-a4c4-2d4d249a2905/editor',
      github_repo: 'https://github.com/ganihypha/Crew.ai.sovereign.orchest',
      agents: [
        { name: 'demand_analyst', layer: 'demand', status: 'ready' },
        { name: 'revenue_tracker', layer: 'demand', status: 'ready' },
        { name: 'lead_scout', layer: 'system', status: 'ready' },
        { name: 'system_validator', layer: 'system', status: 'ready' },
        { name: 'closer_agent', layer: 'system', status: 'ready' },
        { name: 'trust_auditor', layer: 'trust', status: 'ready' },
        { name: 'content_strategist', layer: 'trust', status: 'ready' },
        { name: 'sovereign_orchestrator', layer: 'meta', status: 'ready' }
      ],
      total_agents: 8,
      total_tasks: 8
    }
  })
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
        step1: 'Deploy repo to CrewAI AMP: https://app.crewai.com',
        step2: 'Get your AMP API endpoint and Bearer token',
        step3: 'Set CREWAI_AMP_URL and CREWAI_AMP_TOKEN in Cloudflare secrets'
      }
    }, 400)
  }

  const body = await c.req.json().catch(() => ({}))
  const {
    crew_name = 'SovereignValidationCrew',
    layer = 'all',
    inputs = {}
  } = body as any

  // Default inputs with current data context
  const defaultInputs = {
    total_products: 8,
    target_platform: 'instagram',
    min_lead_score: 70,
    outreach_day: 0,
    sovereign_web_url: 'https://sovereign-orchestrator.pages.dev',
    ...inputs
  }

  try {
    const response = await fetch(`${ampUrl}/kickoff`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ampToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        crew_name,
        inputs: defaultInputs
      })
    })

    const result = await response.json() as any

    return c.json({
      success: true,
      message: `CrewAI crew "${crew_name}" kicked off successfully`,
      layer,
      task_id: result.task_id || result.id || 'pending',
      status: 'running',
      amp_response: result
    })
  } catch (error: any) {
    return c.json({
      success: false,
      error: 'Failed to reach CrewAI AMP',
      message: error.message
    }, 500)
  }
})

// -----------------------------------------------
// GET /api/ai/crew/status/:taskId - Check task status
// -----------------------------------------------
crewaiRoutes.get('/crew/status/:taskId', async (c) => {
  const ampUrl = c.env.CREWAI_AMP_URL
  const ampToken = c.env.CREWAI_AMP_TOKEN
  const taskId = c.req.param('taskId')

  if (!ampUrl || !ampToken) {
    return c.json({
      success: false,
      error: 'CrewAI AMP not configured'
    }, 400)
  }

  try {
    const response = await fetch(`${ampUrl}/status/${taskId}`, {
      headers: {
        'Authorization': `Bearer ${ampToken}`
      }
    })

    const result = await response.json() as any

    return c.json({
      success: true,
      task_id: taskId,
      status: result.status || 'unknown',
      result: result
    })
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})

// -----------------------------------------------
// POST /api/ai/webhook - Receive CrewAI results
// -----------------------------------------------
crewaiRoutes.post('/webhook', async (c) => {
  const body = await c.req.json().catch(() => ({})) as any
  const {
    task_id,
    crew_name,
    status,
    result,
    layer
  } = body

  // Store CrewAI results as validation events in Supabase
  if (result && c.env.SUPABASE_URL && c.env.SUPABASE_SERVICE_KEY) {
    try {
      const eventData = {
        layer: layer || 'demand',
        event_type: 'insight',
        title: `AI Validation: ${crew_name || 'CrewAI'}`,
        description: typeof result === 'string' ? result : JSON.stringify(result).substring(0, 500),
        source: 'crewai',
        impact: 'high'
      }

      await fetch(`${c.env.SUPABASE_URL}/rest/v1/validation_events`, {
        method: 'POST',
        headers: {
          'apikey': c.env.SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${c.env.SUPABASE_SERVICE_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      })
    } catch (e) {
      // Silent fail - log but don't block webhook response
    }
  }

  return c.json({
    success: true,
    message: 'Webhook received',
    task_id,
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

    const data = await response.json()

    return c.json({
      success: true,
      source: 'crewai',
      count: Array.isArray(data) ? data.length : 0,
      insights: data
    })
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})
