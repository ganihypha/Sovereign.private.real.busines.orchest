# SOVEREIGN BUSINESS ENGINE v3.0
# Design Document
### Classification: CONFIDENTIAL | Founder Access Only

---

## 1. Design Philosophy

**"Terminal-Chic Glassmorphism"** -- Blends the raw, technical feel of a hacker terminal with the premium, polished look of a modern fintech SaaS. The design communicates **intelligence, exclusivity, and supreme control**.

This is NOT a consumer app. This is a **Founder's private command center** that feels like operating mission control.

---

## 2. Color System

### Primary Palette
| Name | Hex | Usage |
|------|-----|-------|
| Deep Black (Background) | `#0a0a0f` | Main background, establishes void aesthetic |
| Sovereign Purple Deep | `#6B21A8` | Accent gradients, premium feel |
| Sovereign Purple | `#7C3AED` | Primary buttons, active states |
| Matrix Green | `#22C55E` | Success states, active indicators, "online" |
| Warning Gold | `#F59E0B` | Warnings, pending states, attention items |
| Glass Surface | `rgba(255, 255, 255, 0.05)` | Card backgrounds, panels |
| Glass Border | `rgba(255, 255, 255, 0.1)` | Card borders, dividers |

### Status Colors
| Status | Color | Hex |
|--------|-------|-----|
| Active / Online / Completed | Green | `#22C55E` |
| Warning / Pending / Warm | Gold | `#F59E0B` |
| Error / Critical / Hot | Red | `#EF4444` |
| Info / New / Cold | Blue | `#3B82F6` |
| Neutral / Inactive | Gray | `#6B7280` |

### Tier Colors (Customers)
| Tier | Color | Badge |
|------|-------|-------|
| VIP | Gold gradient | `bg-gradient-to-r from-yellow-500 to-amber-500` |
| Gold | Amber | `bg-amber-500/20 text-amber-400` |
| Silver | Gray | `bg-gray-500/20 text-gray-300` |
| Bronze | Brown/Orange | `bg-orange-500/20 text-orange-400` |

### Score Colors (Leads)
| Score Range | Color | Label |
|-------------|-------|-------|
| 80-100 | Green | HOT |
| 60-79 | Yellow/Gold | WARM |
| 40-59 | Blue | COOL |
| 0-39 | Gray | COLD |

---

## 3. Typography

### Font Stack
| Usage | Font | Weights |
|-------|------|---------|
| Headings & UI | `'Inter', sans-serif` | 400, 500, 600, 700, 800 |
| Data, Metrics & Code | `'JetBrains Mono', monospace` | 400, 500, 700 |

### Font Loading
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

### Scale
| Element | Size | Weight | Font |
|---------|------|--------|------|
| Page Title | 24px (1.5rem) | 800 | Inter |
| Section Header | 18px (1.125rem) | 700 | Inter |
| Card Title | 16px (1rem) | 600 | Inter |
| Body Text | 14px (0.875rem) | 400 | Inter |
| Metric Value | 28px (1.75rem) | 700 | JetBrains Mono |
| Metric Label | 12px (0.75rem) | 500 | Inter |
| Table Data | 13px (0.8125rem) | 400 | JetBrains Mono |
| Button Text | 14px (0.875rem) | 600 | Inter |
| Badge Text | 11px (0.6875rem) | 600 | Inter |

---

## 4. Component Library

### 4.1 Glass Card
The foundational component for all dashboard panels.

```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
}

.glass-card:hover {
  border-color: rgba(124, 58, 237, 0.3);
  box-shadow: 0 0 20px rgba(124, 58, 237, 0.1);
}
```

### 4.2 Stat Card
For displaying key metrics.

```
+------------------------------------------+
|  [Icon]  Metric Label                    |
|          28px METRIC VALUE     [+12.5%]  |
|          Secondary info text             |
+------------------------------------------+
```

### 4.3 PIN Input Component
```
+------------------------------------------+
|          ENTER 4-DIGIT PIN               |
|                                          |
|          [ * ] [ * ] [ * ] [ * ]         |
|                                          |
|     [1] [2] [3]                          |
|     [4] [5] [6]                          |
|     [7] [8] [9]                          |
|     [CLR] [0] [<-]                       |
|                                          |
|     max 5 attempts | keyboard support    |
+------------------------------------------+
```

### 4.4 Status Badge
```css
.badge {
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}

.badge-success { background: rgba(34, 197, 94, 0.2); color: #22C55E; }
.badge-warning { background: rgba(245, 158, 11, 0.2); color: #F59E0B; }
.badge-danger  { background: rgba(239, 68, 68, 0.2); color: #EF4444; }
.badge-info    { background: rgba(59, 130, 246, 0.2); color: #3B82F6; }
```

