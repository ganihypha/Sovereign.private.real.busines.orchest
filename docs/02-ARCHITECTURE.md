# SOVEREIGN BUSINESS ENGINE v3.0
# Architecture Document
### Classification: CONFIDENTIAL | Founder Access Only

---

## 1. System Overview

```
                    SOVEREIGN BUSINESS ENGINE v3.0
                    ==============================
                    
    [FOUNDER] -----> [Auth Gate: PIN + Device ID]
                              |
                     [Cloudflare Pages UI]
                     (Terminal-Chic Glassmorphism)
                              |
                    [Hono.js API Gateway]
                    (Cloudflare Workers Edge)
                              |
           +------------------+------------------+
           |                  |                  |
    [LangGraph.js]     [Supabase]        [External APIs]
    (Edge AI Agent)    (PostgreSQL+RLS)   (Fonnte, ScraperAPI)
           |                                     |
    [CrewAI Service]                     [Instagram Ecosystem]
    (External REST API)                  (3-Layer Brand System)
    (Python FastAPI/Docker)
```

---

## 2. Three-Layer Business Architecture

### Layer 1: Brand Machine (Demand Validation)
- **Account**: @fashionkas.official
- **Role**: Revenue generation, demand capture, user onboarding
- **Data Flow**: IG --> ScraperAPI --> leads table --> AI scoring --> outreach

### Layer 2: Growth Engine (System/Scale Validation)
- **Account**: @resellerkas.official
- **Role**: Community building, UGC hub, reseller education
- **Data Flow**: Leads --> Closer Agent --> Fonnte WA --> conversion tracking

### Layer 3: Founder Engine (Trust/Authority Validation)
- **Account**: @haidar_faras_m
- **Role**: Trust building, visionary authority, "Build in Public" documentation
- **Data Flow**: Validation metrics --> AI insights --> content creation

---

## 3. Technical Stack

### Core Infrastructure
| Component | Technology | Purpose |
|-----------|-----------|---------|
| UI Framework | Cloudflare Pages | Global edge hosting |
| API Gateway | Hono.js on Cloudflare Workers | Edge-first REST API |
| Database | Supabase (PostgreSQL) | Data persistence + RLS |
| Build Tool | Vite + @hono/vite-build | SSR bundling for Workers |
| Auth | Custom JWT (Web Crypto API) | PIN-based authentication |

### AI/Intelligence Layer
| Component | Technology | Runtime | Purpose |
|-----------|-----------|---------|---------|
| Edge AI Agent | **LangGraph.js** | Cloudflare Workers | Real-time scoring, insights, message composition |
| Deep Analysis Crew | **CrewAI** | External (FastAPI/Docker) | Complex multi-agent analysis tasks |
| LLM Provider | OpenAI API (via LangChain.js) | API call from Workers | GPT-4o-mini for edge tasks |
| Search/Research | **SerpAPI** | API call | Web research for lead enrichment |

### External Integrations
| Service | API | Purpose |
|---------|-----|---------|
| **Fonnte** | REST API (api.fonnte.com) | WhatsApp messaging + broadcasting |
| **ScraperAPI** | REST API | Instagram profile scraping |
| **SerpAPI** | REST API | Web search for lead research |
| **LangChain/LangSmith** | REST API | Agent tracing + monitoring |
| **CrewAI Enterprise** | REST API (kickoff/status) | Deep analysis crew execution |

---

## 4. AI Agent Architecture

### 4.1 LangGraph.js (Edge Agents - Cloudflare Workers)

LangGraph.js runs DIRECTLY in Cloudflare Workers edge runtime. These are lightweight, fast agents for real-time tasks.

```
                    LangGraph.js Agent Workflow
                    ==========================

    [Trigger] --> [State Init] --> [Router Node]
                                       |
                    +------------------+------------------+
                    |                  |                  |
              [Scout Node]      [Closer Node]     [Insight Node]
              (Lead scoring)    (Msg compose)     (Data analysis)
                    |                  |                  |
              [Enrich Node]     [Send Node]       [Report Node]
              (ScraperAPI)      (Fonnte API)      (AI Summary)
                    |                  |                  |
                    +------------------+------------------+
                                       |
                              [Output / Store]
                              (Supabase write)
```

**Edge Agent Capabilities:**
| Agent | Trigger | Input | Output | Latency Target |
|-------|---------|-------|--------|---------------|
| ScoutScorer | POST /api/scout/ai-score | Lead data | Score + reasoning | < 3s |
| MessageComposer | POST /api/closer/ai-compose | Lead + template | Personalized message | < 2s |
| InsightGenerator | GET /api/dashboard/ai-insights | Dashboard metrics | 3-5 actionable insights | < 5s |
| AnomalyDetector | Cron (hourly) | Recent metrics | Anomaly alerts | < 5s |

