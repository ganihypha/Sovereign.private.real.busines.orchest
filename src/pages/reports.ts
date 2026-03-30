import { sovereignLayout } from './layout'
export function reportsPage(): string {
  const content = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="glass-card p-5">
        <h3 class="text-xs text-gray-500 mb-2">REVENUE REPORT</h3>
        <div id="revTotal" class="stat-value text-3xl">-</div>
        <div class="flex items-center gap-4 mt-3 text-xs text-gray-400">
          <span><i class="fas fa-receipt mr-1"></i><span id="revOrders">0</span> orders</span>
          <span><i class="fas fa-chart-line mr-1"></i>Avg <span id="revAvg">Rp 0</span></span>
        </div>
      </div>
      <div class="glass-card p-5">
        <h3 class="text-xs text-gray-500 mb-2">LEAD CONVERSION</h3>
        <div id="convRate" class="stat-value text-3xl">0%</div>
        <div class="flex items-center gap-4 mt-3 text-xs text-gray-400">
          <span><i class="fas fa-crosshairs mr-1"></i><span id="convTotal">0</span> leads</span>
          <span><i class="fas fa-check mr-1"></i><span id="convConverted">0</span> converted</span>
        </div>
      </div>
      <div class="glass-card p-5">
        <h3 class="text-xs text-gray-500 mb-2">INVENTORY HEALTH</h3>
        <div id="invTotal" class="stat-value text-3xl">0</div>
        <div class="flex items-center gap-4 mt-3 text-xs text-gray-400">
          <span class="text-yellow-400"><i class="fas fa-exclamation-triangle mr-1"></i><span id="invLow">0</span> low stock</span>
          <span class="text-red-400"><i class="fas fa-times-circle mr-1"></i><span id="invOut">0</span> out</span>
        </div>
      </div>
    </div>
    <div class="glass-card p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-sm"><i class="fas fa-chart-bar mr-2 text-purple-400"></i>Revenue Timeline</h3>
        <select id="revPeriod" onchange="loadRevenue()" class="glass-input text-sm w-32">
          <option value="7">7 Days</option><option value="30" selected>30 Days</option><option value="90">90 Days</option>
        </select>
      </div>
      <div id="revTimeline" class="space-y-2">Loading...</div>
    </div>
    <script>
      async function loadRevenue(){const p=document.getElementById('revPeriod').value;const r=await apiFetch('/api/reports/revenue?period='+p);if(r?.success){const d=r.data;document.getElementById('revTotal').textContent=formatRp(d.totalRevenue);document.getElementById('revOrders').textContent=d.totalOrders;document.getElementById('revAvg').textContent=formatRp(Math.round(d.avgOrderValue));const grouped={};(d.orders||[]).forEach(o=>{const day=o.created_at?.split('T')[0]||'unknown';grouped[day]=(grouped[day]||0)+(o.total_amount||0);});document.getElementById('revTimeline').innerHTML=Object.keys(grouped).length===0?'<div class="text-gray-600 text-sm text-center py-4">No data</div>':Object.entries(grouped).map(([day,amt])=>'<div class="flex items-center gap-3"><span class="text-xs text-gray-500 w-24 mono">'+day+'</span><div class="flex-1 h-6 bg-white/5 rounded-full overflow-hidden"><div class="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full" style="width:'+Math.min(100,amt/Math.max(...Object.values(grouped))*100)+'%"></div></div><span class="text-xs font-medium text-white w-28 text-right">'+formatRp(amt)+'</span></div>').join('');}}
      async function loadLeadConv(){const r=await apiFetch('/api/reports/leads');if(r?.success){const d=r.data;document.getElementById('convRate').textContent=d.conversionRate;document.getElementById('convTotal').textContent=d.totalLeads;document.getElementById('convConverted').textContent=d.converted;}}
      async function loadInvHealth(){const r=await apiFetch('/api/reports/products');if(r?.success){const d=r.data;document.getElementById('invTotal').textContent=d.totalProducts;document.getElementById('invLow').textContent=d.lowStock;document.getElementById('invOut').textContent=d.outOfStock;}}
      loadRevenue();loadLeadConv();loadInvHealth();
    </script>
  `
  return sovereignLayout('Reports', content, 'reports')
}
