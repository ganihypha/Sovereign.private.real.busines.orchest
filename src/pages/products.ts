import { sovereignLayout } from './layout'
export function productsPage(): string {
  const content = `
    <div class="flex flex-wrap items-center gap-3 mb-6">
      <button onclick="showAddProduct()" class="glass-btn text-sm"><i class="fas fa-plus mr-2"></i>Add Product</button>
      <input id="searchProd" class="glass-input text-sm" placeholder="Search..." oninput="loadProducts()">
    </div>
    <div class="glass-card overflow-x-auto">
      <table><thead><tr><th>Product</th><th>SKU</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody id="prodTable"><tr><td colspan="7" class="text-center text-gray-600 py-8">Loading...</td></tr></tbody></table>
    </div>
    <div id="addProdModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" style="display:none">
      <div class="glass-card p-6 w-full max-w-md">
        <h3 class="font-bold text-lg mb-4"><i class="fas fa-box mr-2 text-purple-400"></i>Add Product</h3>
        <div class="space-y-3">
          <input id="pName" class="glass-input w-full" placeholder="Product Name *">
          <input id="pSku" class="glass-input w-full" placeholder="SKU">
          <input id="pCat" class="glass-input w-full" placeholder="Category" value="fashion">
          <div class="grid grid-cols-2 gap-3">
            <input id="pPrice" class="glass-input w-full" type="number" placeholder="Sell Price">
            <input id="pCost" class="glass-input w-full" type="number" placeholder="Cost Price">
          </div>
          <div class="grid grid-cols-2 gap-3">
            <input id="pStock" class="glass-input w-full" type="number" placeholder="Stock">
            <input id="pMin" class="glass-input w-full" type="number" placeholder="Min Stock" value="5">
          </div>
          <textarea id="pDesc" class="glass-input w-full" rows="2" placeholder="Description"></textarea>
        </div>
        <div class="flex gap-3 mt-4">
          <button onclick="saveProduct()" class="glass-btn flex-1">Save</button>
          <button onclick="closeModal('addProdModal')" class="glass-btn-outline flex-1">Cancel</button>
        </div>
      </div>
    </div>
    <script>
      async function loadProducts(){const s=document.getElementById('searchProd').value;let u='/api/products';if(s)u+='?search='+encodeURIComponent(s);const r=await apiFetch(u);if(!r?.success)return;const P=r.data||[];document.getElementById('prodTable').innerHTML=P.length===0?'<tr><td colspan="7" class="text-center text-gray-600 py-8">No products yet</td></tr>':P.map(p=>'<tr><td class="font-medium text-white">'+p.name+'</td><td class="mono text-xs">'+p.sku+'</td><td><span class="badge badge-purple">'+p.category+'</span></td><td class="font-medium">'+formatRp(p.price)+'</td><td class="'+(p.stock<=p.min_stock?'text-red-400':'text-green-400')+'">'+p.stock+'</td><td>'+(p.is_active?'<span class="badge badge-green">Active</span>':'<span class="badge badge-red">Inactive</span>')+'</td><td><button onclick="deleteProd(\''+p.id+'\')" class="text-red-400 hover:text-red-300 text-sm"><i class="fas fa-trash"></i></button></td></tr>').join('');}
      function showAddProduct(){document.getElementById('addProdModal').style.display='flex';}
      function closeModal(id){document.getElementById(id).style.display='none';}
      async function saveProduct(){const d={name:document.getElementById('pName').value,sku:document.getElementById('pSku').value,category:document.getElementById('pCat').value,price:parseFloat(document.getElementById('pPrice').value)||0,cost_price:parseFloat(document.getElementById('pCost').value)||0,stock:parseInt(document.getElementById('pStock').value)||0,min_stock:parseInt(document.getElementById('pMin').value)||5,description:document.getElementById('pDesc').value};if(!d.name){showToast('Name required','error');return;}const r=await apiFetch('/api/products',{method:'POST',body:JSON.stringify(d)});if(r?.success){showToast('Product added!');closeModal('addProdModal');loadProducts();}else showToast(r?.message||'Error','error');}
      async function deleteProd(id){if(!confirm('Delete?'))return;await apiFetch('/api/products/'+id,{method:'DELETE'});loadProducts();}
      loadProducts();
    </script>
  `
  return sovereignLayout('Inventory', content, 'products')
}
