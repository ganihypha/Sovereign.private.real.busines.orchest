// Login Page - PIN-based authentication
export function loginPage(): string {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>Login | Sovereign</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
    body { font-family: 'Inter', sans-serif; background: #0a0a0f; }
    .mono { font-family: 'JetBrains Mono', monospace; }
    .pin-dot { width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(124,58,237,0.4); transition: all 0.2s; }
    .pin-dot.filled { background: #7c3aed; border-color: #7c3aed; box-shadow: 0 0 12px rgba(124,58,237,0.5); }
    .pin-dot.error { border-color: #ef4444; background: #ef4444; }
    .keypad-btn { width: 72px; height: 72px; border-radius: 20px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: white; font-size: 1.5rem; font-weight: 600; cursor: pointer; transition: all 0.15s; display: flex; align-items: center; justify-content: center; }
    .keypad-btn:hover { background: rgba(124,58,237,0.15); border-color: rgba(124,58,237,0.3); }
    .keypad-btn:active { transform: scale(0.95); background: rgba(124,58,237,0.25); }
    .shake { animation: shake 0.4s ease-in-out; }
    @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); } }
    .grid-bg { background-image: linear-gradient(rgba(124,58,237,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.03) 1px, transparent 1px); background-size: 40px 40px; }
  </style>
</head>
<body class="text-white min-h-screen grid-bg flex items-center justify-center p-4">
  <div class="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-900/15 rounded-full blur-[100px]"></div>
  
  <div class="relative z-10 text-center">
    <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center mx-auto mb-6 shadow-lg">
      <i class="fas fa-lock text-purple-200 text-xl"></i>
    </div>
    
    <div class="mono text-[10px] text-purple-500 tracking-[0.2em] mb-1">SOVEREIGN ORCHESTRATOR</div>
    <h1 class="text-2xl font-bold mb-1">Founder Access</h1>
    <p class="text-gray-500 text-sm mb-8">Enter your master PIN</p>
    
    <!-- PIN Dots -->
    <div id="pinDots" class="flex justify-center gap-4 mb-8">
      <div class="pin-dot" id="dot0"></div>
      <div class="pin-dot" id="dot1"></div>
      <div class="pin-dot" id="dot2"></div>
      <div class="pin-dot" id="dot3"></div>
    </div>
    
    <div id="errorMsg" class="text-red-400 text-sm mb-4 h-5"></div>
    
    <!-- Keypad -->
    <div class="grid grid-cols-3 gap-3 justify-items-center max-w-[240px] mx-auto mb-6">
      <button class="keypad-btn" onclick="addDigit('1')">1</button>
      <button class="keypad-btn" onclick="addDigit('2')">2</button>
      <button class="keypad-btn" onclick="addDigit('3')">3</button>
      <button class="keypad-btn" onclick="addDigit('4')">4</button>
      <button class="keypad-btn" onclick="addDigit('5')">5</button>
      <button class="keypad-btn" onclick="addDigit('6')">6</button>
      <button class="keypad-btn" onclick="addDigit('7')">7</button>
      <button class="keypad-btn" onclick="addDigit('8')">8</button>
      <button class="keypad-btn" onclick="addDigit('9')">9</button>
      <div></div>
      <button class="keypad-btn" onclick="addDigit('0')">0</button>
      <button class="keypad-btn text-base" onclick="clearPin()"><i class="fas fa-delete-left"></i></button>
    </div>
    
    <p class="text-gray-700 text-xs mono">ENCRYPTED ACCESS</p>
  </div>

  <script>
    let pin = '';
    let attempts = 0;
    const maxAttempts = 5;
    
    // Check if already logged in
    if (localStorage.getItem('sovereign_token')) {
      window.location.href = '/app/dashboard';
    }
    
    function updateDots() {
      for (let i = 0; i < 4; i++) {
        const dot = document.getElementById('dot' + i);
        dot.classList.toggle('filled', i < pin.length);
        dot.classList.remove('error');
      }
    }
    
    function addDigit(d) {
      if (pin.length >= 4) return;
      pin += d;
      updateDots();
      
      if (pin.length === 4) {
        setTimeout(submitPin, 200);
      }
    }
    
    function clearPin() {
      pin = pin.slice(0, -1);
      updateDots();
    }
    
    async function submitPin() {
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pin })
        });
        const data = await res.json();
        
        if (data.success) {
          localStorage.setItem('sovereign_token', data.token);
          window.location.href = '/app/dashboard';
        } else {
          attempts++;
          document.getElementById('pinDots').classList.add('shake');
          for (let i = 0; i < 4; i++) {
            document.getElementById('dot' + i).classList.add('error');
          }
          document.getElementById('errorMsg').textContent = 
            attempts >= maxAttempts ? 'Access locked. Try again later.' : 'Invalid PIN. ' + (maxAttempts - attempts) + ' attempts left.';
          
          setTimeout(() => {
            pin = '';
            updateDots();
            document.getElementById('pinDots').classList.remove('shake');
          }, 600);
        }
      } catch (e) {
        document.getElementById('errorMsg').textContent = 'Connection error';
        pin = '';
        updateDots();
      }
    }
    
    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (e.key >= '0' && e.key <= '9') addDigit(e.key);
      if (e.key === 'Backspace') clearPin();
    });
  </script>
</body>
</html>`
}
