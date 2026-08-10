<template>
  <div class="min-h-screen bg-[#0d0e12] text-[#e2e4e9] flex flex-col font-sans selection:bg-white/10 selection:text-white">
    <!-- Editorial Navigation Header -->
    <header class="border-b border-white/10 bg-[#0d0e12]/90 backdrop-blur-md sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <!-- Brand identity -->
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-white text-slate-950 flex items-center justify-center font-bold text-xs tracking-tighter">
            3D
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="font-bold text-sm tracking-tight text-white font-sans">3D Studio Console</h1>
              <span class="px-2 py-0.5 rounded-full badge-pastel-blue text-[10px] font-code uppercase tracking-widest font-semibold">
                Admin v2.0
              </span>
            </div>
            <p class="text-[11px] text-slate-400 font-sans hidden sm:block">3D Modellar Boshqaruvi va Monitoring Paneli</p>
          </div>
        </div>

        <!-- System Status & Action links -->
        <div class="flex items-center gap-4">
          <!-- Status Badge -->
          <div class="hidden md:flex items-center gap-2 px-3 py-1 rounded-full badge-pastel-green text-xs font-semibold">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span class="font-code text-[11px] uppercase tracking-wider">System Active</span>
          </div>

          <!-- Public site link -->
          <a 
            href="http://localhost:3000" 
            target="_blank"
            class="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 hover:text-white border border-white/10 transition flex items-center gap-1.5"
          >
            <span>Foydalanuvchi Sayti</span>
            <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path>
            </svg>
          </a>

          <!-- Logout Button -->
          <button 
            @click="handleLogout"
            class="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-medium transition flex items-center gap-1.5"
            title="Tizimdan chiqish"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H2.25"></path>
            </svg>
            <span>Chiqish</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Container Slot -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Editorial Footer -->
    <footer class="border-t border-white/5 py-8 px-6">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <div>
          <span class="font-semibold text-slate-300 font-sans">3D Studio Admin</span> • Barcha huquqlar himoyalangan
        </div>
        <div class="flex items-center gap-4 font-code text-[11px]">
          <span>Server: <strong class="text-slate-200">http://localhost:5000</strong></span>
          <span>•</span>
          <span>Nuxt 4 Engine</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const authCookie = useCookie('admin_auth');

const handleLogout = () => {
  authCookie.value = null;
  navigateTo('/login');
};
</script>
