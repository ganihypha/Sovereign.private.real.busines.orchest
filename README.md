# Sovereign Business Engine v2.0

## The Real Market Validated Data Orchestrator

> **Identity**: Business Engineering & Market Validation Systems
> **Not selling fashion** — selling an Orchestration Engine with battle-tested proof.

## Live URLs
| Service | URL |
|---------|-----|
| **Production** | https://sovereign-orchestrator.pages.dev |
| **Login** | https://sovereign-orchestrator.pages.dev/login |
| **Dashboard** | https://sovereign-orchestrator.pages.dev/app/dashboard |
| **Market Validation** | https://sovereign-orchestrator.pages.dev/app/validation |
| **GitHub** | https://github.com/ganihypha/Sovereign.private.real.busines.orchest |

## 3-Layer Market Validation Architecture

The 3 Instagram brands function as a **Market Laboratory** for real business validation:

| Layer | Brand | Validation Type | Purpose |
|-------|-------|----------------|---------|
| **Demand** | @fashionkas.official | Product-Market Fit | Validates market need for automation tools |
| **System** | @resellerkas.official | Scale & Growth | Validates scaling effectiveness of the engine |
| **Trust** | @haidar_faras_m | Authority & Social Proof | Validates founder-driven credibility |

## Orchestration Engineering Stack

```
+------------------------------------------+
|     SOVEREIGN BUSINESS ENGINE v2.0       |
+------------------------------------------+
|  Intelligence Layer (Scout Agent)        |
|  - Digital Gap analysis                  |
|  - Lead scoring & discovery              |
+------------------------------------------+
|  Communication Layer (Closer Agent)      |
|  - WA outreach automation                |
|  - Template campaigns                    |
+------------------------------------------+
|  Data Layer (Supabase PostgreSQL)        |
|  - Products, Orders, Customers           |
|  - Leads, Outreach logs                  |
+------------------------------------------+
|  Validation Layer (v2.0 NEW)             |
|  - Market Validation Intelligence        |
|  - Validation Events & Metrics           |
|  - 3-Layer Proof System                  |
+------------------------------------------+
```

## Features

### v2.0 (NEW) - Market Validation Intelligence
- **3-Layer Validation Dashboard** with Demand/System/Trust metrics
- **Validation Events** - Log observations, milestones, feedback, conversions, insights
- **Validation Metrics** - Track quantitative market data per layer
- **Comprehensive Validation Report** - Auto-generated with verdicts
- **Engine Health Score** - Validation percentage across all 3 layers
- **Proof Status** - COLLECTING -> VALIDATED based on real data

### Core System
- PIN-based authentication (4-digit) with JWT (7-day expiry)
- Glassmorphism dark UI theme (Sovereign Purple)
- NoIndex/NoFollow - hidden from search engines
- Responsive mobile sidebar navigation

### Command Center (Dashboard)
- 3-Layer Validation status monitoring
- Real-time stats + Validation Intelligence quick view
- Recent orders & leads activity feed

### Scout Agent (Lead Discovery)
- Manual lead addition + Auto-scoring algorithm
- Digital Gap scoring (High/Medium/Low)
- Filter & send to Closer Agent

### Closer Agent (WA Outreach)
- Pre-built message templates (Day 0/3/7/14)
- Outreach logging & campaign tracking

### Business Operations
- Product inventory (CRUD + stock alerts)
- Order management (status workflow)
- Customer CRM (tier system)
- Revenue reports & analytics

## API Endpoints

### Market Validation Intelligence (v2.0)
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/validation/stats` | Full 3-layer validation statistics |
| POST | `/api/validation/events` | Log validation event |
| GET | `/api/validation/events` | Get events (?layer=) |
| DELETE | `/api/validation/events/:id` | Delete event |
| POST | `/api/validation/metrics` | Record metric |
| GET | `/api/validation/metrics` | Get metrics (?layer=) |
| GET | `/api/validation/report` | Full validation report |

### All Other APIs
| Group | Routes |
|-------|--------|
| Auth | POST `/api/auth/login`, GET `/api/auth/verify` |
| Dashboard | GET `/api/dashboard/stats`, GET `/api/dashboard/activity` |
| Products | GET/POST `/api/products`, GET/PUT/DELETE `/api/products/:id` |
| Orders | GET/POST `/api/orders`, GET/PUT/DELETE `/api/orders/:id` |
| Customers | GET/POST `/api/customers`, PUT/DELETE `/api/customers/:id` |
| Scout | GET/POST `/api/scout/leads`, PUT/DELETE `/api/scout/leads/:id`, POST `/api/scout/score` |
| Closer | GET/POST `/api/closer/campaigns`, GET `/api/closer/templates`, POST `/api/closer/send`, GET `/api/closer/logs` |
| Reports | GET `/api/reports/revenue`, GET `/api/reports/products`, GET `/api/reports/leads` |
| Catalog | GET `/api/catalog/:slug` |
| Health | GET `/api/health` |

## Page Routes
| Path | Description |
|------|-------------|
| `/` | Landing page (Engine identity) |
| `/login` | PIN login (4-digit keypad) |
| `/app/dashboard` | Command Center |
| `/app/validation` | **Market Validation Intelligence** (v2.0) |
| `/app/scout` | Scout Agent |
| `/app/closer` | Closer Agent |
| `/app/products` | Inventory |
| `/app/orders` | Orders |
| `/app/customers` | Customers |
| `/app/reports` | Reports |
| `/app/settings` | Settings & Architecture |
| `/catalog/:slug` | Public catalog |

## Data Architecture

### Supabase Tables
| Table | Purpose |
|-------|---------|
| `products` | Product inventory |
| `customers` | CRM database |
| `orders` | Order tracking |
| `leads` | Scout Agent leads |
| `outreach_campaigns` | Closer Agent campaigns |
| `outreach_logs` | Message history |
| `validation_events` | **v2.0** Market validation events |
| `validation_metrics` | **v2.0** Quantitative validation data |

## Exit/Scale Strategy

What you offer to investors/clients:
- **Not "Fashion App"** but **"Sovereign Business Engine"**
- Battle-tested with 3 brands running on the platform
- Real Market Validated Data as proof
- Selling the **Engine**, not the wheels

## Tech Stack
- **Runtime**: Cloudflare Workers (Edge)
- **Framework**: Hono v4
- **Build**: Vite
- **Database**: Supabase PostgreSQL
- **Auth**: Custom JWT (Web Crypto API)
- **UI**: Tailwind CSS + Glassmorphism Dark Theme

## Setup
1. Run `supabase-setup.sql` in Supabase SQL Editor (includes v2.0 tables)
2. Set environment secrets in Cloudflare Pages
3. Deploy: `npm run build && wrangler pages deploy dist`

## Deployment
- **Platform**: Cloudflare Pages
- **Status**: Active
- **Version**: 2.0
- **Last Updated**: 2026-03-31
