// ============================================================
// Sovereign Private Business Orchestrator v1.0
// Engine: Sovereign | Private Command Center
// 3-Layer Business Orchestration for FashionKas
// ============================================================
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { authRoutes } from './routes/auth'
import { dashboardRoutes } from './routes/dashboard'
import { productsRoutes } from './routes/products'
import { ordersRoutes } from './routes/orders'
import { customersRoutes } from './routes/customers'
import { scoutRoutes } from './routes/scout'
import { closerRoutes } from './routes/closer'
import { catalogRoutes } from './routes/catalog'
import { reportsRoutes } from './routes/reports'
import { landingPage } from './pages/landing'
import { loginPage } from './pages/login'
import { dashboardPage } from './pages/dashboard'
import { productsPage } from './pages/products'
import { ordersPage } from './pages/orders'
import { customersPage } from './pages/customers'
import { scoutPage } from './pages/scout'
import { closerPage } from './pages/closer'
import { reportsPage } from './pages/reports'
import { catalogPublicPage } from './pages/catalog'
import { settingsPage } from './pages/settings'

export interface Env {
  SUPABASE_URL: string
  SUPABASE_ANON_KEY: string
  SUPABASE_SERVICE_KEY: string
  MASTER_PIN: string
  JWT_SECRET: string
  SCRAPER_API_KEY: string
  FONNTE_TOKEN?: string
}

const app = new Hono<{ Bindings: Env }>()

// CORS
app.use('/api/*', cors())

// Health check
app.get('/api/health', (c) => {
  return c.json({
    status: 'ok',
    app: 'Sovereign Private Orchestrator',
    engine: 'FashionKas',
    version: '1.0',
    build: '2026-03-30',
    layers: ['Brand (@fashionkas.official)', 'Growth (@resellerkas.official)', 'Founder (@haidar_faras_m)']
  })
})

// API Routes
app.route('/api/auth', authRoutes)
app.route('/api/dashboard', dashboardRoutes)
app.route('/api/products', productsRoutes)
app.route('/api/orders', ordersRoutes)
app.route('/api/customers', customersRoutes)
app.route('/api/scout', scoutRoutes)
app.route('/api/closer', closerRoutes)
app.route('/api/catalog', catalogRoutes)
app.route('/api/reports', reportsRoutes)

// Page Routes
app.get('/', (c) => c.html(landingPage()))
app.get('/login', (c) => c.html(loginPage()))
app.get('/app', (c) => c.html(dashboardPage()))
app.get('/app/dashboard', (c) => c.html(dashboardPage()))
app.get('/app/products', (c) => c.html(productsPage()))
app.get('/app/orders', (c) => c.html(ordersPage()))
app.get('/app/customers', (c) => c.html(customersPage()))
app.get('/app/scout', (c) => c.html(scoutPage()))
app.get('/app/closer', (c) => c.html(closerPage()))
app.get('/app/reports', (c) => c.html(reportsPage()))
app.get('/app/settings', (c) => c.html(settingsPage()))
app.get('/catalog/:slug', (c) => c.html(catalogPublicPage(c.req.param('slug'))))

// Catch-all for app routes
app.get('/app/*', (c) => c.html(dashboardPage()))

export default app
