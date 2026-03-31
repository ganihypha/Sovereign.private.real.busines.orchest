// Landing Page - Sovereign Business Engine v2.0
export function landingPage(): string {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>Sovereign Business Engine</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');
    body { font-family: 'Inter', sans-serif; background: #0a0a0f; overflow-x: hidden; }
    .mono { font-family: 'JetBrains Mono', monospace; }
    .glow { animation: glow 3s ease-in-out infinite; }
    @keyframes glow { 0%, 100% { box-shadow: 0 0 40px rgba(124,58,237,0.2); } 50% { box-shadow: 0 0 80px rgba(124,58,237,0.4); } }
    .float { animation: float 6s ease-in-out infinite; }
    @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
    .grid-bg { background-image: linear-gradient(rgba(124,58,237,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.03) 1px, transparent 1px); background-size: 40px 40px; }
    .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.06); }
  </style>
</head>
<body class="text-white min-h-screen grid-bg">
  <div class="min-h-screen flex flex-col items-center justify-center p-6 relative">
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px]"></div>
    
    <div class="relative z-10 text-center max-w-3xl">
      <!-- Logo -->
      <div class="float mb-8 inline-block">
        <div class="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 flex items-center justify-center shadow-2xl glow mx-auto">
          <i class="fas fa-crown text-yellow-300 text-3xl"></i>
        </div>
      </div>

      <div class="mono text-xs text-purple-400 tracking-[0.3em] mb-2">SOVEREIGN BUSINESS ENGINE</div>
      <div class="mono text-[10px] text-gray-600 tracking-[0.2em] mb-4">MARKET VALIDATED DATA ORCHESTRATOR</div>
      <h1 class="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
        Business Engine v2.0
      </h1>
      <p class="text-gray-400 text-lg mb-2">Real Business. Real Data. Real Market Validation.</p>
      <p class="text-gray-600 text-sm mb-10 mono">3-LAYER VALIDATION SYSTEM | BUSINESS ENGINEERING</p>

      <!-- 3 Validation Layer Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="glass rounded-2xl p-5 text-left border-t-2 border-purple-500">
          <div class="text-purple-400 text-2xl mb-2"><i class="fas fa-store"></i></div>
          <div class="font-bold text-sm text-white">Demand Validation</div>
          <div class="text-xs text-gray-500 mono">@fashionkas.official</div>
          <div class="text-xs text-purple-300 mt-2">Product-Market Fit Proof</div>
        </div>
        <div class="glass rounded-2xl p-5 text-left border-t-2 border-green-500">
          <div class="text-green-400 text-2xl mb-2"><i class="fas fa-rocket"></i></div>
          <div class="font-bold text-sm text-white">System Validation</div>
          <div class="text-xs text-gray-500 mono">@resellerkas.official</div>
          <div class="text-xs text-green-300 mt-2">Scale & Growth Proof</div>
        </div>
        <div class="glass rounded-2xl p-5 text-left border-t-2 border-yellow-500">
          <div class="text-yellow-400 text-2xl mb-2"><i class="fas fa-user-tie"></i></div>
          <div class="font-bold text-sm text-white">Trust Validation</div>
          <div class="text-xs text-gray-500 mono">@haidar_faras_m</div>
          <div class="text-xs text-yellow-300 mt-2">Authority & Social Proof</div>
        </div>
      </div>

      <!-- Engineering Stack -->
      <div class="glass rounded-2xl p-4 mb-8 max-w-xl mx-auto">
        <div class="mono text-[10px] text-gray-500 tracking-widest mb-3">ORCHESTRATION ENGINEERING STACK</div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <div class="p-2 rounded-xl bg-purple-500/5">
            <i class="fas fa-brain text-purple-400 mb-1"></i>
            <div class="text-[10px] text-gray-400">Intelligence</div>
          </div>
          <div class="p-2 rounded-xl bg-green-500/5">
            <i class="fas fa-message text-green-400 mb-1"></i>
            <div class="text-[10px] text-gray-400">Communication</div>
          </div>
          <div class="p-2 rounded-xl bg-blue-500/5">
            <i class="fas fa-database text-blue-400 mb-1"></i>
            <div class="text-[10px] text-gray-400">Data Layer</div>
          </div>
          <div class="p-2 rounded-xl bg-yellow-500/5">
            <i class="fas fa-flask-vial text-yellow-400 mb-1"></i>
            <div class="text-[10px] text-gray-400">Validation</div>
          </div>
        </div>
      </div>

      <a href="/login" class="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-900/40">
        <i class="fas fa-fingerprint"></i>
        Access Engine
      </a>

      <p class="mt-6 text-gray-700 text-xs mono">FOUNDER ACCESS ONLY | SOVEREIGN ENGINEER</p>
    </div>
  </div>
</body>
</html>`
}
