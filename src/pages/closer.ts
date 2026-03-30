// Closer Agent Page - WA Outreach
import { sovereignLayout } from './layout'

export function closerPage(): string {
  const content = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div class="glass-card p-5">
        <h3 class="font-bold text-sm mb-4"><i class="fas fa-paper-plane mr-2 text-purple-400"></i>Send Outreach</h3>
        <div class="space-y-3">
          <input id="outPhone" class="glass-input w-full" placeholder="Phone number (62xxx) *">
          <select id="outTemplate" class="glass-input w-full" onchange="loadTemplate()">
            <option value="">Select template...</option>
            <option value="intro">Day 0 - Intro (Puji Toko)</option>
            <option value="demo">Day 3 - Demo Link</option>
            <option value="trial">Day 7 - Trial Access</option>
            <option value="followup">Day 14 - Follow Up</option>
            <option value="custom">Custom Message</option>
          </select>
          <textarea id="outMessage" class="glass-input w-full" rows="5" placeholder="Message..."></textarea>
          <button onclick="sendOutreach()" class="glass-btn w-full"><i class="fas fa-paper-plane mr-2"></i>Send Message</button>
        </div>
      </div>
      <div class="glass-card p-5">
        <h3 class="font-bold text-sm mb-4"><i class="fas fa-comment-dots mr-2 text-green-400"></i>Message Templates</h3>
        <div id="templateList" class="space-y-3">Loading...</div>
      </div>
    </div>
    <div class="glass-card p-5">
      <h3 class="font-bold text-sm mb-4"><i class="fas fa-history mr-2 text-yellow-400"></i>Outreach Log</h3>
      <div class="overflow-x-auto">
        <table><thead><tr><th>Phone</th><th>Message</th><th>Status</th><th>Sent</th></tr></thead>
        <tbody id="outLogs"><tr><td colspan="4" class="text-center text-gray-600 py-4">Loading...</td></tr></tbody></table>
      </div>
    </div>
    <script>
      const templates={intro:"Halo kak! Aku perhatiin toko kakak bagus banget lho! Koleksi fashion-nya lengkap.\\n\\nBtw, kakak masih catat orderan manual via WA ya? Ada tools gratis yang bisa bantu rapiin orderan kakak dalam hitungan detik.\\n\\nMau aku share link-nya?",demo:"Halo lagi kak! Ini link demo FashionKas yang aku ceritain kemarin:\\n\\nhttps://fashionkas.pages.dev\\n\\nBisa langsung coba gratis, tinggal daftar aja. Kalau ada yang bingung, tanya aku aja ya!",trial:"Kak, gimana nih udah sempat coba FashionKas?\\n\\nAku kasih akses Pro gratis 7 hari ya buat kakak cobain fitur lengkapnya. Tinggal klik link ini aja.\\n\\nSemangat jualan kak!",followup:"Halo kak! Gimana pengalaman pakai FashionKas?\\n\\nKalau cocok, lagi ada promo spesial Rp 49rb/bulan.\\nMau lanjut pakai?"};
      const params=new URLSearchParams(window.location.search);
      if(params.get('phone'))document.getElementById('outPhone').value=params.get('phone');
      function loadTemplate(){const t=document.getElementById('outTemplate').value;document.getElementById('outMessage').value=templates[t]||'';}
      async function loadTemplates(){const r=await apiFetch('/api/closer/templates');if(r?.success){document.getElementById('templateList').innerHTML=(r.data||[]).map(t=>'<div class="p-3 rounded-xl bg-white/[0.02] border border-white/5"><div class="flex items-center justify-between mb-1"><span class="text-sm font-medium text-white">'+t.name+'</span><span class="badge badge-purple">Day '+t.day+'</span></div><div class="text-xs text-gray-400 line-clamp-2">'+t.message.substring(0,100)+'...</div></div>').join('');}}
      async function sendOutreach(){const ph=document.getElementById('outPhone').value;const msg=document.getElementById('outMessage').value;if(!ph||!msg){showToast('Phone & message required','error');return;}const lid=params.get('lead_id')||'';const r=await apiFetch('/api/closer/send',{method:'POST',body:JSON.stringify({phone:ph,message:msg,lead_id:lid||undefined})});if(r?.success){showToast('Message sent!');loadLogs();document.getElementById('outMessage').value='';document.getElementById('outPhone').value='';}else showToast(r?.message||'Error','error');}
      async function loadLogs(){const r=await apiFetch('/api/closer/logs');if(r?.success){document.getElementById('outLogs').innerHTML=(r.data||[]).length===0?'<tr><td colspan="4" class="text-center text-gray-600 py-4">No outreach yet</td></tr>':(r.data||[]).map(l=>'<tr><td class="mono text-xs">'+l.phone+'</td><td class="text-xs max-w-xs truncate">'+l.message.substring(0,60)+'...</td><td><span class="badge badge-green">'+l.status+'</span></td><td class="text-xs text-gray-500">'+formatDate(l.sent_at)+'</td></tr>').join('');}}
      loadTemplates();loadLogs();
    </script>
  `
  return sovereignLayout('Closer Agent', content, 'closer')
}
