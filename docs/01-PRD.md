# SOVEREIGN BUSINESS ENGINE v3.0
# PRD (Product Requirements Document)
### Classification: CONFIDENTIAL | Founder Access Only

---

> *"Built in silence. Guided by purpose. Orchestrating the future of commerce."*
> -- Haidar Faras, Founder

---

## 1. Executive Summary

**Sovereign Business Engine** is a private, AI-powered business orchestration platform engineered exclusively for the Founder. It is NOT a fashion app -- it is a **Market Validation & Business Automation System** that uses 3 Instagram brands as living laboratories to validate demand, scale systems, and build authority.

The platform combines **real AI agents** (LangGraph.js for edge orchestration + CrewAI for deep analysis) with automated WhatsApp outreach (Fonnte API), Instagram lead scraping (ScraperAPI), and real-time revenue intelligence -- all orchestrated through a single command center with glassmorphism Terminal-Chic UI.

### What Changed from v1.0 to v3.0

| Aspect | v1.0 (Original PRD) | v2.0 (Current Build) | v3.0 (This PRD) |
|--------|---------------------|---------------------|-----------------|
| Identity | Private Dashboard | Business Engine | **AI-Orchestrated Sovereign Engine** |
| AI Agents | None (manual) | Manual Scout/Closer pages | **Real LangGraph.js + CrewAI agents** |
| Scout Agent | ScraperAPI button | Manual lead entry + scoring | **Autonomous IG scraping + AI scoring + auto-enrich** |
| Closer Agent | Message templates | WhatsApp template UI | **AI-generated personalized sequences + auto-send via Fonnte** |
| Analytics | Basic dashboard | Validation metrics | **AI-powered insight generation + automated reports** |
| WhatsApp | Planned (Fonnte) | Template display only | **Live Fonnte integration: send, broadcast, Day 0/3/7/14 auto-sequence** |
| Database | 6 tables planned | 8 tables built | **12+ tables with full orchestration data** |
| Intelligence | None | Static validation | **LangGraph.js workflow engine + CrewAI deep analysis crew** |

---

## 2. Problem Statement

Currently, business management is highly fragmented:

1. **Order recaps are manual** -- No automated pipeline from Instagram DM to order database
2. **WhatsApp interactions lack automation** -- Every outreach message is typed manually, no Day 0/3/7/14 sequences
3. **Lead generation relies on tedious scrolling** -- No automated Instagram scraping, no intelligent scoring
4. **Financial metrics are scattered** -- Revenue data exists in Supabase but has no AI-powered insights
5. **No autonomous decision-making** -- The system collects data but doesn't act on it
6. **3-Layer strategy exists but isn't orchestrated** -- Brands operate independently, no unified intelligence

### The Core Gap: Intelligence Layer

The v2.0 system has data infrastructure (Supabase) and UI (Hono + Cloudflare Pages), but **lacks the brain** -- the AI orchestration layer that transforms raw data into autonomous actions.

---

## 3. Product Vision & Mission

**Vision**: "The Brain behind the Empire -- Orchestrating Data, Automation & Sovereignty through AI Intelligence."

**Mission**: To build an impenetrable, AI-automated infrastructure that:
- Reduces operational friction by **90%**
- Enables **autonomous** lead discovery, scoring, and outreach
- Provides **real-time market validation intelligence** through AI agents
- Orchestrates the 3-Layer brand strategy as a **unified system**

---

## 4. Target Users

| User | Role | Access Level |
|------|------|-------------|
| Haidar Faras (Founder) | Sovereign Orchestrator | **Tier 0** - Full command center access |
| AI Agents (LangGraph.js) | Autonomous Workers | **Tier 1** - API-level execution access |
| CrewAI Crew (External) | Deep Analysis Agents | **Tier 2** - Scheduled analysis via REST API |

**There is NO public user**. This is a private sovereign system.

---

## 5. Core Features (P0 - CRITICAL)

### 5.1 Scout Agent (AI-Powered Lead Discovery)

