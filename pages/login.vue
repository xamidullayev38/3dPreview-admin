<template>
  <div class="min-h-screen bg-[#0d0e12] text-[#e2e4e9] flex flex-col justify-center items-center px-6 py-12 relative font-sans">
    <!-- Subtle Background Grid Pattern -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

    <!-- Login Card -->
    <div class="w-full max-w-sm minimal-card p-8 relative z-10">
      <!-- Header -->
      <div class="mb-8 text-center">
        <div class="w-10 h-10 rounded-xl bg-white text-slate-950 flex items-center justify-center font-bold text-sm mx-auto mb-4 font-sans tracking-tighter shadow-md">
          3D
        </div>
        <h1 class="text-3xl font-editorial font-normal text-white tracking-tight">
          Admin Paneli
        </h1>
        <p class="text-xs text-slate-400 mt-1 font-sans">
          Tizimga kirish uchun login va parolni kiriting
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-xs font-code text-slate-400 uppercase tracking-wider mb-2">
            Login
          </label>
          <input 
            v-model="login"
            type="text"
            required
            placeholder="admin"
            class="w-full px-4 py-2.5 minimal-input text-xs transition font-sans placeholder:text-slate-600"
          />
        </div>

        <div>
          <label class="block text-xs font-code text-slate-400 uppercase tracking-wider mb-2">
            Parol
          </label>
          <input 
            v-model="password"
            type="password"
            required
            placeholder="••••••••"
            class="w-full px-4 py-2.5 minimal-input text-xs transition font-sans placeholder:text-slate-600"
          />
        </div>

        <!-- Error feedback -->
        <div v-if="errorMessage" class="p-3 rounded-lg badge-pastel-rose text-xs font-medium text-center font-sans">
          {{ errorMessage }}
        </div>

        <!-- Submit Button -->
        <button 
          type="submit"
          :disabled="isSubmitting"
          class="w-full py-2.5 rounded-lg bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs tracking-tight transition active:scale-[0.98] disabled:opacity-50 mt-2"
        >
          {{ isSubmitting ? 'Kirilmoqda...' : 'Tizimga Kirish' }}
        </button>
      </form>

      <!-- Default Credentials Helper -->
      <div class="mt-8 pt-6 border-t border-white/5 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#090a0d] border border-white/5 text-[11px] text-slate-400 font-code">
          <span>Login: <strong class="text-slate-200">admin</strong></span>
          <span>•</span>
          <span>Parol: <strong class="text-slate-200">admin123</strong></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

definePageMeta({
  layout: false // Hide standard admin layout on login page
});

const login = ref('');
const password = ref('');
const errorMessage = ref('');
const isSubmitting = ref(false);

const authCookie = useCookie('admin_auth', {
  maxAge: 60 * 60 * 24 * 7 // 7 days expiration
});

const handleLogin = () => {
  isSubmitting.value = true;
  errorMessage.value = '';

  setTimeout(() => {
    // Simple authentication check
    if (login.value.trim() === 'admin' && password.value === 'admin123') {
      authCookie.value = 'true';
      navigateTo('/');
    } else {
      errorMessage.value = 'Login yoki parol noto\'g\'ri!';
    }
    isSubmitting.value = false;
  }, 400);
};
</script>
