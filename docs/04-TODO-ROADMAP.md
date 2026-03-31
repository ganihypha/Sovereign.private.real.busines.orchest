# SOVEREIGN BUSINESS ENGINE v3.0
# Todo & Development Roadmap
### Classification: CONFIDENTIAL | Founder Access Only

---

## 1. Current State Assessment

### What's Built (v2.0) -- DONE
| Feature | Status | Notes |
|---------|--------|-------|
| Cloudflare Pages + Hono.js | LIVE | sovereign-orchestrator.pages.dev |
| PIN Authentication + JWT | LIVE | 4-digit PIN, 7-day token |
| Landing Page (3-Layer) | LIVE | Glassmorphism dark theme |
| Dashboard (Command Center) | LIVE | Revenue, orders, leads, customers stats |
| Scout Agent UI | LIVE | Add leads, auto-score, filter, delete |
| Closer Agent UI | LIVE | Message templates, send log, outreach |
| Products CRUD | LIVE | 8 SKU active in Supabase |
| Orders CRUD | LIVE | 8 orders with status tracking |
| Customers CRUD | LIVE | 6 customers with tier system |
| Reports Page | LIVE | Revenue, lead conversion, inventory |
| Market Validation Intelligence | LIVE | 3-layer validation dashboard |
| Supabase Database (8 tables) | LIVE | All tables + RLS + indexes |
| Supabase Seed Data | LIVE | Products, customers, orders, leads, events, metrics |
| GitHub Repository | LIVE | ganihypha/Sovereign.private.real.busines.orchest |
| Cloudflare Deployment | LIVE | Auto-deploy via wrangler |

### What's Missing (v3.0 Targets)
| Feature | Priority | Effort | Impact |
|---------|----------|--------|--------|
| Fonnte WA API Integration | P0 | Medium | HIGH -- enables real outreach |
| ScraperAPI Live Integration | P0 | Medium | HIGH -- enables real lead discovery |
| LangGraph.js Agent Setup | P0 | High | CRITICAL -- enables AI intelligence |
| CrewAI External Service | P1 | High | HIGH -- enables deep analysis |
| AI Intelligence Page | P1 | Medium | HIGH -- new command center section |
| Device ID Locking | P1 | Low | MEDIUM -- enhanced security |
| New DB Tables (4+) | P1 | Low | HIGH -- data infrastructure |
| Content Calendar | P2 | Medium | MEDIUM -- IG management |

---

## 2. Priority Matrix

```
         HIGH IMPACT
              |
    ----------+----------
    |  QUICK  |  MAJOR  |
    |  WINS   | PROJECTS|
    |         |         |
LOW-+----+----+----+----+-HIGH
EFFORT   |         |     EFFORT
    |  FILL-  |  RE-    |
    |  INS    | EVALUATE|
    |         |         |
    ----------+----------
              |
         LOW IMPACT
```

### Quick Wins (High Impact / Low Effort)
1. Fonnte API direct message routing
2. Device ID cookie locking
3. New Supabase tables (wa_logs, ai_tasks, ai_insights, order_items)
4. robots.txt configuration

### Major Projects (High Impact / High Effort)
1. LangGraph.js agent integration in Cloudflare Workers
2. Scout Agent ScraperAPI live integration
3. Closer Agent auto-sequence (Day 0/3/7/14)
4. Real-Money Supabase dashboard aggregation upgrade
5. CrewAI external service deployment

### Fill-ins (Low Impact / Low Effort)
1. Status tag UI updates
2. Toast notification system
3. Loading skeleton animations
4. Error boundary pages

### Re-evaluate (Low Impact / High Effort)
1. Complex graph visualizations (Chart.js)
2. Fully automated AI IG posting
3. Real-time WebSocket notifications

---

## 3. Execution Phases

### PHASE 1: Foundation Hardening (Sprint 1 -- 1-2 sessions)
**Goal**: Secure the base, add missing infrastructure tables, connect Fonnte

| # | Task | Priority | Status |
|---|------|----------|--------|
| 1.1 | Create wa_logs table in Supabase | P0 | PENDING |
| 1.2 | Create order_items table in Supabase | P1 | PENDING |
| 1.3 | Create ai_tasks table in Supabase | P1 | PENDING |
| 1.4 | Create ai_insights table in Supabase | P1 | PENDING |
| 1.5 | Add FONNTE_TOKEN to .dev.vars + Cloudflare secrets | P0 | PENDING |
| 1.6 | Build `/api/wa/send` route (Fonnte integration) | P0 | PENDING |
| 1.7 | Build `/api/wa/broadcast` route | P0 | PENDING |
| 1.8 | Build `/api/wa/status` route (device check) | P1 | PENDING |
| 1.9 | Add Device ID locking to auth flow | P1 | PENDING |
| 1.10 | Add robots.txt to public/ directory | P1 | PENDING |