**Implementation Pattern:**
```typescript
// LangGraph.js in Cloudflare Workers
import { StateGraph, END } from "@langchain/langgraph/web";
import { ChatOpenAI } from "@langchain/openai";

// Define state interface
interface ScoutState {
  lead: LeadData;
  enrichedData?: any;
  score?: number;
  reasoning?: string;
}

// Create graph
const graph = new StateGraph<ScoutState>({
  channels: {
    lead: { value: null },
    enrichedData: { value: null },
    score: { value: 0 },
    reasoning: { value: "" }
  }
});

// Add nodes
graph.addNode("enrich", enrichLeadNode);
graph.addNode("score", aiScoreNode);
graph.addNode("decide", decisionNode);

// Add edges
graph.addEdge("enrich", "score");
graph.addConditionalEdges("score", routeByScore, {
  hot: "notify",
  warm: "queue",
  cold: END
});
```

### 4.2 CrewAI (External Deep Analysis Service)

CrewAI runs as an external Python service (FastAPI on Docker/Cloud Run). It handles complex, multi-step analysis that exceeds Cloudflare Workers' 10ms CPU limit.

```
    [Hono API] --HTTP POST--> [CrewAI Service]
                               (FastAPI + Docker)
                                    |
                          [CrewAI Crew Definition]
                                    |
                    +---------------+---------------+
                    |               |               |
              [Market Analyst] [Lead Researcher] [Strategy Agent]
              (Analyze demand) (Deep lead study) (Recommend actions)
                    |               |               |
                    +---------------+---------------+
                                    |
                          [Crew Output (JSON)]
                                    |
    [Hono API] <--HTTP Response-- [CrewAI Service]
                                    |
                          [Store in Supabase]
```

**CrewAI Crew Definitions:**

| Crew | Agents | Schedule | Purpose |
|------|--------|----------|---------|
| MarketValidationCrew | MarketAnalyst, DataScientist, StrategyAdvisor | Daily | Analyze 3-layer validation data, produce insights |
| LeadResearchCrew | IGScraper, ProfileAnalyzer, ScoreComputer | On-demand | Deep research on high-potential leads |
| RevenueAnalysisCrew | FinanceAnalyst, ForecastAgent | Weekly | Revenue trends, predictions, recommendations |
| ContentStrategyCrew | ContentPlanner, CaptionWriter, HashtagOptimizer | Weekly | Plan content for 3 IG accounts |

**CrewAI REST API Integration:**
```
# Kickoff a crew (from Hono route)
POST https://crewai-service.example.com/kickoff
Headers: Authorization: Bearer {CREWAI_ENTERPRISE_TOKEN}
Body: {
  "crew_name": "MarketValidationCrew",
  "inputs": {
    "demand_data": {...},
    "system_data": {...},
    "trust_data": {...}
  }
}

# Check status
GET https://crewai-service.example.com/status/{task_id}

# Get result
GET https://crewai-service.example.com/result/{task_id}
```

### 4.3 Credential Configuration

```
# .dev.vars (Cloudflare Workers local)
SUPABASE_URL=https://lfohzibcsafqthupcvdg.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_KEY=eyJ...
JWT_SECRET=cCZ/O5whN...
MASTER_PIN=1945
SCRAPER_API_KEY=abbea259...
CF_ACCOUNT_ID=618d52f6...

# AI Agent Keys
LANGCHAIN_API_KEY=<your-langchain-api-key>
LANGCHAIN_SERVICE_KEY=<your-langchain-service-key>
CREWAI_ORG_ID=<your-crewai-org-id>
CREWAI_PAT=<your-crewai-pat>
CREWAI_ENTERPRISE_TOKEN=<your-crewai-enterprise-token>
SERPAPI_KEY=<your-serpapi-key>

# WhatsApp (Fonnte) - NEEDED
FONNTE_TOKEN=<to-be-configured>

# OpenAI (for LangChain.js LLM calls)
OPENAI_API_KEY=<to-be-configured>
```

---

## 5. Security Architecture

### Zero-Trust Internal Model

```
    [Public Internet]
           |
    [Cloudflare Edge] -- <noindex, nofollow> meta tag
           |
    [PIN Gate] -- 4-digit bcrypt-hashed PIN
           |
    [JWT Verification] -- HS256, 7-day expiry
           |
    [Device ID Lock] -- Browser fingerprint cookie (TODO)
           |
    [Supabase RLS] -- service_role for API, anon blocked
           |
    [Data Layer] -- All sensitive data encrypted at rest
```