**Current State**: Manual entry with auto-scoring algorithm
**Target State**: Autonomous AI agent that discovers, enriches, and scores leads

| Capability | Description | Tech |
|-----------|-------------|------|
| Instagram Scraping | Auto-discover fashion reseller accounts from IG | ScraperAPI + Hono route |
| AI Lead Scoring | Intelligent scoring based on followers, engagement, digital gap, niche fit | LangGraph.js agent |
| Lead Enrichment | Auto-fetch additional data (bio, post count, engagement rate) | ScraperAPI + AI analysis |
| Pipeline Management | Auto-categorize: New > Scored > Contacted > Converted > Lost | Supabase + state machine |
| Batch Processing | Process up to 50 leads per scraping session | Queue system |

**API Endpoints:**
```
POST /api/scout/gather      -- Trigger ScraperAPI scraping routine
POST /api/scout/ai-score    -- AI-powered scoring using LangGraph.js
GET  /api/scout/leads       -- List leads with filters
POST /api/scout/leads       -- Manual lead entry
PUT  /api/scout/leads/:id   -- Update lead
DELETE /api/scout/leads/:id -- Remove lead
POST /api/scout/enrich      -- AI-enrich lead data
```

**Scoring Algorithm (AI-Enhanced):**
```
Base Score Components:
  - Followers > 1,000:     +20 points
  - Followers > 5,000:     +15 bonus
  - Followers > 10,000:    +10 bonus
  - Digital Gap = High:    +25 points
  - Digital Gap = Medium:  +15 points
  - Phone number exists:   +10 points
  - Bio contains keywords: +10 points (AI-detected)
  - Engagement rate > 3%:  +15 points (AI-calculated)
  - Niche relevance:       +10 points (AI-analyzed)

AI Override: LangGraph agent can adjust score +/- 20 based on holistic analysis
Final Score: Capped at 100
```

### 5.2 Closer Agent (AI-Powered WhatsApp Outreach)

**Current State**: Template display with manual copy/paste
**Target State**: Autonomous AI outreach with Fonnte API integration

| Capability | Description | Tech |
|-----------|-------------|------|
| Fonnte Integration | Direct WhatsApp sending via Fonnte API | Hono route + Fonnte REST |
| AI Message Generation | Personalized messages per lead context | LangGraph.js agent |
| Auto-Sequence | Day 0, Day 3, Day 7, Day 14 scheduled follow-ups | Cron trigger + Supabase |
| Bulk Broadcast | Mass outreach to scored leads (score >= target) | Fonnte broadcast API |
| Response Tracking | Log sent/delivered/read/replied status | wa_logs table |
| Escalation Rules | Auto-escalate to manual if no reply after Day 14 | State machine |

**WhatsApp Message Templates:**
```
Day 0 (Introduction):
  "Halo kak {name}! Saya dari FashionKas.
   Kami lihat {shop_name} punya potensi besar di fashion.
   Mau tau cara scale bisnis fashion dengan sistem reseller otomatis? 
   Info lengkap: https://fashionkas.pages.dev"

Day 3 (Demo Offer):
  "Hai kak {name}, ini dari FashionKas.
   Kami udah siapin demo khusus buat {shop_name}.
   Bisa langsung lihat katalog produk kami di sini
   Ada harga khusus reseller yang bisa langsung jalan."

Day 7 (Social Proof):
  "Kak {name}, tau gak kalau {converted_count} toko fashion 
   udah gabung jadi reseller FashionKas bulan ini?
   {shop_name} bisa jadi selanjutnya. Yuk ngobrol!"

Day 14 (Final / Urgency):
  "Last call kak {name}!
   Slot reseller bulan ini tinggal {remaining_slots}.
   Kalau {shop_name} mau gabung, bisa langsung konfirmasi ke sini."
```

**API Endpoints:**
```
POST /api/wa/send           -- Send individual WhatsApp via Fonnte
POST /api/wa/broadcast      -- Bulk broadcast to target leads
POST /api/closer/campaigns  -- Create outreach campaign
GET  /api/closer/campaigns  -- List campaigns
GET  /api/closer/templates  -- Get message templates
POST /api/closer/ai-compose -- AI-generate personalized message
GET  /api/closer/logs       -- Outreach audit trail
POST /api/closer/sequence   -- Trigger Day X auto-sequence
```