### PHASE 2: Scout Agent Intelligence (Sprint 2 -- 2-3 sessions)
**Goal**: Make Scout Agent actually discover and score leads using AI

| # | Task | Priority | Status |
|---|------|----------|--------|
| 2.1 | Build `/api/scout/gather` -- ScraperAPI IG scraping | P0 | PENDING |
| 2.2 | Install @langchain/openai + @langchain/langgraph | P0 | PENDING |
| 2.3 | Configure OPENAI_API_KEY + LANGCHAIN_API_KEY in env | P0 | PENDING |
| 2.4 | Build LangGraph.js ScoutScorer agent | P0 | PENDING |
| 2.5 | Build `/api/scout/ai-score` route | P0 | PENDING |
| 2.6 | Build `/api/scout/enrich` -- AI lead enrichment | P1 | PENDING |
| 2.7 | Update Scout UI for AI scoring button | P1 | PENDING |
| 2.8 | Add "Gather from IG" button to Scout page | P1 | PENDING |
| 2.9 | Build ScraperAPI response parser | P1 | PENDING |
| 2.10 | Test full flow: Gather -> Score -> Enrich -> Store | P0 | PENDING |

### PHASE 3: Closer Agent Automation (Sprint 3 -- 2-3 sessions)
**Goal**: Automate WhatsApp outreach with Fonnte + AI-composed messages

| # | Task | Priority | Status |
|---|------|----------|--------|
| 3.1 | Build LangGraph.js MessageComposer agent | P0 | PENDING |
| 3.2 | Build `/api/closer/ai-compose` route | P0 | PENDING |
| 3.3 | Build `/api/closer/sequence` -- auto-sequence trigger | P0 | PENDING |
| 3.4 | Implement Day 0 outreach (immediate) | P0 | PENDING |
| 3.5 | Implement Day 3 follow-up (scheduled) | P1 | PENDING |
| 3.6 | Implement Day 7 follow-up (scheduled) | P1 | PENDING |
| 3.7 | Implement Day 14 final call (scheduled) | P2 | PENDING |
| 3.8 | Update Closer UI for AI compose + live send | P1 | PENDING |
| 3.9 | Build outreach analytics (sent/delivered/replied rates) | P1 | PENDING |
| 3.10 | Test full flow: Select Lead -> AI Compose -> Fonnte Send -> Log | P0 | PENDING |

### PHASE 4: AI Intelligence Center (Sprint 4 -- 2-3 sessions)
**Goal**: Build the AI brain with LangGraph.js insights + CrewAI deep analysis

| # | Task | Priority | Status |
|---|------|----------|--------|
| 4.1 | Build LangGraph.js InsightGenerator agent | P0 | PENDING |
| 4.2 | Build `/api/dashboard/ai-insights` route | P0 | PENDING |
| 4.3 | Build `/api/ai/tasks` CRUD routes | P1 | PENDING |
| 4.4 | Build `/api/ai/insights` route | P1 | PENDING |
| 4.5 | Create AI Intelligence page (`/app/ai`) | P1 | PENDING |
| 4.6 | Build AI Insight cards component | P1 | PENDING |
| 4.7 | Deploy CrewAI service (FastAPI + Docker) | P1 | PENDING |
| 4.8 | Build `/api/ai/crew/kickoff` route | P1 | PENDING |
| 4.9 | Build `/api/ai/crew/status/:id` route | P1 | PENDING |
| 4.10 | Integrate LangSmith tracing for monitoring | P2 | PENDING |

### PHASE 5: Real-Money Dashboard Upgrade (Sprint 5 -- 1-2 sessions)
**Goal**: AI-powered financial intelligence

| # | Task | Priority | Status |
|---|------|----------|--------|
| 5.1 | Add unpaid invoice calculation | P1 | PENDING |
| 5.2 | Add reseller GMV tracking | P1 | PENDING |
| 5.3 | Revenue by channel breakdown (IG/WA/catalog) | P1 | PENDING |
| 5.4 | Customer Lifetime Value calculation | P2 | PENDING |
| 5.5 | AI revenue trend prediction | P2 | PENDING |
| 5.6 | Add Chart.js visualizations (if time) | P2 | PENDING |

