// Dashboard Page - Sovereign Command Center
import { sovereignLayout } from './layout'

export function dashboardPage(): string {
  const content = `
    <!-- 3-Layer Status -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="glass-card p-5 glow-purple">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <i class="fas fa-store text-purple-400"></i>
            <span class="text-xs text-gray-400 mono">BRAND MACHINE</span>
          </div>
          <div class="pulse-dot"></div>
        </div>
        <div class="font-bold text-white">@fashionkas.official</div>
        <div class="text-xs text-purple-300 mt-1">Revenue Engine | Active</div>
      </div>
      <div class="glass-card p-5">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <i class="fas fa-rocket text-green-400"></i>
            <span class="text-xs text-gray-400 mono">GROWTH ENGINE</span>
          </div>
          <div class="pulse-dot"></div>
        </div>
        <div class="font-bold text-white">@resellerkas.official</div>
        <div class="text-xs text-green-300 mt-1">Community & UGC | Active</div>
      </div>
      <div class="glass-card p-5">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <i class="fas fa-user-tie text-yellow-400"></i>
            <span class="text-xs text-gray-400 mono">TRUST ENGINE</span>
          </div>
          <div class="pulse-dot"></div>
        </div>
        <div class="font-bold text-white">@haidar_faras_m</div>
        <div class="text-xs text-yellow-300 mt-1">Founder Authority | Active</div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="glass-card p-5">
        <div class="text-xs text-gray-500 mb-1">Total Revenue</div>
        <div id="statRevenue" class="stat-value text-2xl">-</div>
      </div>
      <div class="glass-card p-5">
        <div class="text-xs text-gray-500 mb-1">Orders Today</div>
        <div id="statTodayOrders" class="stat-value text-2xl">-</div>
      </div>
      <div class="glass-card p-5">
        <div class="text-xs text-gray-500 mb-1">Hot Leads</div>
        <div id="statHotLeads" class="stat-value text-2xl">-</div>
      </div>
      <div class="glass-card p-5">
        <div class="text-xs text-gray-500 mb-1">Customers</div>
        <div id="statCustomers" class="stat-value text-2xl">-</div>
      </div>
    </div>

    <!-- Quick Stats Row -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="glass-card p-4 flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center">
          <i class="fas fa-boxes-stacked text-purple-400"></i>
        </div>
        <div>
          <div id="statProducts" class="font-bold text-white">-</div>
          <div class="text-xs text-gray-500">Products</div>
        </div>
      </div>
      <div class="glass-card p-4 flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
          <i class="fas fa-receipt text-blue-400"></i>
        </div>
        <div>
          <div id="statOrders" class="font-bold text-white">-</div>
          <div class="text-xs text-gray-500">Total Orders</div>
        </div>
      </div>
      <div class="glass-card p-4 flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-yellow-500/15 flex items-center justify-center">
          <i class="fas fa-clock text-yellow-400"></i>
        </div>
        <div>
          <div id="statPending" class="font-bold text-white">-</div>
          <div class="text-xs text-gray-500">Pending</div>
        </div>
      </div>
      <div class="glass-card p-4 flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center">
          <i class="fas fa-crosshairs text-green-400"></i>
        </div>
        <div>
          <div id="statLeads" class="font-bold text-white">-</div>
          <div class="text-xs text-gray-500">Total Leads</div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="glass-card p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-sm"><i class="fas fa-receipt mr-2 text-purple-400"></i>Recent Orders</h3>
          <a href="/app/orders" class="text-xs text-purple-400 hover:text-purple-300">View All</a>
        </div>
        <div id="recentOrders" class="space-y-3">
          <div class="text-gray-600 text-sm text-center py-4">Loading...</div>
        </div>
      </div>
      <div class="glass-card p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-sm"><i class="fas fa-crosshairs mr-2 text-green-400"></i>Recent Leads</h3>
          <a href="/app/scout" class="text-xs text-green-400 hover:text-green-300">View All</a>
        </div>
        <div id="recentLeads" class="space-y-3">
          <div class="text-gray-600 text-sm text-center py-4">Loading...</div>
        </div>
      </div>
    </div>

    <script>
      async function loadDashboard() {
        const [stats, activity] = await Promise.all([
          apiFetch('/api/dashboard/stats'),
          apiFetch('/api/dashboard/activity')
        ]);

        if (stats?.success) {
          const d = stats.data;
          document.getElementById('statRevenue').textContent = formatRp(d.totalRevenue);
          document.getElementById('statTodayOrders').textContent = d.todayOrders;
          document.getElementById('statHotLeads').textContent = d.hotLeads;
          document.getElementById('statCustomers').textContent = d.totalCustomers;
          document.getElementById('statProducts').textContent = d.totalProducts;
          document.getElementById('statOrders').textContent = d.totalOrders;
          document.getElementById('statPending').textContent = d.pendingOrders;
          document.getElementById('statLeads').textContent = d.totalLeads;
        }

        if (activity?.success) {
          const ordersEl = document.getElementById('recentOrders');
          const leadsEl = document.getElementById('recentLeads');
          
          ordersEl.innerHTML = (activity.data.recentOrders || []).length === 0 
            ? '<div class="text-gray-600 text-sm text-center py-4">No orders yet</div>'
            : (activity.data.recentOrders || []).map(o => \`
              <div class="flex items-center justify-between py-2 border-b border-white/5">
                <div>
                  <div class="text-sm text-white">\${o.customer_name || 'Unknown'}</div>
                  <div class="text-xs text-gray-500">\${formatDate(o.created_at)}</div>
                </div>
                <div class="text-right">
                  <div class="text-sm font-bold text-white">\${formatRp(o.total_amount)}</div>
                  <span class="badge \${o.status === 'completed' ? 'badge-green' : o.status === 'pending' ? 'badge-yellow' : 'badge-blue'}">\${o.status}</span>
                </div>
              </div>
            \`).join('');

          leadsEl.innerHTML = (activity.data.recentLeads || []).length === 0
            ? '<div class="text-gray-600 text-sm text-center py-4">No leads yet</div>'
            : (activity.data.recentLeads || []).map(l => \`
              <div class="flex items-center justify-between py-2 border-b border-white/5">
                <div>
                  <div class="text-sm text-white">\${l.shop_name || 'Unknown'}</div>
                  <div class="text-xs text-gray-500">\${l.platform} | \${l.username || '-'}</div>
                </div>
                <div class="text-right">
                  <div class="text-sm font-bold \${l.score >= 70 ? 'text-green-400' : l.score >= 40 ? 'text-yellow-400' : 'text-gray-400'}">\${l.score}/100</div>
                  <span class="badge badge-purple">\${l.status}</span>
                </div>
              </div>
            \`).join('');
        }
      }
      loadDashboard();
    </script>
  `
  return sovereignLayout('Command Center', content, 'dashboard')
}