**Fonnte API Integration:**
```
Base URL: https://api.fonnte.com
Headers: Authorization: {FONNTE_TOKEN}

POST /send     -- Send single message
  Body: { target: "phone", message: "text", delay: 2 }

POST /send     -- Send bulk (multiple targets)
  Body: { target: "phone1,phone2", message: "text", delay: 5 }

GET /device    -- Check device status
GET /get-messages -- Fetch message history
```

### 5.3 WhatsApp Bridge (Fonnte API)

**Current State**: Not connected
**Target State**: Full bidirectional WhatsApp communication

| Feature | Fonnte Endpoint | Description |
|---------|----------------|-------------|
| Send Message | POST /send | Individual outreach |
| Bulk Broadcast | POST /send (multi-target) | Mass outreach |
| Device Status | GET /device | Monitor WA connection |
| Message History | GET /get-messages | Fetch conversation logs |
| Webhook | POST /webhook (incoming) | Receive reply notifications |

### 5.4 Private Auth Gate

**Current State**: 4-digit PIN + JWT (working)
**Target State**: Enhanced with Device ID locking

| Security Layer | Implementation | Status |
|---------------|---------------|--------|
| PIN Authentication | 4-digit master PIN (bcrypt comparison) | DONE |
| JWT Token | 7-day expiry, HS256 signed | DONE |
| Device ID Locking | Browser fingerprint cookie | TODO |
| noindex/nofollow | Robots meta tag | DONE |
| Zero-Trust Model | No public registration | DONE |
| Supabase RLS | Row Level Security on all tables | DONE |

---

## 6. Core Features (P1 - HIGH)

### 6.1 Real-Money Dashboard

**Current State**: Revenue stats from Supabase
**Target State**: AI-powered financial intelligence

| Metric | Data Source | AI Enhancement |
|--------|-----------|---------------|
| Total Revenue | orders.total_amount (completed) | Trend prediction |
| Unpaid Invoices | orders (pending/processing) | Payment probability scoring |
| Reseller GMV | orders grouped by source | Growth rate analysis |
| Average Order Value | Computed from orders | Optimization suggestions |
| Customer Lifetime Value | customers.total_spent | Tier upgrade predictions |
| Revenue by Channel | orders.source breakdown | Channel attribution AI |

**API Endpoints:**
```
GET  /api/dashboard/stats    -- Core metrics
GET  /api/dashboard/activity -- Recent activity
GET  /api/dashboard/ai-insights -- AI-generated business insights
```

### 6.2 Market Validation Intelligence

**Current State**: Validation events + metrics (working)
**Target State**: AI-powered validation with autonomous insight generation

| Layer | Brand | Validation Target | AI Capability |
|-------|-------|------------------|---------------|
| Demand | @fashionkas.official | Product-Market Fit | AI demand signal detection |
| System | @resellerkas.official | Scalability Proof | AI system bottleneck analysis |
| Trust | @haidar_faras_m | Authority Building | AI trust score computation |

---

## 7. Core Features (P2 - MEDIUM)

### 7.1 Instagram Orchestration (Content Command Center)

| Capability | Description |
|-----------|-------------|
| Content Calendar | Schedule posts across 3 IG accounts |
| Cross-post Sync | Ensure brand consistency |
| Engagement Tracking | Monitor likes/comments/shares per account |
| AI Caption Generator | Generate captions optimized per account type |

### 7.2 AI Insight Agent (LangGraph.js)

| Capability | Trigger | Output |
|-----------|---------|--------|
| Daily Business Digest | Scheduled (daily) | Summary of key metrics + recommendations |
| Anomaly Detection | On data change | Alert when metrics deviate significantly |
| Opportunity Spotter | On new lead scored 80+ | Recommend immediate action |
| Revenue Forecast | Weekly scheduled | 7-day revenue projection |

