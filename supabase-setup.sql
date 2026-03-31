-- =====================================================
-- SOVEREIGN BUSINESS ENGINE v2.0 - Supabase Schema
-- Market Validated Data Orchestrator
-- Run this in Supabase SQL Editor
-- =====================================================

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  sku TEXT UNIQUE,
  category TEXT DEFAULT 'fashion',
  price NUMERIC DEFAULT 0,
  cost_price NUMERIC DEFAULT 0,
  stock INTEGER DEFAULT 0,
  min_stock INTEGER DEFAULT 5,
  description TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT DEFAULT '',
  city TEXT DEFAULT '',
  tier TEXT DEFAULT 'bronze' CHECK (tier IN ('bronze', 'silver', 'gold', 'vip')),
  total_orders INTEGER DEFAULT 0,
  total_spent NUMERIC DEFAULT 0,
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT DEFAULT '',
  items JSONB DEFAULT '[]',
  total_amount NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  notes TEXT DEFAULT '',
  source TEXT DEFAULT 'manual',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads table (Scout Agent)
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shop_name TEXT NOT NULL,
  platform TEXT DEFAULT 'instagram',
  username TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  followers INTEGER DEFAULT 0,
  score INTEGER DEFAULT 50,
  digital_gap TEXT DEFAULT 'medium' CHECK (digital_gap IN ('high', 'medium', 'low')),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'scored', 'contacted', 'converted', 'lost')),
  notes TEXT DEFAULT '',
  source TEXT DEFAULT 'manual',
  last_contact TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Outreach Campaigns table (Closer Agent)
CREATE TABLE IF NOT EXISTS outreach_campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  template TEXT DEFAULT 'default',
  target_score INTEGER DEFAULT 70,
  status TEXT DEFAULT 'draft',
  total_sent INTEGER DEFAULT 0,
  total_replied INTEGER DEFAULT 0,
  message_day0 TEXT DEFAULT '',
  message_day3 TEXT DEFAULT '',
  message_day7 TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Outreach Logs table (Closer Agent)
CREATE TABLE IF NOT EXISTS outreach_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'sent',
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  replied_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_leads_score ON leads(score DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_outreach_logs_sent ON outreach_logs(sent_at DESC);

-- RLS Policies (using service_role key bypasses RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE outreach_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE outreach_logs ENABLE ROW LEVEL SECURITY;

-- Allow service_role full access
CREATE POLICY "Service role full access" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON customers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON leads FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON outreach_campaigns FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON outreach_logs FOR ALL USING (true) WITH CHECK (true);

-- =====================================================
-- MARKET VALIDATION INTELLIGENCE (v2.0)
-- =====================================================

-- Validation Events - Log every market validation observation
CREATE TABLE IF NOT EXISTS validation_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  layer TEXT NOT NULL DEFAULT 'demand' CHECK (layer IN ('demand', 'system', 'trust')),
  event_type TEXT DEFAULT 'observation' CHECK (event_type IN ('observation', 'milestone', 'feedback', 'conversion', 'insight', 'proof')),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  data_value NUMERIC,
  source TEXT DEFAULT 'manual',
  impact TEXT DEFAULT 'medium' CHECK (impact IN ('low', 'medium', 'high', 'critical')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Validation Metrics - Track quantitative market data
CREATE TABLE IF NOT EXISTS validation_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  layer TEXT NOT NULL DEFAULT 'demand' CHECK (layer IN ('demand', 'system', 'trust')),
  metric_name TEXT NOT NULL,
  metric_value NUMERIC DEFAULT 0,
  unit TEXT DEFAULT 'count',
  notes TEXT DEFAULT '',
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for validation tables
CREATE INDEX IF NOT EXISTS idx_val_events_layer ON validation_events(layer);
CREATE INDEX IF NOT EXISTS idx_val_events_type ON validation_events(event_type);
CREATE INDEX IF NOT EXISTS idx_val_events_created ON validation_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_val_events_impact ON validation_events(impact);
CREATE INDEX IF NOT EXISTS idx_val_metrics_layer ON validation_metrics(layer);
CREATE INDEX IF NOT EXISTS idx_val_metrics_name ON validation_metrics(metric_name);
CREATE INDEX IF NOT EXISTS idx_val_metrics_recorded ON validation_metrics(recorded_at DESC);

-- RLS for validation tables
ALTER TABLE validation_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE validation_metrics ENABLE ROW LEVEL SECURITY;

-- Service role access for validation tables
CREATE POLICY "Service role full access" ON validation_events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON validation_metrics FOR ALL USING (true) WITH CHECK (true);
