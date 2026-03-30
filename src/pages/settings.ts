import { sovereignLayout } from './layout'
export function settingsPage(): string {
  const content = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="glass-card p-5">
        <h3 class="font-bold text-sm mb-4"><i class="fas fa-shield-halved mr-2 text-purple-400"></i>Security</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
            <div><div class="text-sm text-white">PIN Protection</div><div class="text-xs text-gray-500">4-digit master PIN</div></div>
            <span class="badge badge-green">Active</span>
          </div>
          <div class="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
            <div><div class="text-sm text-white">NoIndex/NoFollow</div><div class="text-xs text-gray-500">Hidden from search engines</div></div>
            <span class="badge badge-green">Active</span>
          </div>
          <div class="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
            <div><div class="text-sm text-white">JWT Authentication</div><div class="text-xs text-gray-500">7-day token expiry</div></div>
            <span class="badge badge-green">Active</span>
          </div>
        </div>
      </div>
      <div class="glass-card p-5">
        <h3 class="font-bold text-sm mb-4"><i class="fas fa-link mr-2 text-green-400"></i>Connected Services</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
            <div class="flex items-center gap-3"><div class="w-8 h-8 rounded-lg bg-green-500/15 flex items-center justify-center"><i class="fas fa-database text-green-400 text-xs"></i></div><div><div class="text-sm text-white">Supabase</div><div class="text-xs text-gray-500">Database & Auth</div></div></div>
            <span class="badge badge-green">Connected</span>
          </div>
          <div class="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
            <div class="flex items-center gap-3"><div class="w-8 h-8 rounded-lg bg-orange-500/15 flex items-center justify-center"><i class="fas fa-cloud text-orange-400 text-xs"></i></div><div><div class="text-sm text-white">Cloudflare Pages</div><div class="text-xs text-gray-500">Edge Deployment</div></div></div>
            <span class="badge badge-green">Connected</span>
          </div>
          <div class="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
            <div class="flex items-center gap-3"><div class="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center"><i class="fas fa-spider text-purple-400 text-xs"></i></div><div><div class="text-sm text-white">ScraperAPI</div><div class="text-xs text-gray-500">Lead Discovery</div></div></div>
            <span class="badge badge-green">Connected</span>
          </div>
        </div>
      </div>
      <div class="glass-card p-5 md:col-span-2">
        <h3 class="font-bold text-sm mb-4"><i class="fas fa-satellite-dish mr-2 text-yellow-400"></i>3-Layer Orchestration Status</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10">
            <div class="flex items-center gap-2 mb-2"><div class="pulse-dot"></div><span class="text-xs mono text-purple-300">LAYER 1 - BRAND</span></div>
            <div class="font-bold text-white">@fashionkas.official</div>
            <div class="text-xs text-gray-400 mt-1">Revenue Engine - Konversi traffic ke user berbayar</div>
          </div>
          <div class="p-4 rounded-xl bg-green-500/5 border border-green-500/10">
            <div class="flex items-center gap-2 mb-2"><div class="pulse-dot"></div><span class="text-xs mono text-green-300">LAYER 2 - GROWTH</span></div>
            <div class="font-bold text-white">@resellerkas.official</div>
            <div class="text-xs text-gray-400 mt-1">Community & UGC - Edukasi reseller</div>
          </div>
          <div class="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
            <div class="flex items-center gap-2 mb-2"><div class="pulse-dot"></div><span class="text-xs mono text-yellow-300">LAYER 3 - FOUNDER</span></div>
            <div class="font-bold text-white">@haidar_faras_m</div>
            <div class="text-xs text-gray-400 mt-1">Trust Engine - Build in Public authority</div>
          </div>
        </div>
      </div>
    </div>
  `
  return sovereignLayout('Settings', content, 'settings')
}