---

## 8. Database Schema v3.0

### Existing Tables (v2.0 - DONE)
| Table | Purpose | Records |
|-------|---------|---------|
| products | Inventory (8 SKU) | 8 |
| customers | CRM + tiers | 6 |
| orders | Transactions | 8 |
| leads | Scout pipeline | 10 |
| outreach_campaigns | Closer campaigns | 0 |
| outreach_logs | WA message audit | 0 |
| validation_events | Market validation | 11 |
| validation_metrics | Quantitative data | 15 |

### New Tables (v3.0 - TODO)
| Table | Purpose | Key Columns |
|-------|---------|------------|
| stores | Reseller tenant management | id, phone, store_name, pin_hash, device_id |
| order_items | Line items per order | id, order_id, product_id, qty, subtotal |
| wa_logs | Fonnte audit trail | id, lead_id, phone, type, message, fonnte_response, status, sent_at |
| ai_tasks | AI agent task queue | id, agent_type, task_type, input, output, status, created_at, completed_at |
| ai_insights | Generated AI insights | id, layer, insight_type, title, content, confidence, actionable, created_at |
| content_calendar | IG content scheduling | id, account, type, title, caption, media_url, scheduled_date, status |
| analytics_metrics | IG analytics per account | id, account, impressions, profile_visits, bio_clicks, registrations, date |

---

## 9. Success Metrics (KPIs)

| KPI | Current | Target | Measurement |
|-----|---------|--------|-------------|
| Operational Friction Reduction | ~30% | **90%** | Time saved per task |
| Lead Discovery Speed | Manual (30 min/10 leads) | **Automated (2 min/50 leads)** | ScraperAPI batch |
| Outreach Automation | 0% automated | **80% automated** | Fonnte auto-send rate |
| Revenue Tracking Latency | Manual entry | **Real-time** | Dashboard refresh time |
| AI Insight Accuracy | N/A | **>70% actionable** | User acceptance rate |
| Lead Conversion Rate | 10% | **25%** | leads.converted / leads.total |
| Validation Score | 100 | **Maintain 100** | Continuous |
| WhatsApp Response Rate | N/A | **>30%** | outreach_logs analysis |

---

## 10. Constraints & Assumptions

### Constraints
- Dashboard MUST be strictly inaccessible to the public (`noindex` mandatory)
- Cloudflare Workers has 10ms CPU time limit (free plan) -- AI-heavy tasks need external service
- CrewAI is Python-based -- cannot run directly in Cloudflare Workers, needs external deployment
- Fonnte API has rate limits for WhatsApp message delivery
- ScraperAPI has monthly credit limits (check plan)

### Assumptions
- Fonnte API remains stable for WhatsApp delivery
- Target users (resellers) heavily use WhatsApp and Instagram
- LangGraph.js is compatible with Cloudflare Workers edge runtime
- CrewAI Enterprise or self-hosted FastAPI provides REST API access
- Supabase free tier is sufficient for current data volume

### Credential Inventory
| Service | Type | Status |
|---------|------|--------|
| Supabase | URL + Anon Key + Service Key | CONFIGURED |
| JWT | Secret key | CONFIGURED |
| ScraperAPI | API key | CONFIGURED |
| Fonnte | Token | NEEDED |
| LangChain | Personal Access Token (PAT) | PROVIDED |
| LangChain | Service Key | PROVIDED |
| CrewAI | Organization ID | PROVIDED |
| CrewAI | Personal Access Token | PROVIDED |
| CrewAI | Enterprise Auth Token | PROVIDED |
| SerpAPI | Private Key | PROVIDED |
| Cloudflare | Account ID + API Token | CONFIGURED |

---

## Document Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-28 | Haidar Faras | Original PRD |
| 2.0 | 2026-03-31 | Sovereign Engine | Added Market Validation Intelligence |
| 3.0 | 2026-03-31 | Sovereign Engine | AI Agent Architecture, LangGraph.js + CrewAI integration, Fonnte API specs, enhanced Scout/Closer with real AI |
