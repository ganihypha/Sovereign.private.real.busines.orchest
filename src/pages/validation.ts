// Market Validation Intelligence Page
// Sovereign Business Engine v2.0 - The Real Market Validated Data Tool
import { sovereignLayout } from './layout'

export function validationPage(): string {
  const content = `
    <!-- Engine Identity Banner -->
    <div class="glass-card p-5 mb-6 border-l-4 border-purple-500 glow-purple">
      <div class="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div class="mono text-[10px] text-purple-400 tracking-widest mb-1">SOVEREIGN BUSINESS ENGINE v2.0</div>
          <h2 class="text-lg font-bold text-white">Market Validated Data Orchestrator</h2>
          <p class="text-xs text-gray-500 mt-1">3-Layer Validation: Demand | System | Trust &mdash; Real Business Proof</p>
        </div>
        <div class="flex items-center gap-3">
          <div id="engineStatus" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <div class="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
            <span class="mono text-xs text-yellow-300">COLLECTING</span>
          </div>
          <div class="text-right">
            <div id="validScore" class="text-2xl font-black text-purple-400">0%</div>
            <div class="text-[10px] text-gray-500 mono">VALIDATION</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3-Layer Validation Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <!-- DEMAND VALIDATION -->
      <div class="glass-card p-5 border-t-2 border-purple-500">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center">
            <i class="fas fa-store text-purple-400 text-sm"></i>
          </div>
          <div>
            <div class="text-xs font-bold text-purple-300">DEMAND VALIDATION</div>
            <div class="text-[10px] text-gray-500 mono">@fashionkas.official</div>
          </div>
        </div>
        <div class="space-y-2">
          <div class="flex justify-between"><span class="text-xs text-gray-400">Active Products</span><span id="dProducts" class="text-sm font-bold text-white">0</span></div>
          <div class="flex justify-between"><span class="text-xs text-gray-400">Total Orders</span><span id="dOrders" class="text-sm font-bold text-white">0</span></div>
          <div class="flex justify-between"><span class="text-xs text-gray-400">Completed</span><span id="dCompleted" class="text-sm font-bold text-green-400">0</span></div>
          <div class="flex justify-between"><span class="text-xs text-gray-400">Customers</span><span id="dCustomers" class="text-sm font-bold text-white">0</span></div>
          <div class="flex justify-between"><span class="text-xs text-gray-400">Revenue</span><span id="dRevenue" class="text-sm font-bold text-purple-300">Rp 0</span></div>
          <div class="flex justify-between"><span class="text-xs text-gray-400">Avg Order Value</span><span id="dAOV" class="text-sm font-bold text-white">Rp 0</span></div>
        </div>
        <div id="dProof" class="mt-3 p-2 rounded-lg bg-purple-500/10 text-[10px] text-purple-300 mono">Loading proof...</div>
      </div>

      <!-- SYSTEM VALIDATION -->
      <div class="glass-card p-5 border-t-2 border-green-500">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-8 h-8 rounded-lg bg-green-500/15 flex items-center justify-center">
            <i class="fas fa-rocket text-green-400 text-sm"></i>
          </div>
          <div>
            <div class="text-xs font-bold text-green-300">SYSTEM VALIDATION</div>
            <div class="text-[10px] text-gray-500 mono">@resellerkas.official</div>
          </div>
        </div>
        <div class="space-y-2">
          <div class="flex justify-between"><span class="text-xs text-gray-400">Total Leads</span><span id="sLeads" class="text-sm font-bold text-white">0</span></div>
          <div class="flex justify-between"><span class="text-xs text-gray-400">Contacted</span><span id="sContacted" class="text-sm font-bold text-blue-400">0</span></div>
          <div class="flex justify-between"><span class="text-xs text-gray-400">Converted</span><span id="sConverted" class="text-sm font-bold text-green-400">0</span></div>
          <div class="flex justify-between"><span class="text-xs text-gray-400">Contact Rate</span><span id="sContactRate" class="text-sm font-bold text-white">0%</span></div>
          <div class="flex justify-between"><span class="text-xs text-gray-400">Conversion Rate</span><span id="sConvRate" class="text-sm font-bold text-green-300">0%</span></div>
          <div class="flex justify-between"><span class="text-xs text-gray-400">Outreach Sent</span><span id="sOutreach" class="text-sm font-bold text-white">0</span></div>
        </div>
        <div id="sProof" class="mt-3 p-2 rounded-lg bg-green-500/10 text-[10px] text-green-300 mono">Loading proof...</div>
      </div>

      <!-- TRUST VALIDATION -->
      <div class="glass-card p-5 border-t-2 border-yellow-500">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-8 h-8 rounded-lg bg-yellow-500/15 flex items-center justify-center">
            <i class="fas fa-user-tie text-yellow-400 text-sm"></i>
          </div>
          <div>
            <div class="text-xs font-bold text-yellow-300">TRUST VALIDATION</div>
            <div class="text-[10px] text-gray-500 mono">@haidar_faras_m</div>
          </div>
        </div>
        <div class="space-y-2">
          <div class="flex justify-between"><span class="text-xs text-gray-400">Hot Leads (70+)</span><span id="tHot" class="text-sm font-bold text-yellow-400">0</span></div>
          <div class="flex justify-between"><span class="text-xs text-gray-400">Trust Score</span><span id="tScore" class="text-sm font-bold text-yellow-300">0%</span></div>
          <div class="flex justify-between"><span class="text-xs text-gray-400">Total Leads</span><span id="tTotal" class="text-sm font-bold text-white">0</span></div>
          <div class="flex justify-between"><span class="text-xs text-gray-400">Authority Type</span><span class="text-sm font-bold text-yellow-200">Founder-Driven</span></div>
        </div>
        <div id="tProof" class="mt-3 p-2 rounded-lg bg-yellow-500/10 text-[10px] text-yellow-300 mono">Loading proof...</div>
      </div>
    </div>

    <!-- Engine Data Points + Validation Score -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="glass-card p-4 text-center">
        <div id="totalDataPoints" class="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">0</div>
        <div class="text-[10px] text-gray-500 mono mt-1">TOTAL DATA POINTS</div>
      </div>
      <div class="glass-card p-4 text-center">
        <div id="validScoreBig" class="text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">0%</div>
        <div class="text-[10px] text-gray-500 mono mt-1">VALIDATION SCORE</div>
      </div>
      <div class="glass-card p-4 text-center">
        <div class="text-3xl font-black text-blue-400">3</div>
        <div class="text-[10px] text-gray-500 mono mt-1">ACTIVE LAYERS</div>
      </div>
      <div class="glass-card p-4 text-center">
        <div id="proofStatus" class="text-xs font-bold text-yellow-300 py-2">COLLECTING</div>
        <div class="text-[10px] text-gray-500 mono mt-1">PROOF STATUS</div>
      </div>
    </div>

    <!-- Log Validation Event + Recent Events -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <!-- Log Event -->
      <div class="glass-card p-5">
        <h3 class="font-bold text-sm mb-4"><i class="fas fa-plus-circle mr-2 text-purple-400"></i>Log Validation Event</h3>
        <div class="space-y-3">
          <select id="evLayer" class="glass-input w-full text-sm">
            <option value="demand">Demand (FashionKas)</option>
            <option value="system">System (ResellerKas)</option>
            <option value="trust">Trust (Founder)</option>
          </select>
          <select id="evType" class="glass-input w-full text-sm">
            <option value="observation">Observation</option>
            <option value="milestone">Milestone</option>
            <option value="feedback">User Feedback</option>
            <option value="conversion">Conversion</option>
            <option value="insight">Market Insight</option>
            <option value="proof">Proof Point</option>
          </select>
          <input id="evTitle" class="glass-input w-full text-sm" placeholder="Event title *">
          <textarea id="evDesc" class="glass-input w-full text-sm" rows="2" placeholder="Description / data"></textarea>
          <select id="evImpact" class="glass-input w-full text-sm">
            <option value="low">Low Impact</option>
            <option value="medium" selected>Medium Impact</option>
            <option value="high">High Impact</option>
            <option value="critical">Critical Impact</option>
          </select>
          <button onclick="logEvent()" class="glass-btn w-full text-sm"><i class="fas fa-save mr-2"></i>Log Event</button>
        </div>
      </div>

      <!-- Recent Events -->
      <div class="glass-card p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-sm"><i class="fas fa-timeline mr-2 text-green-400"></i>Validation Timeline</h3>
          <select id="filterLayer" onchange="loadEvents()" class="glass-input text-xs py-1 px-2 w-28">
            <option value="">All Layers</option>
            <option value="demand">Demand</option>
            <option value="system">System</option>
            <option value="trust">Trust</option>
          </select>
        </div>
        <div id="eventList" class="space-y-2 max-h-80 overflow-y-auto">Loading...</div>
      </div>
    </div>

    <!-- Record Metric -->
    <div class="glass-card p-5 mb-6">
      <h3 class="font-bold text-sm mb-4"><i class="fas fa-chart-line mr-2 text-yellow-400"></i>Record Validation Metric</h3>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
        <select id="mLayer" class="glass-input text-sm">
          <option value="demand">Demand</option>
          <option value="system">System</option>
          <option value="trust">Trust</option>
        </select>
        <input id="mName" class="glass-input text-sm" placeholder="Metric name *">
        <input id="mValue" class="glass-input text-sm" type="number" placeholder="Value *">
        <input id="mUnit" class="glass-input text-sm" placeholder="Unit (count, %, Rp)">
        <button onclick="recordMetric()" class="glass-btn text-sm"><i class="fas fa-plus mr-1"></i>Record</button>
      </div>
    </div>

    <!-- Full Validation Report -->
    <div class="glass-card p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-sm"><i class="fas fa-file-lines mr-2 text-purple-400"></i>Full Validation Report</h3>
        <button onclick="generateReport()" class="glass-btn-outline text-xs"><i class="fas fa-sync mr-1"></i>Generate</button>
      </div>
      <div id="reportContent" class="text-sm text-gray-400">Click "Generate" to create comprehensive validation report...</div>
    </div>

    <script>
      const layerColors = { demand: 'purple', system: 'green', trust: 'yellow' };
      const layerIcons = { demand: 'fa-store', system: 'fa-rocket', trust: 'fa-user-tie' };
      const impactBadges = { low: 'badge-blue', medium: 'badge-yellow', high: 'badge-purple', critical: 'badge-red' };

      async function loadValidation() {
        const r = await apiFetch('/api/validation/stats');
        if (!r?.success) return;
        const d = r.data;

        // Demand
        document.getElementById('dProducts').textContent = d.demand.metrics.activeProducts;
        document.getElementById('dOrders').textContent = d.demand.metrics.totalOrders;
        document.getElementById('dCompleted').textContent = d.demand.metrics.completedOrders;
        document.getElementById('dCustomers').textContent = d.demand.metrics.totalCustomers;
        document.getElementById('dRevenue').textContent = formatRp(d.demand.metrics.totalRevenue);
        document.getElementById('dAOV').textContent = formatRp(d.demand.metrics.avgOrderValue);
        document.getElementById('dProof').textContent = d.demand.proof;

        // System
        document.getElementById('sLeads').textContent = d.system.metrics.totalLeads;
        document.getElementById('sContacted').textContent = d.system.metrics.contactedLeads;
        document.getElementById('sConverted').textContent = d.system.metrics.convertedLeads;
        document.getElementById('sContactRate').textContent = d.system.metrics.contactRate;
        document.getElementById('sConvRate').textContent = d.system.metrics.conversionRate;
        document.getElementById('sOutreach').textContent = d.system.metrics.outreachSent;
        document.getElementById('sProof').textContent = d.system.proof;

        // Trust
        document.getElementById('tHot').textContent = d.trust.metrics.hotLeads;
        document.getElementById('tScore').textContent = d.trust.metrics.trustScore + '%';
        document.getElementById('tTotal').textContent = d.trust.metrics.totalLeads;
        document.getElementById('tProof').textContent = d.trust.proof;

        // Engine
        document.getElementById('validScore').textContent = d.engineHealth.validationScore + '%';
        document.getElementById('validScoreBig').textContent = d.engineHealth.validationScore + '%';
        document.getElementById('totalDataPoints').textContent = d.engineHealth.dataPoints;
        document.getElementById('proofStatus').textContent = d.engineHealth.status;

        const statusEl = document.getElementById('engineStatus');
        if (d.engineHealth.status === 'VALIDATED') {
          statusEl.className = 'flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20';
          statusEl.innerHTML = '<div class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div><span class="mono text-xs text-green-300">VALIDATED</span>';
        }
      }

      async function loadEvents() {
        const layer = document.getElementById('filterLayer').value;
        let u = '/api/validation/events';
        if (layer) u += '?layer=' + layer;
        const r = await apiFetch(u);
        if (!r?.success) return;
        const E = r.data || [];
        document.getElementById('eventList').innerHTML = E.length === 0
          ? '<div class="text-gray-600 text-sm text-center py-4">No events logged yet</div>'
          : E.map(e => '<div class="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">' +
              '<div class="w-8 h-8 rounded-lg bg-' + (layerColors[e.layer] || 'purple') + '-500/15 flex items-center justify-center flex-shrink-0 mt-0.5"><i class="fas ' + (layerIcons[e.layer] || 'fa-circle') + ' text-' + (layerColors[e.layer] || 'purple') + '-400 text-xs"></i></div>' +
              '<div class="flex-1 min-w-0"><div class="flex items-center gap-2 flex-wrap"><span class="text-sm font-medium text-white">' + e.title + '</span><span class="badge ' + (impactBadges[e.impact] || 'badge-yellow') + '">' + e.impact + '</span><span class="badge badge-purple">' + e.event_type + '</span></div>' +
              (e.description ? '<div class="text-xs text-gray-400 mt-1">' + e.description + '</div>' : '') +
              '<div class="text-[10px] text-gray-600 mono mt-1">' + e.layer.toUpperCase() + ' | ' + formatDate(e.created_at) + '</div></div>' +
              '<button onclick="deleteEvent(\\'' + e.id + '\\')" class="text-red-400/50 hover:text-red-400 text-xs flex-shrink-0"><i class="fas fa-times"></i></button></div>').join('');
      }

      async function logEvent() {
        const d = {
          layer: document.getElementById('evLayer').value,
          event_type: document.getElementById('evType').value,
          title: document.getElementById('evTitle').value,
          description: document.getElementById('evDesc').value,
          impact: document.getElementById('evImpact').value,
          source: 'founder'
        };
        if (!d.title) { showToast('Title required', 'error'); return; }
        const r = await apiFetch('/api/validation/events', { method: 'POST', body: JSON.stringify(d) });
        if (r?.success) {
          showToast('Event logged!');
          document.getElementById('evTitle').value = '';
          document.getElementById('evDesc').value = '';
          loadEvents();
          loadValidation();
        } else showToast(r?.message || 'Error', 'error');
      }

      async function deleteEvent(id) {
        if (!confirm('Delete event?')) return;
        await apiFetch('/api/validation/events/' + id, { method: 'DELETE' });
        loadEvents();
      }

      async function recordMetric() {
        const d = {
          layer: document.getElementById('mLayer').value,
          metric_name: document.getElementById('mName').value,
          metric_value: parseFloat(document.getElementById('mValue').value) || 0,
          unit: document.getElementById('mUnit').value || 'count'
        };
        if (!d.metric_name) { showToast('Metric name required', 'error'); return; }
        const r = await apiFetch('/api/validation/metrics', { method: 'POST', body: JSON.stringify(d) });
        if (r?.success) {
          showToast('Metric recorded!');
          document.getElementById('mName').value = '';
          document.getElementById('mValue').value = '';
        } else showToast(r?.message || 'Error', 'error');
      }

      async function generateReport() {
        document.getElementById('reportContent').innerHTML = '<div class="text-center py-4"><i class="fas fa-spinner fa-spin mr-2"></i>Generating report...</div>';
        const r = await apiFetch('/api/validation/report');
        if (!r?.success) { document.getElementById('reportContent').textContent = 'Error generating report'; return; }
        const d = r.data;
        document.getElementById('reportContent').innerHTML =
          '<div class="space-y-4">' +
          '<div class="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10">' +
            '<div class="flex items-center justify-between mb-2"><span class="mono text-[10px] text-purple-400">' + d.engineIdentity + '</span><span class="mono text-[10px] text-gray-500">' + new Date(d.generatedAt).toLocaleString('id-ID') + '</span></div>' +
            '<div class="grid grid-cols-3 gap-4 text-center">' +
              '<div><div class="text-2xl font-black text-purple-400">' + d.summary.validationScore + '%</div><div class="text-[10px] text-gray-500">VALIDATION</div></div>' +
              '<div><div class="text-2xl font-black text-blue-400">' + d.summary.totalDataPoints + '</div><div class="text-[10px] text-gray-500">DATA POINTS</div></div>' +
              '<div><div class="text-sm font-bold ' + (d.summary.proofStatus === 'MARKET VALIDATED' ? 'text-green-400' : 'text-yellow-400') + ' py-2">' + d.summary.proofStatus + '</div><div class="text-[10px] text-gray-500">STATUS</div></div>' +
            '</div>' +
          '</div>' +
          '<div class="grid grid-cols-1 md:grid-cols-3 gap-3">' +
            '<div class="p-3 rounded-xl bg-purple-500/5"><div class="text-xs font-bold text-purple-300 mb-2"><i class="fas fa-store mr-1"></i>DEMAND</div><div class="text-[11px] text-gray-400 space-y-1"><div>Orders: ' + d.demandValidation.totalOrders + ' (' + d.demandValidation.completedOrders + ' completed)</div><div>Revenue: ' + formatRp(d.demandValidation.totalRevenue) + '</div><div>Customers: ' + d.demandValidation.uniqueCustomers + '</div><div class="font-bold text-purple-300 pt-1">' + d.demandValidation.verdict + '</div></div></div>' +
            '<div class="p-3 rounded-xl bg-green-500/5"><div class="text-xs font-bold text-green-300 mb-2"><i class="fas fa-rocket mr-1"></i>SYSTEM</div><div class="text-[11px] text-gray-400 space-y-1"><div>Leads: ' + d.systemValidation.totalLeads + '</div><div>Converted: ' + d.systemValidation.convertedLeads + '</div><div>Rate: ' + d.systemValidation.conversionRate + '</div><div class="font-bold text-green-300 pt-1">' + d.systemValidation.verdict + '</div></div></div>' +
            '<div class="p-3 rounded-xl bg-yellow-500/5"><div class="text-xs font-bold text-yellow-300 mb-2"><i class="fas fa-user-tie mr-1"></i>TRUST</div><div class="text-[11px] text-gray-400 space-y-1"><div>Hot Leads: ' + d.trustValidation.hotLeads + '</div><div>Trust Score: ' + d.trustValidation.trustScore + '%</div><div>Top Score: ' + d.trustValidation.highestScore + '</div><div class="font-bold text-yellow-300 pt-1">' + d.trustValidation.verdict + '</div></div></div>' +
          '</div>' +
          '</div>';
      }

      loadValidation();
      loadEvents();
    </script>
  `
  return sovereignLayout('Market Validation Intelligence', content, 'validation')
}
