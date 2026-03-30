// Sovereign Layout - Glassmorphism Dark Theme
// Private Command Center UI

export function sovereignLayout(title: string, content: string, activePage: string = 'dashboard'): string {
  const nav = [
    { id: 'dashboard', label: 'Command Center', icon: 'fa-satellite-dish', href: '/app/dashboard' },
    { id: 'scout', label: 'Scout Agent', icon: 'fa-crosshairs', href: '/app/scout' },
    { id: 'closer', label: 'Closer Agent', icon: 'fa-bullseye', href: '/app/closer' },
    { id: 'products', label: 'Inventory', icon: 'fa-boxes-stacked', href: '/app/products' },
    { id: 'orders', label: 'Orders', icon: 'fa-receipt', href: '/app/orders' },
    { id: 'customers', label: 'Customers', icon: 'fa-users', href: '/app/customers' },
    { id: 'reports', label: 'Reports', icon: 'fa-chart-line', href: '/app/reports' },
    { id: 'settings', label: 'Settings', icon: 'fa-gear', href: '/app/settings' },
  ]

  const navItems = nav.map(n => `
    <a href="${n.href}" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      n.id === activePage 
        ? 'bg-purple-600/30 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-900/20' 
        : 'text-gray-400 hover:text-white hover:bg-white/5'
    }">
      <i class="fas ${n.icon} w-5 text-center"></i>
      <span class="sidebar-label">${n.label}</span>
    </a>
  `).join('')

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>${title} | Sovereign Orchestrator</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            sovereign: { 50:'#f5f3ff',100:'#ede9fe',200:'#ddd6fe',300:'#c4b5fd',400:'#a78bfa',500:'#8b5cf6',600:'#7c3aed',700:'#6d28d9',800:'#5b21b6',900:'#4c1d95' }
          }
        }
      }
    }
  </script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
    body { font-family: 'Inter', sans-serif; background: #0a0a0f; }
    .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.06); }
    .glass-card { background: rgba(255,255,255,0.04); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; }
    .glass-input { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 12px; padding: 10px 16px; transition: all 0.3s; }
    .glass-input:focus { outline: none; border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,0.15); }
    .glass-btn { background: linear-gradient(135deg, #7c3aed, #6d28d9); color: white; border: none; border-radius: 12px; padding: 10px 20px; font-weight: 600; cursor: pointer; transition: all 0.3s; }
    .glass-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 25px rgba(124,58,237,0.3); }
    .glass-btn-outline { background: transparent; border: 1px solid rgba(124,58,237,0.4); color: #a78bfa; border-radius: 12px; padding: 10px 20px; font-weight: 500; cursor: pointer; transition: all 0.3s; }
    .glass-btn-outline:hover { background: rgba(124,58,237,0.1); border-color: #7c3aed; }
    .glow-purple { box-shadow: 0 0 30px rgba(124,58,237,0.15); }
    .glow-green { box-shadow: 0 0 20px rgba(34,197,94,0.15); }
    .mono { font-family: 'JetBrains Mono', monospace; }
    .stat-value { font-size: 2rem; font-weight: 800; background: linear-gradient(135deg, #c4b5fd, #7c3aed); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; animation: pulse 2s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
    .sidebar { width: 260px; min-width: 260px; transition: all 0.3s; }
    @media (max-width: 768px) {
      .sidebar { position: fixed; left: -300px; top: 0; bottom: 0; z-index: 50; width: 280px; }
      .sidebar.open { left: 0; }
      .sidebar-label { display: inline; }
    }
    table { width: 100%; border-collapse: separate; border-spacing: 0; }
    th { text-align: left; padding: 12px 16px; color: #9ca3af; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid rgba(255,255,255,0.06); }
    td { padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.04); color: #d1d5db; font-size: 0.875rem; }
    tr:hover td { background: rgba(255,255,255,0.02); }
    .badge { display: inline-flex; align-items: center; padding: 2px 10px; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
    .badge-green { background: rgba(34,197,94,0.15); color: #4ade80; }
    .badge-yellow { background: rgba(234,179,8,0.15); color: #facc15; }
    .badge-red { background: rgba(239,68,68,0.15); color: #f87171; }
    .badge-purple { background: rgba(124,58,237,0.15); color: #a78bfa; }
    .badge-blue { background: rgba(59,130,246,0.15); color: #60a5fa; }
    .overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 40; }
    .overlay.active { display: block; }
    select.glass-input { appearance: none; background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e"); background-position: right 0.5rem center; background-repeat: no-repeat; background-size: 1.5em 1.5em; padding-right: 2.5rem; }
  </style>
</head>
<body class="text-white min-h-screen">
  <!-- Mobile overlay -->
  <div id="overlay" class="overlay" onclick="toggleSidebar()"></div>
  
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside id="sidebar" class="sidebar glass flex flex-col p-4 gap-1 overflow-y-auto">
      <div class="flex items-center gap-3 px-3 py-4 mb-4">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center shadow-lg">
          <i class="fas fa-crown text-yellow-300 text-sm"></i>
        </div>
        <div>
          <div class="font-bold text-sm text-white">Sovereign</div>
          <div class="text-[10px] text-purple-400 mono">PRIVATE ORCHESTRATOR</div>
        </div>
      </div>
      
      <div class="text-[10px] uppercase tracking-widest text-gray-600 px-4 mb-1">Orchestration</div>
      ${navItems}
      
      <div class="mt-auto pt-4 border-t border-white/5">
        <div class="flex items-center gap-2 px-4 py-2">
          <div class="pulse-dot"></div>
          <span class="text-xs text-green-400 mono">SYSTEM ONLINE</span>
        </div>
        <button onclick="logout()" class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all w-full">
          <i class="fas fa-right-from-bracket w-5 text-center"></i>
          <span class="sidebar-label">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-4 md:p-6 overflow-y-auto min-h-screen">
      <!-- Top Bar -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <button onclick="toggleSidebar()" class="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5">
            <i class="fas fa-bars"></i>
          </button>
          <div>
            <h1 class="text-xl font-bold text-white">${title}</h1>
            <p class="text-xs text-gray-500 mono">SOVEREIGN / ${title.toUpperCase()}</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="hidden md:flex items-center gap-2 glass-card px-3 py-2">
            <div class="pulse-dot"></div>
            <span class="text-xs mono text-gray-400">v1.0</span>
          </div>
        </div>
      </div>

      <!-- Page Content -->
      ${content}
    </main>
  </div>

  <script>
    const API = '';
    function getToken() { return localStorage.getItem('sovereign_token'); }
    function setToken(t) { localStorage.setItem('sovereign_token', t); }
    
    function checkAuth() {
      if (!getToken()) { window.location.href = '/login'; return false; }
      return true;
    }
    
    function logout() {
      localStorage.removeItem('sovereign_token');
      window.location.href = '/login';
    }
    
    function toggleSidebar() {
      document.getElementById('sidebar').classList.toggle('open');
      document.getElementById('overlay').classList.toggle('active');
    }
    
    async function apiFetch(path, opts = {}) {
      const token = getToken();
      const headers = { 'Content-Type': 'application/json', ...opts.headers };
      if (token) headers['Authorization'] = 'Bearer ' + token;
      
      const res = await fetch(API + path, { ...opts, headers });
      const data = await res.json();
      
      if (res.status === 401) { logout(); return null; }
      return data;
    }

    function formatRp(n) {
      return 'Rp ' + (n || 0).toLocaleString('id-ID');
    }
    
    function formatDate(d) {
      if (!d) return '-';
      return new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    }

    function showToast(msg, type = 'success') {
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 right-4 px-4 py-3 rounded-xl text-sm font-medium z-50 transition-all ' + 
        (type === 'success' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30');
      toast.textContent = msg;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }

    // Auth check on load
    if (window.location.pathname.startsWith('/app')) { checkAuth(); }
  </script>
</body>
</html>`
}