### PHASE 6: Content & Polish (Sprint 6 -- 1-2 sessions)
**Goal**: Instagram content management + final polish

| # | Task | Priority | Status |
|---|------|----------|--------|
| 6.1 | Create content_calendar table | P2 | PENDING |
| 6.2 | Create analytics_metrics table | P2 | PENDING |
| 6.3 | Build Content Calendar page | P2 | PENDING |
| 6.4 | Build IG Analytics page | P2 | PENDING |
| 6.5 | Mobile responsive optimization | P1 | PENDING |
| 6.6 | Error boundaries + toast notifications | P1 | PENDING |
| 6.7 | Loading skeletons for all pages | P2 | PENDING |
| 6.8 | Final security audit | P0 | PENDING |
| 6.9 | Performance optimization | P1 | PENDING |
| 6.10 | Complete README + documentation update | P1 | PENDING |

---

## 4. Dependency Map

```
Phase 1 (Foundation)
  ├── 1.1-1.4 DB tables --> Phase 2, 3, 4 need these
  ├── 1.5-1.7 Fonnte --> Phase 3 (Closer) depends on this
  └── 1.9 Device ID --> Independent

Phase 2 (Scout AI)
  ├── Needs: ScraperAPI key (HAVE)
  ├── Needs: OpenAI API key (NEED)
  ├── Needs: LangChain keys (HAVE)
  └── Needs: Phase 1 DB tables

Phase 3 (Closer AI)
  ├── Needs: Fonnte token (NEED)
  ├── Needs: Phase 1 Fonnte routes
  ├── Needs: Phase 2 Scout (scored leads)
  └── Needs: LangGraph.js (from Phase 2)

Phase 4 (AI Intelligence)
  ├── Needs: Phase 2 LangGraph.js setup
  ├── Needs: Phase 1 ai_tasks + ai_insights tables
  ├── Needs: CrewAI credentials (HAVE)
  └── Optional: Docker/Cloud Run for CrewAI service

Phase 5 (Dashboard)
  ├── Needs: Phase 1-3 data flowing
  └── Independent calculations possible now

Phase 6 (Polish)
  └── Can run parallel with Phase 4-5
```

---

## 5. Credentials Needed for Next Session

| Service | Status | Action Needed |
|---------|--------|---------------|
| Supabase | CONFIGURED | None |
| ScraperAPI | CONFIGURED | None |
| Cloudflare | CONFIGURED | None |
| LangChain PAT | PROVIDED | Add to .dev.vars |
| LangChain Service Key | PROVIDED | Add to .dev.vars |
| CrewAI Org ID | PROVIDED | Add to .dev.vars |
| CrewAI PAT | PROVIDED | Add to .dev.vars |
| CrewAI Enterprise Token | PROVIDED | Add to .dev.vars |
| SerpAPI | PROVIDED | Add to .dev.vars |
| **Fonnte Token** | **NOT PROVIDED** | **User needs to get from fonnte.com** |
| **OpenAI API Key** | **NOT PROVIDED** | **User needs to provide** |

---

## 6. Session Planning

### Next Session Focus (RECOMMENDED)
**Phase 1 + Phase 2 Start**: Foundation hardening + Scout Agent AI

Expected deliverables:
1. New Supabase tables created (wa_logs, ai_tasks, ai_insights, order_items)
2. Fonnte API routes built (if token available)
3. LangGraph.js installed and configured
4. ScoutScorer AI agent functional
5. `/api/scout/gather` live with ScraperAPI
6. Deploy + push to GitHub

### Prerequisites for Next Session
1. Provide **Fonnte API Token** (register at fonnte.com if not done)
2. Provide **OpenAI API Key** (for LangChain.js LLM calls)
3. Review this roadmap and confirm priorities

---

## 7. Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| LangGraph.js incompatible with CF Workers | Low | High | Fallback to direct OpenAI API calls |
| Fonnte API rate limits | Medium | Medium | Implement queue with delays |
| ScraperAPI credits exhausted | Medium | Medium | Cache results, limit batch size |
| CrewAI service hosting costs | Medium | Low | Start with LangGraph.js only, add CrewAI later |
| CF Workers 10ms CPU limit | High | High | Move heavy AI tasks to CrewAI external service |
| OpenAI API costs | Medium | Medium | Use GPT-4o-mini for edge tasks, limit tokens |

---

## Document Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-28 | Original roadmap |
| 2.0 | 2026-03-31 | Updated with completed items |
| 3.0 | 2026-03-31 | Full 6-phase roadmap with AI agents, dependency map, credentials checklist, risk assessment |
