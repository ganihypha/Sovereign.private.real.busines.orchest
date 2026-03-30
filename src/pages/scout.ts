// Scout Agent Page - Lead Discovery & Scoring
import { sovereignLayout } from './layout'

export function scoutPage(): string {
  const content = `
    <div class="flex flex-wrap items-center gap-3 mb-6">
      <button onclick="showAddLead()" class="glass-btn text-sm"><i class="fas fa-plus mr-2"></i>Add Lead</button>
      <button onclick="autoScore()" class="glass-btn-outline text-sm"><i class="fas fa-bolt mr-2"></i>Auto Score</button>
      <select id="filterStatus" onchange="loadLeads()" class="glass-input text-sm w-40">
        <option value="">All Status</option>
        <option value="new">New</option>
        <option value="scored">Scored</option>
        <option value="contacted">Contacted</option>
        <option value="converted">Converted</option>
      </select>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="glass-card p-4 text-center"><div id="totalLeads" class="text-2xl font-bold text-white">0</div><div class="text-xs text-gray-500">Total Leads</div></div>
      <div class="glass-card p-4 text-center"><div id="hotLeads" class="text-2xl font-bold text-green-400">0</div><div class="text-xs text-gray-500">Hot (70+)</div></div>
      <div class="glass-card p-4 text-center"><div id="warmLeads" class="text-2xl font-bold text-yellow-400">0</div><div class="text-xs text-gray-500">Warm (40-69)</div></div>
      <div class="glass-card p-4 text-center"><div id="coldLeads" class="text-2xl font-bold text-gray-400">0</div><div class="text-xs text-gray-500">Cold (<40)</div></div>
    </div>
    <div class="glass-card overflow-x-auto">
      <table><thead><tr><th>Shop</th><th>Platform</th><th>Username</th><th>Score</th><th>Gap</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody id="leadsTable"><tr><td colspan="7" class="text-center text-gray-600 py-8">Loading...</td></tr></tbody></table>
    </div>
    <div id="addLeadModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" style="display:none">
      <div class="glass-card p-6 w-full max-w-md">
        <h3 class="font-bold text-lg mb-4"><i class="fas fa-crosshairs mr-2 text-green-400"></i>Add New Lead</h3>
        <div class="space-y-3">
          <input id="leadShop" class="glass-input w-full" placeholder="Shop Name *">
          <select id="leadPlatform" class="glass-input w-full"><option value="instagram">Instagram</option><option value="tiktok">TikTok</option><option value="whatsapp">WhatsApp</option><option value="shopee">Shopee</option></select>
          <input id="leadUsername" class="glass-input w-full" placeholder="Username">
          <input id="leadPhone" class="glass-input w-full" placeholder="Phone (62xxx)">
          <input id="leadFollowers" class="glass-input w-full" type="number" placeholder="Followers">
          <select id="leadGap" class="glass-input w-full"><option value="high">High Gap</option><option value="medium">Medium Gap</option><option value="low">Low Gap</option></select>
          <textarea id="leadNotes" class="glass-input w-full" rows="2" placeholder="Notes"></textarea>
        </div>
        <div class="flex gap-3 mt-4">
          <button onclick="saveLead()" class="glass-btn flex-1">Save</button>
          <button onclick="closeModal('addLeadModal')" class="glass-btn-outline flex-1">Cancel</button>
        </div>
      </div>
    </div>
    <script>
      async function loadLeads(){const s=document.getElementById('filterStatus').value;let u='/api/scout/leads';if(s)u+='?status='+s;const r=await apiFetch(u);if(!r?.success)return;const L=r.data||[];document.getElementById('totalLeads').textContent=L.length;document.getElementById('hotLeads').textContent=L.filter(l=>l.score>=70).length;document.getElementById('warmLeads').textContent=L.filter(l=>l.score>=40&&l.score<70).length;document.getElementById('coldLeads').textContent=L.filter(l=>l.score<40).length;document.getElementById('leadsTable').innerHTML=L.length===0?'<tr><td colspan="7" class="text-center text-gray-600 py-8">No leads yet</td></tr>':L.map(l=>'<tr><td class="font-medium text-white">'+l.shop_name+'</td><td><span class="badge badge-purple">'+l.platform+'</span></td><td class="mono text-xs">'+(l.username||'-')+'</td><td><span class="font-bold '+(l.score>=70?'text-green-400':l.score>=40?'text-yellow-400':'text-gray-400')+'">'+l.score+'</span></td><td><span class="badge '+(l.digital_gap==='high'?'badge-red':l.digital_gap==='medium'?'badge-yellow':'badge-green')+'">'+l.digital_gap+'</span></td><td><span class="badge '+(l.status==='converted'?'badge-green':l.status==='contacted'?'badge-blue':'badge-yellow')+'">'+l.status+'</span></td><td><button onclick="sendToCloser(\''+l.id+'\',\''+(l.phone||'')+'\')" class="text-purple-400 hover:text-purple-300 text-sm mr-2"><i class="fas fa-paper-plane"></i></button><button onclick="deleteLead(\''+l.id+'\')" class="text-red-400 hover:text-red-300 text-sm"><i class="fas fa-trash"></i></button></td></tr>').join('');}
      function showAddLead(){document.getElementById('addLeadModal').style.display='flex';}
      function closeModal(id){document.getElementById(id).style.display='none';}
      async function saveLead(){const d={shop_name:document.getElementById('leadShop').value,platform:document.getElementById('leadPlatform').value,username:document.getElementById('leadUsername').value,phone:document.getElementById('leadPhone').value,followers:parseInt(document.getElementById('leadFollowers').value)||0,digital_gap:document.getElementById('leadGap').value,notes:document.getElementById('leadNotes').value};if(!d.shop_name){showToast('Shop name required','error');return;}const r=await apiFetch('/api/scout/leads',{method:'POST',body:JSON.stringify(d)});if(r?.success){showToast('Lead added!');closeModal('addLeadModal');loadLeads();}else showToast(r?.message||'Error','error');}
      async function autoScore(){const r=await apiFetch('/api/scout/score',{method:'POST'});if(r?.success){showToast('Scored '+r.scored+' leads');loadLeads();}}
      async function deleteLead(id){if(!confirm('Delete?'))return;await apiFetch('/api/scout/leads/'+id,{method:'DELETE'});loadLeads();}
      function sendToCloser(id,ph){window.location.href='/app/closer?lead_id='+id+'&phone='+ph;}
      loadLeads();
    </script>
  `
  return sovereignLayout('Scout Agent', content, 'scout')
}
