// Leads Page - Scout Agent & Lead Management
import { sovereignLayout } from './layout'

export function leadsPage() {
  const content = `
    <div class="mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold"><i class="fas fa-crosshairs text-purple-400 mr-2"></i>Scout & Leads</h2>
          <p class="text-gray-500 text-sm mt-1">AI Scout Agent — Temukan target reseller potensial</p>
        </div>
        <button onclick="openScoutModal()" class="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium hover:opacity-80">
          <i class="fas fa-search mr-2"></i>Scout Now
        </button>
      </div>
    </div>

    <!-- Scout Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="stat-card"><p class="text-xs text-gray-400 mb-1">Total Leads</p><p class="text-2xl font-bold" id="sLeadsTotal">0</p></div>
      <div class="stat-card"><p class="text-xs text-gray-400 mb-1">Hot (Score 80+)</p><p class="text-2xl font-bold text-orange-400" id="sLeadsHot">0</p></div>
      <div class="stat-card"><p class="text-xs text-gray-400 mb-1">Warm (50-79)</p><p class="text-2xl font-bold text-yellow-400" id="sLeadsWarm">0</p></div>
      <div class="stat-card"><p class="text-xs text-gray-400 mb-1">Cold (<50)</p><p class="text-2xl font-bold text-gray-400" id="sLeadsCold">0</p></div>
    </div>

    <!-- Leads Table -->
    <div class="glass-card p-5">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-sm font-semibold">Lead Pipeline</h4>
        <div class="flex gap-2">
          <select id="filterScore" onchange="loadLeads()" class="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-300">
            <option value="">All Scores</option>
            <option value="hot">Hot (80+)</option>
            <option value="warm">Warm (50-79)</option>
            <option value="cold">Cold (&lt;50)</option>
          </select>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead>
            <tr class="text-gray-500 border-b border-white/5">
              <th class="text-left py-3 px-2">Nama/Toko</th>
              <th class="text-left py-3 px-2">Platform</th>
              <th class="text-left py-3 px-2">Score</th>
              <th class="text-left py-3 px-2">Status</th>
              <th class="text-left py-3 px-2">Last Contact</th>
              <th class="text-left py-3 px-2">Actions</th>
            </tr>
          </thead>
          <tbody id="leadsTable">
            <tr><td colspan="6" class="text-center py-8 text-gray-600">Belum ada leads. Klik "Scout Now" untuk mulai.</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Scout Modal -->
    <div id="scoutModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden flex items-center justify-center">
      <div class="glass-card p-6 w-full max-w-lg mx-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold"><i class="fas fa-robot text-purple-400 mr-2"></i>Scout Agent</h3>
          <button onclick="closeScoutModal()" class="text-gray-500 hover:text-white"><i class="fas fa-times"></i></button>
        </div>
        <div class="space-y-4">
          <div>
            <label class="text-xs text-gray-400 mb-1 block">Keyword Pencarian</label>
            <input id="scoutKeyword" placeholder="e.g. reseller baju, supplier fashion, olshop hijab" class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50">
          </div>
          <div>
            <label class="text-xs text-gray-400 mb-1 block">Platform Target</label>
            <select id="scoutPlatform" class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white">
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="google">Google Business</option>
            </select>
          </div>
          <div>
            <label class="text-xs text-gray-400 mb-1 block">Lokasi (opsional)</label>
            <input id="scoutLocation" placeholder="e.g. Purbalingga, Jakarta" class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50">
          </div>
          <button onclick="runScout()" id="scoutBtn" class="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium text-sm hover:opacity-80">
            <i class="fas fa-search mr-2"></i>Mulai Scouting
          </button>
          <div id="scoutResult" class="hidden mt-4 p-4 rounded-lg bg-white/5 text-xs text-gray-300 max-h-60 overflow-y-auto"></div>
        </div>
      </div>
    </div>

    <!-- Add Lead Modal -->
    <div id="addLeadModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden flex items-center justify-center">
      <div class="glass-card p-6 w-full max-w-lg mx-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold"><i class="fas fa-user-plus text-green-400 mr-2"></i>Add Lead Manual</h3>
          <button onclick="document.getElementById('addLeadModal').classList.add('hidden')" class="text-gray-500 hover:text-white"><i class="fas fa-times"></i></button>
        </div>
        <div class="space-y-3">
          <input id="leadName" placeholder="Nama / Toko" class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50">
          <input id="leadPhone" placeholder="No WhatsApp (08xxx)" class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50">
          <input id="leadIG" placeholder="Username IG (opsional)" class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50">
          <select id="leadScore" class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white">
            <option value="50">Warm (50)</option><option value="80">Hot (80)</option><option value="30">Cold (30)</option>
          </select>
          <textarea id="leadNotes" rows="2" placeholder="Catatan..." class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50"></textarea>
          <button onclick="addLead()" class="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium text-sm">
            <i class="fas fa-plus mr-2"></i>Tambah Lead
          </button>
        </div>
      </div>
    </div>

    <button onclick="document.getElementById('addLeadModal').classList.remove('hidden')" class="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg hover:opacity-80 glow-purple z-40">
      <i class="fas fa-plus text-lg"></i>
    </button>

    <script>
      function openScoutModal() { document.getElementById('scoutModal').classList.remove('hidden'); }
      function closeScoutModal() { document.getElementById('scoutModal').classList.add('hidden'); }
      
      async function runScout() {
        const btn = document.getElementById('scoutBtn');
        const keyword = document.getElementById('scoutKeyword').value;
        const platform = document.getElementById('scoutPlatform').value;
        const location = document.getElementById('scoutLocation').value;
        if (!keyword) return;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Scouting...';
        btn.disabled = true;
        try {
          const res = await api('/scout/search', { method:'POST', body:{ keyword, platform, location } });
          const resultEl = document.getElementById('scoutResult');
          resultEl.classList.remove('hidden');
          if (res.success && res.data) {
            resultEl.innerHTML = '<p class="text-green-400 mb-2">Found ' + res.data.length + ' results:</p>' +
              res.data.map(r => '<div class="p-2 rounded bg-white/5 mb-2"><strong class="text-white">' + (r.name||r.title||'Unknown') + '</strong><br><span class="text-gray-500">' + (r.snippet||r.description||'') + '</span></div>').join('');
          } else {
            resultEl.innerHTML = '<p class="text-yellow-400">' + (res.message || 'No results found') + '</p>';
          }
        } catch(e) {
          document.getElementById('scoutResult').classList.remove('hidden');
          document.getElementById('scoutResult').innerHTML = '<p class="text-red-400">Error: ' + e.message + '</p>';
        }
        btn.innerHTML = '<i class="fas fa-search mr-2"></i>Mulai Scouting';
        btn.disabled = false;
      }

      async function addLead() {
        const data = {
          name: document.getElementById('leadName').value,
          phone: document.getElementById('leadPhone').value,
          ig_username: document.getElementById('leadIG').value,
          score: parseInt(document.getElementById('leadScore').value),
          notes: document.getElementById('leadNotes').value
        };
        if (!data.name) return alert('Nama wajib diisi');
        try {
          await api('/leads', { method:'POST', body:data });
          document.getElementById('addLeadModal').classList.add('hidden');
          loadLeads();
        } catch(e) { alert('Error: ' + e.message); }
      }

      async function loadLeads() {
        try {
          const filter = document.getElementById('filterScore').value;
          const res = await api('/leads?filter=' + filter);
          if (res.success && res.data.length) {
            const tbody = document.getElementById('leadsTable');
            tbody.innerHTML = res.data.map(l => {
              const scoreColor = l.score >= 80 ? 'text-orange-400' : l.score >= 50 ? 'text-yellow-400' : 'text-gray-400';
              const scoreLabel = l.score >= 80 ? 'Hot' : l.score >= 50 ? 'Warm' : 'Cold';
              return '<tr class="border-b border-white/5 hover:bg-white/5">' +
                '<td class="py-3 px-2"><span class="text-white font-medium">' + l.name + '</span>' + (l.ig_username ? '<br><span class="text-purple-300/60">@'+l.ig_username+'</span>' : '') + '</td>' +
                '<td class="py-3 px-2 text-gray-400">' + (l.platform||'Manual') + '</td>' +
                '<td class="py-3 px-2 ' + scoreColor + ' font-bold">' + l.score + ' <span class="font-normal text-gray-500">(' + scoreLabel + ')</span></td>' +
                '<td class="py-3 px-2"><span class="px-2 py-0.5 rounded-full bg-white/5 text-gray-300">' + (l.status||'new') + '</span></td>' +
                '<td class="py-3 px-2 text-gray-500">' + (l.last_contact||'-') + '</td>' +
                '<td class="py-3 px-2"><button onclick="deleteLead('+l.id+')" class="text-red-400/50 hover:text-red-400"><i class="fas fa-trash-alt"></i></button></td></tr>';
            }).join('');
            // Update stats
            document.getElementById('sLeadsTotal').textContent = res.data.length;
            document.getElementById('sLeadsHot').textContent = res.data.filter(l=>l.score>=80).length;
            document.getElementById('sLeadsWarm').textContent = res.data.filter(l=>l.score>=50&&l.score<80).length;
            document.getElementById('sLeadsCold').textContent = res.data.filter(l=>l.score<50).length;
          }
        } catch(e) { console.log('Load leads:', e); }
      }
      async function deleteLead(id) { if(confirm('Hapus lead ini?')) { await api('/leads/'+id, {method:'DELETE'}); loadLeads(); } }
      loadLeads();
    </script>`

  return sovereignLayout('Scout & Leads', content, 'leads')
}
