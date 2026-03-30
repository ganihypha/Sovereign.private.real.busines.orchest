// Analytics Page - Business Metrics & Funnel
import { sovereignLayout } from './layout'

export function analyticsPage() {
  const content = `
    <div class="mb-6">
      <h2 class="text-2xl font-bold"><i class="fas fa-chart-line text-green-400 mr-2"></i>Analytics</h2>
      <p class="text-gray-500 text-sm mt-1">Revenue engine, conversion funnel & KPI tracking</p>
    </div>

    <!-- Conversion Funnel -->
    <div class="glass-card p-6 mb-6">
      <h3 class="text-sm font-semibold mb-6"><i class="fas fa-funnel-dollar text-orange-400 mr-2"></i>Conversion Funnel (Target Bulan 1)</h3>
      <div class="flex items-center justify-center gap-2 flex-wrap">
        <div class="text-center">
          <div class="w-28 h-28 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex flex-col items-center justify-center">
            <p class="text-2xl font-bold text-purple-400" id="funnelImpressions">0</p>
            <p class="text-[10px] text-gray-500">Impressions</p>
          </div>
          <p class="text-[10px] text-gray-600 mt-2">Target: 1,000</p>
        </div>
        <i class="fas fa-chevron-right text-gray-700"></i>
        <div class="text-center">
          <div class="w-24 h-24 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex flex-col items-center justify-center">
            <p class="text-xl font-bold text-blue-400" id="funnelVisits">0</p>
            <p class="text-[10px] text-gray-500">Profile Visits</p>
          </div>
          <p class="text-[10px] text-gray-600 mt-2">Target: 100</p>
        </div>
        <i class="fas fa-chevron-right text-gray-700"></i>
        <div class="text-center">
          <div class="w-20 h-20 rounded-2xl bg-green-500/10 border border-green-500/20 flex flex-col items-center justify-center">
            <p class="text-lg font-bold text-green-400" id="funnelClicks">0</p>
            <p class="text-[10px] text-gray-500">Bio Clicks</p>
          </div>
          <p class="text-[10px] text-gray-600 mt-2">Target: 30</p>
        </div>
        <i class="fas fa-chevron-right text-gray-700"></i>
        <div class="text-center">
          <div class="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex flex-col items-center justify-center">
            <p class="text-lg font-bold text-orange-400" id="funnelRegs">0</p>
            <p class="text-[10px] text-gray-500">Registrations</p>
          </div>
          <p class="text-[10px] text-gray-600 mt-2">Target: 10</p>
        </div>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="stat-card">
        <p class="text-xs text-gray-400 mb-1">Followers (Total 3 Akun)</p>
        <p class="text-2xl font-bold" id="kpiFollowers">0</p>
        <p class="text-xs text-gray-500">Target: 100+</p>
      </div>
      <div class="stat-card">
        <p class="text-xs text-gray-400 mb-1">Bio Clicks (7d)</p>
        <p class="text-2xl font-bold text-blue-400" id="kpiBioClicks">0</p>
        <p class="text-xs text-gray-500">Target: 50+</p>
      </div>
      <div class="stat-card">
        <p class="text-xs text-gray-400 mb-1">Registrations (30d)</p>
        <p class="text-2xl font-bold text-green-400" id="kpiRegs">0</p>
        <p class="text-xs text-gray-500">Target: 10+</p>
      </div>
      <div class="stat-card">
        <p class="text-xs text-gray-400 mb-1">Content Posted</p>
        <p class="text-2xl font-bold text-purple-400" id="kpiContent">0</p>
        <p class="text-xs text-gray-500">Target: 3x/minggu</p>
      </div>
    </div>

    <!-- Operating Metrics -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div class="glass-card p-5">
        <h4 class="text-sm font-semibold mb-4"><i class="fas fa-tasks text-purple-400 mr-2"></i>Operating Checklist</h4>
        <div class="space-y-2" id="opChecklist">
          <div class="flex items-center gap-3 p-2 rounded-lg bg-white/5">
            <input type="checkbox" class="accent-purple-500" id="chk1"><label for="chk1" class="text-xs text-gray-300">Konten 3x/minggu (1 Reel, 1 Carousel, 1 Story pack)</label>
          </div>
          <div class="flex items-center gap-3 p-2 rounded-lg bg-white/5">
            <input type="checkbox" class="accent-purple-500" id="chk2"><label for="chk2" class="text-xs text-gray-300">Story harian: BTS / polling / CTA ringan</label>
          </div>
          <div class="flex items-center gap-3 p-2 rounded-lg bg-white/5">
            <input type="checkbox" class="accent-purple-500" id="chk3"><label for="chk3" class="text-xs text-gray-300">DM 5 akun target per hari</label>
          </div>
          <div class="flex items-center gap-3 p-2 rounded-lg bg-white/5">
            <input type="checkbox" class="accent-purple-500" id="chk4"><label for="chk4" class="text-xs text-gray-300">Review analytics mingguan</label>
          </div>
          <div class="flex items-center gap-3 p-2 rounded-lg bg-white/5">
            <input type="checkbox" class="accent-purple-500" id="chk5"><label for="chk5" class="text-xs text-gray-300">Cross-reference konten antar 3 akun</label>
          </div>
        </div>
      </div>

      <!-- Launch Calendar -->
      <div class="glass-card p-5">
        <h4 class="text-sm font-semibold mb-4"><i class="fas fa-calendar text-blue-400 mr-2"></i>Launch 30 Hari</h4>
        <div class="space-y-3">
          <div class="p-3 rounded-lg bg-purple-500/5 border-l-2 border-purple-500">
            <p class="text-xs font-semibold text-purple-300">Week 1 — Establishment</p>
            <p class="text-[10px] text-gray-500 mt-1">Setup bio+linktree, 3 konten fondasi, follow 50 target</p>
          </div>
          <div class="p-3 rounded-lg bg-blue-500/5 border-l-2 border-blue-500">
            <p class="text-xs font-semibold text-blue-300">Week 2 — Trust Building</p>
            <p class="text-[10px] text-gray-500 mt-1">Carousel edukasi, reel demo, story poll, 10 DM outreach</p>
          </div>
          <div class="p-3 rounded-lg bg-orange-500/5 border-l-2 border-orange-500">
            <p class="text-xs font-semibold text-orange-300">Week 3 — Agitation</p>
            <p class="text-[10px] text-gray-500 mt-1">Kerugian manual, case/testimoni, Live Q&A personal</p>
          </div>
          <div class="p-3 rounded-lg bg-green-500/5 border-l-2 border-green-500">
            <p class="text-xs font-semibold text-green-300">Week 4 — Conversion</p>
            <p class="text-[10px] text-gray-500 mt-1">Limited offer, direct CTA stories, review metrik bulan 1</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Log Manual Metrics -->
    <div class="glass-card p-5">
      <h4 class="text-sm font-semibold mb-4"><i class="fas fa-edit text-green-400 mr-2"></i>Log Manual Metrics</h4>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div>
          <label class="text-xs text-gray-500 mb-1 block">Impressions</label>
          <input id="metricImpressions" type="number" placeholder="0" class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white">
        </div>
        <div>
          <label class="text-xs text-gray-500 mb-1 block">Profile Visits</label>
          <input id="metricVisits" type="number" placeholder="0" class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white">
        </div>
        <div>
          <label class="text-xs text-gray-500 mb-1 block">Bio Clicks</label>
          <input id="metricClicks" type="number" placeholder="0" class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white">
        </div>
        <div>
          <label class="text-xs text-gray-500 mb-1 block">Registrations</label>
          <input id="metricRegs" type="number" placeholder="0" class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white">
        </div>
      </div>
      <button onclick="saveMetrics()" class="mt-4 px-6 py-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-medium hover:opacity-80">
        <i class="fas fa-save mr-2"></i>Save Metrics
      </button>
    </div>

    <script>
      async function saveMetrics() {
        const data = {
          impressions: parseInt(document.getElementById('metricImpressions').value) || 0,
          profile_visits: parseInt(document.getElementById('metricVisits').value) || 0,
          bio_clicks: parseInt(document.getElementById('metricClicks').value) || 0,
          registrations: parseInt(document.getElementById('metricRegs').value) || 0,
          date: new Date().toISOString().split('T')[0]
        };
        try {
          await api('/analytics/metrics', { method:'POST', body:data });
          alert('Metrics saved!');
          loadAnalytics();
        } catch(e) { alert('Error: ' + e.message); }
      }
      async function loadAnalytics() {
        try {
          const res = await api('/analytics/summary');
          if (res.success) {
            const d = res.data;
            document.getElementById('funnelImpressions').textContent = d.impressions || 0;
            document.getElementById('funnelVisits').textContent = d.profile_visits || 0;
            document.getElementById('funnelClicks').textContent = d.bio_clicks || 0;
            document.getElementById('funnelRegs').textContent = d.registrations || 0;
            document.getElementById('kpiFollowers').textContent = d.total_followers || 0;
            document.getElementById('kpiBioClicks').textContent = d.bio_clicks || 0;
            document.getElementById('kpiRegs').textContent = d.registrations || 0;
            document.getElementById('kpiContent').textContent = d.content_posted || 0;
          }
        } catch(e) { console.log('Analytics load:', e); }
      }
      loadAnalytics();
    </script>`

  return sovereignLayout('Analytics', content, 'analytics')
}