### Security Layers
| Layer | Implementation | Status |
|-------|---------------|--------|
| Network | Cloudflare DDoS + WAF | ACTIVE |
| Discovery | noindex/nofollow robots meta | ACTIVE |
| Authentication | 4-digit PIN -> JWT token | ACTIVE |
| Authorization | JWT Bearer token on all /api/* | ACTIVE |
| Device Lock | Browser fingerprint + cookie | PLANNED |
| Database | Supabase RLS + service_role only | ACTIVE |
| Secrets | Cloudflare Workers secrets (env vars) | ACTIVE |
| API Keys | Never exposed to frontend | ACTIVE |

---

## 6. Database Architecture

### Entity Relationship Diagram
```
    [products] 1---* [order_items] *---1 [orders]
                                          |
                                     [customers]
    
    [leads] 1---* [outreach_logs]
       |
    [outreach_campaigns]
    
    [validation_events]    [validation_metrics]
    
    [ai_tasks] ----> [ai_insights]
    
    [content_calendar]     [analytics_metrics]
    
    [wa_logs] (Fonnte audit trail)
```

### Table Summary (12 tables)
| # | Table | Status | Records |
|---|-------|--------|---------|
| 1 | products | LIVE | 8 |
| 2 | customers | LIVE | 6 |
| 3 | orders | LIVE | 8 |
| 4 | leads | LIVE | 10 |
| 5 | outreach_campaigns | LIVE | 0 |
| 6 | outreach_logs | LIVE | 0 |
| 7 | validation_events | LIVE | 11 |
| 8 | validation_metrics | LIVE | 15 |
| 9 | order_items | PLANNED | - |
| 10 | wa_logs | PLANNED | - |
| 11 | ai_tasks | PLANNED | - |
| 12 | ai_insights | PLANNED | - |
| 13 | content_calendar | PLANNED | - |
| 14 | analytics_metrics | PLANNED | - |

---

## 7. API Architecture

### Route Map
```
/api
  /health               GET    -- System health + version
  /auth
    /login              POST   -- PIN authentication
    /verify             GET    -- JWT verification
  /dashboard
    /stats              GET    -- Core metrics
    /activity           GET    -- Recent activity
    /ai-insights        GET    -- AI-generated insights (NEW)
  /products             GET    -- List products
  /products             POST   -- Create product
  /products/:id         GET    -- Get product
  /products/:id         PUT    -- Update product
  /products/:id         DELETE -- Delete product
  /orders               GET    -- List orders
  /orders               POST   -- Create order
  /orders/:id           PUT    -- Update order status
  /orders/:id           DELETE -- Delete order
  /customers            GET    -- List customers
  /customers            POST   -- Create customer
  /customers/:id        PUT    -- Update customer
  /customers/:id        DELETE -- Delete customer
  /scout
    /leads              GET    -- List leads
    /leads              POST   -- Create lead
    /leads/:id          PUT    -- Update lead
    /leads/:id          DELETE -- Delete lead
    /score              POST   -- Auto-score (algorithm)
    /gather             POST   -- ScraperAPI routine (NEW)
    /ai-score           POST   -- AI scoring via LangGraph (NEW)
    /enrich             POST   -- AI lead enrichment (NEW)
  /closer
    /campaigns          GET    -- List campaigns
    /campaigns          POST   -- Create campaign
    /templates          GET    -- Message templates
    /send               POST   -- Send outreach message
    /logs               GET    -- Outreach logs
    /ai-compose         POST   -- AI message composition (NEW)
    /sequence           POST   -- Trigger auto-sequence (NEW)
  /wa
    /send               POST   -- Fonnte individual send (NEW)
    /broadcast          POST   -- Fonnte bulk send (NEW)
    /status             GET    -- Fonnte device status (NEW)
    /webhook            POST   -- Incoming message webhook (NEW)
  /validation
    /stats              GET    -- Validation dashboard
    /events             GET    -- List events
    /events             POST   -- Log event
    /events/:id         DELETE -- Delete event
    /metrics            GET    -- List metrics
    /metrics            POST   -- Record metric
    /report             GET    -- Full validation report
  /reports
    /revenue            GET    -- Revenue analytics
    /products           GET    -- Product analytics
    /leads              GET    -- Lead analytics
  /catalog
    /:slug              GET    -- Public catalog page
  /ai
    /tasks              GET    -- AI task queue (NEW)
    /tasks              POST   -- Create AI task (NEW)
    /tasks/:id          GET    -- Task status + result (NEW)
    /insights           GET    -- AI insights list (NEW)
    /crew/kickoff       POST   -- Kickoff CrewAI crew (NEW)
    /crew/status/:id    GET    -- CrewAI task status (NEW)
```

---

## 8. Deployment Architecture

### Production Environment
```
    [GitHub Repo] --push--> [Cloudflare Pages]
    (ganihypha/Sovereign...)   (sovereign-orchestrator.pages.dev)
                                      |
                               [Cloudflare Workers]
                               (Hono.js API routes)
                                      |
                            [Supabase PostgreSQL]
                            (lfohzibcsafqthupcvdg)
                                      |
                    +-----------------+-----------------+
                    |                 |                 |
              [Fonnte API]    [ScraperAPI]     [CrewAI Service]
              (WhatsApp)      (IG Scraping)   (AI Deep Analysis)
```

### Current URLs
| Environment | URL |
|------------|-----|
| Production | https://sovereign-orchestrator.pages.dev |
| Sandbox Dev | https://3000-{sandbox-id}.sandbox.novita.ai |
| GitHub | https://github.com/ganihypha/Sovereign.private.real.busines.orchest |
| Supabase | https://lfohzibcsafqthupcvdg.supabase.co |

---

## Document Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-28 | Original architecture (Cloudflare + Supabase) |
| 2.0 | 2026-03-31 | Added validation tables + market intelligence |
| 3.0 | 2026-03-31 | AI Agent Architecture (LangGraph.js + CrewAI), Fonnte integration specs, full API route map |
