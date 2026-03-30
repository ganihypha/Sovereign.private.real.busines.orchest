# Sovereign Private Business Orchestrator v1.0

## Project Overview
- **Name**: Sovereign Private Orchestrator
- **Engine**: FashionKas
- **Goal**: 3-Layer private command center for orchestrating Instagram reseller business across 3 accounts
- **Access**: Founder-only, PIN-protected, hidden from search engines

## Live URLs
- **Production**: https://sovereign-orchestrator.pages.dev
- **Landing**: https://sovereign-orchestrator.pages.dev/
- **Login**: https://sovereign-orchestrator.pages.dev/login
- **Dashboard**: https://sovereign-orchestrator.pages.dev/app/dashboard
- **GitHub**: https://github.com/ganihypha/Sovereign.private.real.busines.orchest

## 3-Layer Instagram Architecture

| Layer | Account | Role | Function |
|-------|---------|------|----------|
| **Brand Machine** | @fashionkas.official | Revenue Engine | Konversi traffic ke user berbayar |
| **Growth Engine** | @resellerkas.official | Community & UGC | Edukasi reseller & seed content |
| **Trust Engine** | @haidar_faras_m | Founder Authority | Build in Public & credibility |

## Features (Completed)

### Core System
- PIN-based authentication (4-digit) with JWT (7-day expiry)
- Glassmorphism dark UI theme (Sovereign Purple)
- NoIndex/NoFollow - hidden from search engines
- Responsive mobile sidebar navigation
- Toast notifications

### Command Center (Dashboard)
- 3-Layer status monitoring (Brand / Growth / Founder)
- Real-time statistics: revenue, orders, leads, customers
- Recent orders & recent leads activity feed
- Quick stats: products, total orders, pending, total leads

### Scout Agent (Lead Discovery)
- Add leads manually (shop name, platform, username, phone, followers)
- Auto-scoring algorithm (Digital Gap scoring)
- Filter by status: new, scored, contacted, converted
- Score categories: Hot (70+), Warm (40-69), Cold (<40)
- Send to Closer Agent flow

### Closer Agent (WA Outreach)
- Pre-built message templates (Day 0/3/7/14)
- Custom message composition
- Outreach logging & history
- Lead status auto-update on contact
- URL parameter support (from Scout Agent)

### Product Inventory
- Full CRUD (create, read, update, delete)
- SKU auto-generation
- Category filtering
- Price & cost price tracking
- Stock level monitoring with min-stock alerts

### Order Management
- Create orders (customer, phone, amount, notes)
- Status workflow: pending > processing > completed / cancelled
- Filter by status
- Source tracking (manual, WA, etc.)

### Customer CRM
- Customer database with phone, city, address
- Tier system: Bronze, Silver, Gold, VIP
- Search by name or phone
- Order & spending totals

### Reports & Analytics
- Revenue report with timeline visualization
- Lead conversion rate tracking
- Inventory health (low stock, out of stock)
- Period filter: 7, 30, 90 days

### Settings
- Security status overview
- Connected services status (Supabase, Cloudflare, ScraperAPI)
- 3-Layer orchestration status panel

### Public Catalog
- Public product catalog by store slug
- No auth required: /catalog/{slug}
- Grid display with price & stock

## API Endpoints

### Authentication
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/login` | Login with PIN, returns JWT |
| GET | `/api/auth/verify` | Verify JWT token |

### Dashboard
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/dashboard/stats` | Overview statistics |
| GET | `/api/dashboard/activity` | Recent orders & leads |

### Products
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/products` | List products (?search=&category=) |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### Orders
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/orders` | List orders (?status=) |
| GET | `/api/orders/:id` | Get single order |
| POST | `/api/orders` | Create order |
| PUT | `/api/orders/:id` | Update order |
| DELETE | `/api/orders/:id` | Delete order |

### Customers
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/customers` | List customers (?search=) |
| POST | `/api/customers` | Create customer |
| PUT | `/api/customers/:id` | Update customer |
| DELETE | `/api/customers/:id` | Delete customer |

### Scout Agent
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/scout/leads` | List leads (?status=&min_score=) |
| POST | `/api/scout/leads` | Add lead |
| PUT | `/api/scout/leads/:id` | Update lead |
| DELETE | `/api/scout/leads/:id` | Delete lead |
| POST | `/api/scout/score` | Auto-score all new leads |

### Closer Agent
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/closer/campaigns` | List campaigns |
| POST | `/api/closer/campaigns` | Create campaign |
| GET | `/api/closer/templates` | Get message templates |
| POST | `/api/closer/send` | Send outreach message |
| GET | `/api/closer/logs` | Get outreach history |

### Reports
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/reports/revenue` | Revenue report (?period=30) |
| GET | `/api/reports/products` | Inventory health |
| GET | `/api/reports/leads` | Lead conversion rates |

### Catalog (Public)
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/catalog/:slug` | Public product catalog |

### System
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | System health check |

## Page Routes
| Path | Description |
|------|-------------|
| `/` | Landing page |
| `/login` | PIN login |
| `/app` | Dashboard (redirect) |
| `/app/dashboard` | Command Center |
| `/app/scout` | Scout Agent |
| `/app/closer` | Closer Agent |
| `/app/products` | Inventory |
| `/app/orders` | Orders |
| `/app/customers` | Customers |
| `/app/reports` | Reports |
| `/app/settings` | Settings |
| `/catalog/:slug` | Public catalog |

## Data Architecture

### Database: Supabase PostgreSQL
| Table | Purpose |
|-------|---------|
| `products` | Product inventory (name, sku, price, stock) |
| `customers` | CRM (name, phone, city, tier) |
| `orders` | Order tracking (items, amount, status) |
| `leads` | Scout Agent leads (shop, score, gap, status) |
| `outreach_campaigns` | Closer Agent campaigns |
| `outreach_logs` | Message send history |

### Security
- Service-role key for all DB operations (bypasses RLS)
- RLS enabled on all tables
- JWT authentication with HMAC-SHA256
- Secrets stored in Cloudflare Pages environment

## Tech Stack
- **Runtime**: Cloudflare Workers (Edge)
- **Framework**: Hono v4
- **Build**: Vite
- **Database**: Supabase PostgreSQL
- **Auth**: Custom JWT (Web Crypto API)
- **UI**: Tailwind CSS (CDN) + Glassmorphism
- **Icons**: Font Awesome 6
- **Font**: Inter + JetBrains Mono

## Deployment
- **Platform**: Cloudflare Pages
- **Status**: Active
- **Last Updated**: 2026-03-30
- **Version**: 1.0

## Setup (Supabase)
Run `supabase-setup.sql` in Supabase SQL Editor to create all tables, indexes, and RLS policies.

## User Guide
1. Go to https://sovereign-orchestrator.pages.dev
2. Click "Access Command Center"
3. Enter 4-digit master PIN
4. Use sidebar navigation to access all modules
5. Start by adding products, then create leads via Scout Agent
6. Use Closer Agent to send WA outreach messages to scored leads
7. Track orders and customer growth via Dashboard & Reports
