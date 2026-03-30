import { sovereignLayout } from './layout'
export function ordersPage(): string {
  const content = `
    <div class="flex flex-wrap items-center gap-3 mb-6">
      <button onclick="showAddOrder()" class="glass-btn text-sm"><i class="fas fa-plus mr-2"></i>New Order</button>
      <select id="filterOrdStatus" onchange="loadOrders()" class="glass-input text-sm w-40">
        <option value="">All</option><option value="pending">Pending</option><option value="processing">Processing</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option>
      </select>
    </div>
    <div class="glass-card overflow-x-auto">
      <table><thead><tr><th>Customer</th><th>Phone</th><th>Amount</th><th>Status</th><th>Source</th><th>Date</th><th>Actions</th></tr></thead>
      <tbody id="ordTable"><tr><td colspan="7" class="text-center text-gray-600 py-8">Loading...</td></tr></tbody></table>
    </div>
    <div id="addOrdModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" style="display:none">
      <div class="glass-card p-6 w-full max-w-md">
        <h3 class="font-bold text-lg mb-4"><i class="fas fa-receipt mr-2 text-purple-400"></i>New Order</h3>
        <div class="space-y-3">
          <input id="oName" class="glass-input w-full" placeholder="Customer Name *">
          <input id="oPhone" class="glass-input w-full" placeholder="Phone (62xxx)">
          <input id="oAmount" class="glass-input w-full" type="number" placeholder="Total Amount *">
          <textarea id="oNotes" class="glass-input w-full" rows="2" placeholder="Notes / Items"></textarea>
        </div>
        <div class="flex gap-3 mt-4">
          <button onclick="saveOrder()" class="glass-btn flex-1">Save</button>
          <button onclick="closeModal('addOrdModal')" class="glass-btn-outline flex-1">Cancel</button>
        </div>
      </div>
    </div>
    <script>
      const statusColors={pending:'badge-yellow',processing:'badge-blue',completed:'badge-green',cancelled:'badge-red'};
      async function loadOrders(){const s=document.getElementById('filterOrdStatus').value;let u='/api/orders';if(s)u+='?status='+s;const r=await apiFetch(u);if(!r?.success)return;const O=r.data||[];document.getElementById('ordTable').innerHTML=O.length===0?'<tr><td colspan="7" class="text-center text-gray-600 py-8">No orders yet</td></tr>':O.map(o=>'<tr><td class="font-medium text-white">'+o.customer_name+'</td><td class="mono text-xs">'+(o.customer_phone||'-')+'</td><td class="font-bold">'+formatRp(o.total_amount)+'</td><td><span class="badge '+(statusColors[o.status]||'badge-yellow')+'">'+o.status+'</span></td><td class="text-xs">'+(o.source||'manual')+'</td><td class="text-xs text-gray-500">'+formatDate(o.created_at)+'</td><td><select onchange="updateOrdStatus(\''+o.id+'\',this.value)" class="glass-input text-xs py-1 px-2"><option value="pending" '+(o.status==='pending'?'selected':'')+'>Pending</option><option value="processing" '+(o.status==='processing'?'selected':'')+'>Processing</option><option value="completed" '+(o.status==='completed'?'selected':'')+'>Completed</option><option value="cancelled" '+(o.status==='cancelled'?'selected':'')+'>Cancelled</option></select></td></tr>').join('');}
      function showAddOrder(){document.getElementById('addOrdModal').style.display='flex';}
      function closeModal(id){document.getElementById(id).style.display='none';}
      async function saveOrder(){const d={customer_name:document.getElementById('oName').value,customer_phone:document.getElementById('oPhone').value,total_amount:parseFloat(document.getElementById('oAmount').value)||0,notes:document.getElementById('oNotes').value};if(!d.customer_name||!d.total_amount){showToast('Name & amount required','error');return;}const r=await apiFetch('/api/orders',{method:'POST',body:JSON.stringify(d)});if(r?.success){showToast('Order created!');closeModal('addOrdModal');loadOrders();}else showToast(r?.message||'Error','error');}
      async function updateOrdStatus(id,s){await apiFetch('/api/orders/'+id,{method:'PUT',body:JSON.stringify({status:s})});showToast('Status updated');loadOrders();}
      loadOrders();
    </script>
  `
  return sovereignLayout('Orders', content, 'orders')
}
