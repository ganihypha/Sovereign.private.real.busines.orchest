import { sovereignLayout } from './layout'
export function customersPage(): string {
  const content = `
    <div class="flex flex-wrap items-center gap-3 mb-6">
      <button onclick="showAddCust()" class="glass-btn text-sm"><i class="fas fa-plus mr-2"></i>Add Customer</button>
      <input id="searchCust" class="glass-input text-sm" placeholder="Search..." oninput="loadCusts()">
    </div>
    <div class="glass-card overflow-x-auto">
      <table><thead><tr><th>Name</th><th>Phone</th><th>City</th><th>Tier</th><th>Orders</th><th>Spent</th><th>Actions</th></tr></thead>
      <tbody id="custTable"><tr><td colspan="7" class="text-center text-gray-600 py-8">Loading...</td></tr></tbody></table>
    </div>
    <div id="addCustModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" style="display:none">
      <div class="glass-card p-6 w-full max-w-md">
        <h3 class="font-bold text-lg mb-4"><i class="fas fa-user-plus mr-2 text-purple-400"></i>Add Customer</h3>
        <div class="space-y-3">
          <input id="cName" class="glass-input w-full" placeholder="Name *">
          <input id="cPhone" class="glass-input w-full" placeholder="Phone (62xxx) *">
          <input id="cCity" class="glass-input w-full" placeholder="City">
          <input id="cAddr" class="glass-input w-full" placeholder="Address">
          <select id="cTier" class="glass-input w-full"><option value="bronze">Bronze</option><option value="silver">Silver</option><option value="gold">Gold</option><option value="vip">VIP</option></select>
          <textarea id="cNotes" class="glass-input w-full" rows="2" placeholder="Notes"></textarea>
        </div>
        <div class="flex gap-3 mt-4">
          <button onclick="saveCust()" class="glass-btn flex-1">Save</button>
          <button onclick="closeModal('addCustModal')" class="glass-btn-outline flex-1">Cancel</button>
        </div>
      </div>
    </div>
    <script>
      const tierColors={bronze:'badge-yellow',silver:'badge-blue',gold:'badge-purple',vip:'badge-green'};
      async function loadCusts(){const s=document.getElementById('searchCust').value;let u='/api/customers';if(s)u+='?search='+encodeURIComponent(s);const r=await apiFetch(u);if(!r?.success)return;const C=r.data||[];document.getElementById('custTable').innerHTML=C.length===0?'<tr><td colspan="7" class="text-center text-gray-600 py-8">No customers yet</td></tr>':C.map(c=>'<tr><td class="font-medium text-white">'+c.name+'</td><td class="mono text-xs">'+c.phone+'</td><td class="text-xs">'+(c.city||'-')+'</td><td><span class="badge '+(tierColors[c.tier]||'badge-yellow')+'">'+c.tier+'</span></td><td>'+c.total_orders+'</td><td class="font-medium">'+formatRp(c.total_spent)+'</td><td><button onclick="deleteCust(\''+c.id+'\')" class="text-red-400 hover:text-red-300 text-sm"><i class="fas fa-trash"></i></button></td></tr>').join('');}
      function showAddCust(){document.getElementById('addCustModal').style.display='flex';}
      function closeModal(id){document.getElementById(id).style.display='none';}
      async function saveCust(){const d={name:document.getElementById('cName').value,phone:document.getElementById('cPhone').value,city:document.getElementById('cCity').value,address:document.getElementById('cAddr').value,tier:document.getElementById('cTier').value,notes:document.getElementById('cNotes').value};if(!d.name||!d.phone){showToast('Name & phone required','error');return;}const r=await apiFetch('/api/customers',{method:'POST',body:JSON.stringify(d)});if(r?.success){showToast('Customer added!');closeModal('addCustModal');loadCusts();}else showToast(r?.message||'Error','error');}
      async function deleteCust(id){if(!confirm('Delete?'))return;await apiFetch('/api/customers/'+id,{method:'DELETE'});loadCusts();}
      loadCusts();
    </script>
  `
  return sovereignLayout('Customers', content, 'customers')
}
