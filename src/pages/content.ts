// Content Orchestration Page
import { sovereignLayout } from './layout'

export function contentPage() {
  const content = `
    <div class="mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold"><i class="fas fa-calendar-alt text-blue-400 mr-2"></i>Content Orchestration</h2>
          <p class="text-gray-500 text-sm mt-1">Jadwalkan & orkestrasi konten di 3 akun IG</p>
        </div>
        <button onclick="document.getElementById('newContentModal').classList.remove('hidden')" class="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium hover:opacity-80">
          <i class="fas fa-plus mr-2"></i>New Content
        </button>
      </div>
    </div>

    <!-- Content Calendar Overview -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="stat-card">
        <div class="flex items-center gap-2 mb-2"><div class="w-3 h-3 rounded-full bg-purple-500"></div><span class="text-xs text-gray-400">@fashionkas.official</span></div>
        <p class="text-2xl font-bold" id="contentBrand">0</p>
        <p class="text-xs text-gray-500">posts dijadwalkan</p>
      </div>
      <div class="stat-card">
        <div class="flex items-center gap-2 mb-2"><div class="w-3 h-3 rounded-full bg-blue-500"></div><span class="text-xs text-gray-400">@haidar_faras_m</span></div>
        <p class="text-2xl font-bold" id="contentFounder">0</p>
        <p class="text-xs text-gray-500">posts dijadwalkan</p>
      </div>
      <div class="stat-card">
        <div class="flex items-center gap-2 mb-2"><div class="w-3 h-3 rounded-full bg-emerald-500"></div><span class="text-xs text-gray-400">@resellerkas.official</span></div>
        <p class="text-2xl font-bold" id="contentGrowth">0</p>
        <p class="text-xs text-gray-500">posts dijadwalkan</p>
      </div>
    </div>

    <!-- Content Pipeline -->
    <div class="glass-card p-5 mb-6">
      <h4 class="text-sm font-semibold mb-4">Content Pipeline</h4>
      <div class="space-y-3" id="contentPipeline">
        <div class="text-center py-8 text-gray-600 text-sm">Belum ada konten. Buat konten baru untuk mulai orkestrasi.</div>
      </div>
    </div>

    <!-- Content Ideas (from PRD) -->
    <div class="glass-card p-5">
      <h4 class="text-sm font-semibold mb-4"><i class="fas fa-lightbulb text-yellow-400 mr-2"></i>Content Ideas Bank</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="p-3 rounded-lg bg-white/5 border border-white/5">
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">Carousel</span>
          <p class="text-xs text-white mt-2 font-medium">5 Alasan Order WA Sering Terlewat</p>
          <p class="text-[10px] text-gray-500 mt-1">Hook/Agitate/Solution/CTA — untuk @fashionkas.official</p>
        </div>
        <div class="p-3 rounded-lg bg-white/5 border border-white/5">
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">Reels</span>
          <p class="text-xs text-white mt-2 font-medium">Catat Order WA dalam 1 Menit</p>
          <p class="text-[10px] text-gray-500 mt-1">Demo cepat — screen record + voiceover</p>
        </div>
        <div class="p-3 rounded-lg bg-white/5 border border-white/5">
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">Story Pack</span>
          <p class="text-xs text-white mt-2 font-medium">BTS: Layar Coding FashionKas</p>
          <p class="text-[10px] text-gray-500 mt-1">Untuk @haidar_faras_m — trust building</p>
        </div>
        <div class="p-3 rounded-lg bg-white/5 border border-white/5">
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300">Carousel</span>
          <p class="text-xs text-white mt-2 font-medium">Before vs After: Buku → App</p>
          <p class="text-[10px] text-gray-500 mt-1">Shock value — perbandingan visual</p>
        </div>
        <div class="p-3 rounded-lg bg-white/5 border border-white/5">
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300">Template</span>
          <p class="text-xs text-white mt-2 font-medium">Script Chat Invoice + Follow-up + Resi</p>
          <p class="text-[10px] text-gray-500 mt-1">Untuk @resellerkas.official — edukasi reseller</p>
        </div>
        <div class="p-3 rounded-lg bg-white/5 border border-white/5">
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300">Reels</span>
          <p class="text-xs text-white mt-2 font-medium">POV: Manual vs Digital (Split Screen)</p>
          <p class="text-[10px] text-gray-500 mt-1">Viral potential — relatable untuk reseller</p>
        </div>
      </div>
    </div>

    <!-- New Content Modal -->
    <div id="newContentModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden flex items-center justify-center">
      <div class="glass-card p-6 w-full max-w-lg mx-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold"><i class="fas fa-pen text-blue-400 mr-2"></i>New Content</h3>
          <button onclick="document.getElementById('newContentModal').classList.add('hidden')" class="text-gray-500 hover:text-white"><i class="fas fa-times"></i></button>
        </div>
        <div class="space-y-3">
          <select id="contentAccount" class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white">
            <option value="fashionkas.official">@fashionkas.official (Brand)</option>
            <option value="haidar_faras_m">@haidar_faras_m (Founder)</option>
            <option value="resellerkas.official">@resellerkas.official (Growth)</option>
          </select>
          <select id="contentType" class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white">
            <option value="carousel">Carousel</option>
            <option value="reels">Reels</option>
            <option value="story">Story Pack</option>
            <option value="static">Static Post</option>
          </select>
          <input id="contentTitle" placeholder="Judul konten" class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50">
          <textarea id="contentCaption" rows="3" placeholder="Caption / Deskripsi..." class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50"></textarea>
          <input id="contentDate" type="date" class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/50">
          <select id="contentStatus" class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white">
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
          </select>
          <button onclick="saveContent()" class="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-sm">
            <i class="fas fa-save mr-2"></i>Save Content
          </button>
        </div>
      </div>
    </div>

    <script>
      async function saveContent() {
        const data = {
          account: document.getElementById('contentAccount').value,
          type: document.getElementById('contentType').value,
          title: document.getElementById('contentTitle').value,
          caption: document.getElementById('contentCaption').value,
          scheduled_date: document.getElementById('contentDate').value,
          status: document.getElementById('contentStatus').value
        };
        if(!data.title) return alert('Judul wajib diisi');
        try {
          await api('/content', { method:'POST', body:data });
          document.getElementById('newContentModal').classList.add('hidden');
          loadContent();
        } catch(e) { alert('Error: ' + e.message); }
      }
      
      async function loadContent() {
        try {
          const res = await api('/content');
          if (res.success && res.data.length) {
            const pipe = document.getElementById('contentPipeline');
            let brandCount = 0, founderCount = 0, growthCount = 0;
            pipe.innerHTML = res.data.map(c => {
              if(c.account==='fashionkas.official') brandCount++;
              if(c.account==='haidar_faras_m') founderCount++;
              if(c.account==='resellerkas.official') growthCount++;
              const acColor = c.account==='fashionkas.official'?'purple':c.account==='haidar_faras_m'?'blue':'emerald';
              const statusColor = c.status==='published'?'green':c.status==='scheduled'?'blue':'gray';
              return '<div class="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/8">' +
                '<div class="w-2 h-8 rounded-full bg-'+acColor+'-500"></div>' +
                '<div class="flex-1"><p class="text-sm text-white font-medium">' + c.title + '</p>' +
                '<p class="text-[10px] text-gray-500">@' + c.account + ' • ' + c.type + ' • ' + (c.scheduled_date||'No date') + '</p></div>' +
                '<span class="px-2 py-0.5 rounded-full bg-'+statusColor+'-500/20 text-'+statusColor+'-300 text-[10px]">' + c.status + '</span>' +
                '<button onclick="deleteContent('+c.id+')" class="text-red-400/30 hover:text-red-400"><i class="fas fa-trash-alt text-xs"></i></button></div>';
            }).join('');
            document.getElementById('contentBrand').textContent = brandCount;
            document.getElementById('contentFounder').textContent = founderCount;
            document.getElementById('contentGrowth').textContent = growthCount;
          }
        } catch(e) { console.log('Load content:', e); }
      }
      async function deleteContent(id) { if(confirm('Hapus konten ini?')) { await api('/content/'+id, {method:'DELETE'}); loadContent(); } }
      loadContent();
    </script>`

  return sovereignLayout('Content Orchestration', content, 'content')
}