### 4.5 Navigation Sidebar
```
+----+------------------------------------------+
| S  |  [Dashboard Icon]  Command Center       |
| I  |  [Scout Icon]      Scout Agent          |
| D  |  [Closer Icon]     Closer Agent         |
| E  |  [AI Icon]         AI Intelligence  NEW |
| B  |  [Box Icon]        Inventory            |
| A  |  [Cart Icon]       Orders               |
| R  |  [Users Icon]      Customers            |
|    |  [Chart Icon]      Reports              |
|    |  [Shield Icon]     Validation           |
|    |  [Gear Icon]       Settings             |
+----+------------------------------------------+
```

---

## 5. Page Layouts

### 5.1 Landing Page (`/`)
```
+--------------------------------------------------+
|  SOVEREIGN BUSINESS ENGINE                       |
|  Market Validated Data Orchestrator              |
|                                                  |
|  +--------+  +--------+  +--------+             |
|  | BRAND  |  | GROWTH |  | TRUST  |             |
|  | MACHINE|  | ENGINE |  | ENGINE |             |
|  | @fk    |  | @rk    |  | @hfm   |             |
|  | ACTIVE |  | ACTIVE |  | ACTIVE |             |
|  +--------+  +--------+  +--------+             |
|                                                  |
|  Engine Stack: Intelligence | Communication |    |
|                Data | Validation                 |
|                                                  |
|  [Access Command Center] -- FOUNDER ACCESS ONLY  |
+--------------------------------------------------+
```

### 5.2 Dashboard (`/app/dashboard`)
```
+--SIDEBAR--+--MAIN CONTENT---------------------------------+
|           |                                               |
| Dashboard |  COMMAND CENTER                               |
| Scout     |  +-------+ +-------+ +-------+ +-------+     |
| Closer    |  |Revenue| |Orders | |Hot    | |Custom.|     |
| AI  NEW   |  |Today  | |Today  | |Leads  | |ers    |     |
| Inventory |  +-------+ +-------+ +-------+ +-------+     |
| Orders    |                                               |
| Customers |  3-LAYER ENGINE STATUS                        |
| Reports   |  +----------+ +----------+ +----------+      |
| Validate  |  |Brand     | |Growth    | |Trust     |      |
| Settings  |  |@fk ACTIVE| |@rk ACTIVE| |@hf ACTIVE|     |
|           |  +----------+ +----------+ +----------+      |
|           |                                               |
|           |  RECENT ACTIVITY                              |
|           |  +-Orders List-+  +-Leads List-+              |
|           |  |             |  |            |              |
+--SIDEBAR--+--MAIN CONTENT---------------------------------+
```

### 5.3 Scout Agent Page (`/app/scout`)
```
+--SIDEBAR--+--MAIN CONTENT---------------------------------+
|           |  SCOUT AGENT - Lead Discovery & Scoring       |
|           |  [+ Add Lead] [AI Score All] [Gather from IG] |
|           |  Filter: [All v] [Hot] [Warm] [Cold]          |
|           |                                               |
|           |  Stats: Total:10 | Hot:6 | Warm:2 | Cold:2   |
|           |                                               |
|           |  +---LEADS TABLE--------------------------+   |
|           |  | Shop | Platform | Score | Gap | Status |   |
|           |  | Wardrobe ID | IG | 95 HOT | Low | Conv |   |
|           |  | Urban Threads | IG | 90 HOT | Med | Scrd|   |
|           |  | Toko Baju | IG | 85 HOT | High | Scrd |   |
|           |  +---LEADS TABLE--------------------------+   |
|           |                                               |
|           |  [+ ADD LEAD MODAL]                           |
|           |  Shop Name, Platform, Username, Phone,        |
|           |  Followers, Digital Gap, Notes                 |
+--SIDEBAR--+--MAIN CONTENT---------------------------------+
```

### 5.4 Closer Agent Page (`/app/closer`)
```
+--SIDEBAR--+--MAIN CONTENT---------------------------------+
|           |  CLOSER AGENT - WA Outreach                   |
|           |                                               |
|           |  COMPOSE MESSAGE                              |
|           |  Phone: [___________]                         |
|           |  Template: [Intro v] [Demo] [Trial] [Custom]  |
|           |  Message: [________________________]          |
|           |           [________________________]          |
|           |  [SEND via Fonnte]                            |
|           |                                               |
|           |  OUTREACH LOG                                 |
|           |  +---LOG TABLE----------------------------+   |
|           |  | Phone | Message | Status | Date        |   |
|           |  | 0811..| Halo.. | Sent | 2026-03-31    |   |
|           |  +---LOG TABLE----------------------------+   |
+--SIDEBAR--+--MAIN CONTENT---------------------------------+
```

