// Brands Page - 3 Layer Management
import { sovereignLayout } from './layout'

export function brandsPage() {
  const content = `
    <div class="mb-6">
      <h2 class="text-2xl font-bold"><i class="fas fa-layer-group text-purple-400 mr-2"></i>Brand Layers</h2>
      <p class="text-gray-500 text-sm mt-1">Kelola 3 akun Instagram + strategi orkestrasi</p>
    </div>

    <!-- Orchestration Flow -->
    <div class="glass-card p-6 mb-6">
      <h3 class="text-sm font-semibold mb-4 text-purple-300">Orchestration Flow</h3>
      <div class="flex items-center justify-center gap-4 flex-wrap">
        <div class="text-center">
          <div class="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center mb-2"><i class="fab fa-instagram text-blue-400 text-xl"></i></div>
          <p class="text-[10px] text-blue-300 font-medium">@haidar_faras_m</p>
          <p class="text-[9px] text-gray-500">Trust Engine</p>
        </div>
        <i class="fas fa-arrow-right text-purple-500/30"></i>
        <div class="text-center">
          <div class="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center mb-2"><i class="fab fa-instagram text-purple-400 text-xl"></i></div>
          <p class="text-[10px] text-purple-300 font-medium">@fashionkas.official</p>
          <p class="text-[9px] text-gray-500">Brand Machine</p>
        </div>
        <i class="fas fa-arrow-right text-purple-500/30"></i>
        <div class="text-center">
          <div class="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-2"><i class="fab fa-instagram text-emerald-400 text-xl"></i></div>
          <p class="text-[10px] text-emerald-300 font-medium">@resellerkas.official</p>
          <p class="text-[9px] text-gray-500">Growth Hub</p>
        </div>
        <i class="fas fa-arrow-right text-purple-500/30"></i>
        <div class="text-center">
          <div class="w-14 h-14 rounded-xl bg-orange-500/20 flex items-center justify-center mb-2"><i class="fas fa-funnel-dollar text-orange-400 text-xl"></i></div>
          <p class="text-[10px] text-orange-300 font-medium">Conversion</p>
          <p class="text-[9px] text-gray-500">Real Revenue</p>
        </div>
      </div>
    </div>

    <!-- Brand Cards -->
    <div class="space-y-4" id="brandsList">
      <div class="glass-card p-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"><i class="fab fa-instagram text-lg"></i></div>
            <div>
              <h4 class="font-semibold">@fashionkas.official</h4>
              <p class="text-xs text-gray-500">Brand Machine • Revenue Engine</p>
            </div>
          </div>
          <span class="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs">Primary</span>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div><p class="text-xs text-gray-500">Bio</p><p class="text-xs text-white mt-1">FashionKas — Kasir WA Reseller</p></div>
          <div><p class="text-xs text-gray-500">Voice</p><p class="text-xs text-white mt-1">Teman penjual, simple & helpful</p></div>
          <div><p class="text-xs text-gray-500">CTA</p><p class="text-xs text-white mt-1">Daftar GRATIS di link bio</p></div>
          <div><p class="text-xs text-gray-500">Pillars</p><p class="text-xs text-white mt-1">Pain, Edukasi, B/A, How-To, Proof</p></div>
        </div>
        <div class="flex gap-2">
          <button onclick="updateBrandStats(1)" class="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 text-xs hover:bg-purple-500/30"><i class="fas fa-sync mr-1"></i>Sync Stats</button>
          <button class="px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 text-xs hover:bg-white/10"><i class="fas fa-external-link-alt mr-1"></i>Open IG</button>
        </div>
      </div>

      <div class="glass-card p-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center"><i class="fab fa-instagram text-lg"></i></div>
            <div>
              <h4 class="font-semibold">@haidar_faras_m</h4>
              <p class="text-xs text-gray-500">Trust Engine • Founder Command</p>
            </div>
          </div>
          <span class="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs">Founder</span>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div><p class="text-xs text-gray-500">Bio</p><p class="text-xs text-white mt-1">Building @fashionkas.official</p></div>
          <div><p class="text-xs text-gray-500">Voice</p><p class="text-xs text-white mt-1">Builder muda, journey focused</p></div>
          <div><p class="text-xs text-gray-500">Strategy</p><p class="text-xs text-white mt-1">BTS + Repost Brand + Personal</p></div>
          <div><p class="text-xs text-gray-500">Arc</p><p class="text-xs text-white mt-1">Spark → Build → Struggle → Scale</p></div>
        </div>
        <div class="flex gap-2">
          <button onclick="updateBrandStats(2)" class="px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 text-xs hover:bg-blue-500/30"><i class="fas fa-sync mr-1"></i>Sync Stats</button>
          <button class="px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 text-xs hover:bg-white/10"><i class="fas fa-external-link-alt mr-1"></i>Open IG</button>
        </div>
      </div>

      <div class="glass-card p-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center"><i class="fab fa-instagram text-lg"></i></div>
            <div>
              <h4 class="font-semibold">@resellerkas.official</h4>
              <p class="text-xs text-gray-500">Growth Engine • UGC & Community Hub</p>
            </div>
          </div>
          <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs">Support</span>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div><p class="text-xs text-gray-500">Bio</p><p class="text-xs text-white mt-1">Tips & Tools untuk Reseller</p></div>
          <div><p class="text-xs text-gray-500">Voice</p><p class="text-xs text-white mt-1">Edukatif, komunitas, UGC</p></div>
          <div><p class="text-xs text-gray-500">CTA</p><p class="text-xs text-white mt-1">Arahkan ke @fashionkas.official</p></div>
          <div><p class="text-xs text-gray-500">Content</p><p class="text-xs text-white mt-1">Tips WA, Template, Challenge</p></div>
        </div>
        <div class="flex gap-2">
          <button onclick="updateBrandStats(3)" class="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs hover:bg-emerald-500/30"><i class="fas fa-sync mr-1"></i>Sync Stats</button>
          <button class="px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 text-xs hover:bg-white/10"><i class="fas fa-external-link-alt mr-1"></i>Open IG</button>
        </div>
      </div>
    </div>

    <!-- Guardrails -->
    <div class="glass-card p-5 mt-6">
      <h4 class="text-sm font-semibold mb-3"><i class="fas fa-shield-alt text-yellow-400 mr-2"></i>Orchestration Guardrails</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div><span class="text-purple-300 font-medium">Brand Voice:</span> <span class="text-gray-400">Gunakan "KAMI" — profesional, solutif</span></div>
        <div><span class="text-blue-300 font-medium">Personal Voice:</span> <span class="text-gray-400">Gunakan "AKU" — journey, authentic</span></div>
        <div><span class="text-emerald-300 font-medium">Support Voice:</span> <span class="text-gray-400">Edukatif — tips, template, komunitas</span></div>
        <div><span class="text-orange-300 font-medium">Content Mix:</span> <span class="text-gray-400">Reels 40% • Carousel 30% • Stories 20% • Static 10%</span></div>
      </div>
    </div>

    <script>
      async function updateBrandStats(id) {
        const btn = event.target;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i>Syncing...';
        try {
          await api('/brands/sync', { method:'POST', body:{brand_id:id} });
          btn.innerHTML = '<i class="fas fa-check mr-1"></i>Synced!';
          setTimeout(() => { btn.innerHTML = '<i class="fas fa-sync mr-1"></i>Sync Stats'; }, 2000);
        } catch(e) {
          btn.innerHTML = '<i class="fas fa-times mr-1"></i>Error';
        }
      }
    </script>`

  return sovereignLayout('Brand Layers', content, 'brands')
}