### 5.5 AI Intelligence Page (`/app/ai`) -- NEW
```
+--SIDEBAR--+--MAIN CONTENT---------------------------------+
|           |  AI INTELLIGENCE CENTER                       |
|           |                                               |
|           |  ENGINE STATUS                                |
|           |  LangGraph.js: ONLINE | CrewAI: STANDBY      |
|           |                                               |
|           |  RECENT AI INSIGHTS                           |
|           |  +---INSIGHT CARDS-----------------------+    |
|           |  | [Demand] Revenue trend up 15%         |    |
|           |  | [System] 3 hot leads need follow-up   |    |
|           |  | [Trust] Engagement rate increasing    |    |
|           |  +---INSIGHT CARDS-----------------------+    |
|           |                                               |
|           |  AI TASK QUEUE                                |
|           |  +---TASK TABLE--------------------------+    |
|           |  | Task | Agent | Status | Created       |    |
|           |  | Score leads | LangGraph | Done        |    |
|           |  | Market report | CrewAI | Running      |    |
|           |  +---TASK TABLE--------------------------+    |
|           |                                               |
|           |  [Generate Insights] [Run Analysis Crew]      |
+--SIDEBAR--+--MAIN CONTENT---------------------------------+
```

---

## 6. Data Flow Diagrams

### 6.1 Lead Discovery Flow (Scout Agent)
```
[IG Search Query] --> [ScraperAPI] --> [Raw Profile Data]
       |                                      |
       |                               [AI Enrichment]
       |                               (LangGraph.js)
       |                                      |
       |                               [Score Computation]
       |                                      |
       +---[Store in Supabase: leads table]---+
                      |
              [Dashboard Update]
              [Hot Lead Alert]
```

### 6.2 Outreach Flow (Closer Agent)
```
[Lead Selected (score >= 70)] --> [AI Compose Message]
                                  (LangGraph.js)
                                        |
                                  [Personalized WA Message]
                                        |
                                  [Fonnte API: POST /send]
                                        |
                                  [Log in outreach_logs]
                                        |
                           +------------+------------+
                           |                         |
                     [Day 3 Auto]              [Day 7 Auto]
                     (Cron trigger)            (Cron trigger)
                           |                         |
                     [Fonnte send]             [Fonnte send]
                           |                         |
                     [Log + Update status]     [Log + Update status]
```

### 6.3 AI Analysis Flow (CrewAI)
```
[Hono Route: POST /api/ai/crew/kickoff]
         |
   [Prepare Input Data from Supabase]
         |
   [HTTP POST to CrewAI Service]
   (External FastAPI endpoint)
         |
   [CrewAI Processes (async)]
   - MarketAnalyst agent
   - DataScientist agent
   - StrategyAdvisor agent
         |
   [Hono polls for result]
   (GET /api/ai/crew/status/:id)
         |
   [Store result in ai_insights table]
         |
   [Display in AI Intelligence page]
```

---

## 7. Responsive Design

### Breakpoints
| Device | Width | Layout |
|--------|-------|--------|
| Mobile | < 768px | Sidebar hidden, hamburger menu |
| Tablet | 768px - 1024px | Collapsed sidebar (icons only) |
| Desktop | > 1024px | Full sidebar + content |

### Mobile Priority
The primary user (Founder) accesses from mobile frequently. Priority:
1. Dashboard stats must be visible without scrolling
2. Scout agent lead list must be swipeable
3. Closer agent quick-send must be one-tap accessible
4. All glass cards stack vertically on mobile

---

## 8. Animation & Interaction

### Transitions
| Element | Animation | Duration |
|---------|-----------|----------|
| Page transition | Fade in | 200ms |
| Card hover | Border glow + scale(1.01) | 200ms |
| Stat counter | Count up animation | 500ms |
| PIN dot fill | Scale pulse | 150ms |
| Toast notification | Slide in from right | 300ms |
| Modal | Fade + scale from center | 200ms |
| Sidebar nav active | Left border highlight | 150ms |

### Micro-interactions
- **PIN incorrect**: Shake animation (CSS keyframe)
- **Score badge**: Pulse on hot leads
- **Send message**: Button -> Loading spinner -> Check mark
- **AI generating**: Typing dots animation

---

## Document Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-28 | Original design (Terminal-Chic Glassmorphism) |
| 2.0 | 2026-03-31 | Added validation page design, purple accent |
| 3.0 | 2026-03-31 | Added AI Intelligence page, responsive specs, animation guide, complete component library, data flow diagrams |
