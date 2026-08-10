<template>
  <div class="max-w-7xl mx-auto px-6 py-12">
    <!-- Toast Notification Banner -->
    <Transition name="fade">
      <div 
        v-if="toastMessage" 
        class="fixed top-20 right-6 z-50 px-4 py-2.5 rounded-lg minimal-card border border-slate-700 shadow-xl flex items-center gap-3 text-xs font-semibold text-white"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        <span>{{ toastMessage }}</span>
      </div>
    </Transition>

    <!-- Editorial Hero Header -->
    <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
      <div>
        <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full badge-pastel-blue text-[10px] font-code uppercase tracking-widest font-semibold mb-3">
          Console Overview
        </div>
        <h1 class="text-4xl sm:text-5xl font-editorial text-white tracking-tight leading-tight">
          3D Modellar Boshqaruvi
        </h1>
        <p class="text-slate-400 text-sm mt-2 max-w-xl leading-relaxed">
          Platformadagi barcha .GLB/.GLTF ob'ektlarini boshqaring, ularni 360° ko'rinishda nazorat qiling hamda yangi fayllarni joylang.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <button 
          @click="refresh"
          class="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition"
          title="Yangilash"
        >
          <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
            <path stroke-linecap="round" stroke-linejoin="round" d="M160 80v48M160 80H112m48 0L96 144m-48 64v-48m0 48h48m-48 0l64-64"></path>
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
        </button>

        <button 
          @click="openUploadModal"
          class="px-5 py-2.5 rounded-lg bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs tracking-tight transition active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <svg class="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
          </svg>
          Yangi Model Qo'shish
        </button>
      </div>
    </div>

    <!-- Minimalist Asymmetric Bento Grid Metrics -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      <!-- Card 1: Total Models -->
      <div class="minimal-card p-6 flex flex-col justify-between">
        <div class="flex items-center justify-between mb-4">
          <span class="text-xs font-code text-slate-400 uppercase tracking-widest">Jami Modellar</span>
          <span class="px-2 py-0.5 rounded badge-pastel-blue text-[10px] font-code font-bold">.GLB</span>
        </div>
        <div class="flex items-baseline gap-2">
          <h3 class="text-3xl font-code font-bold text-white">{{ models?.length || 0 }}</h3>
          <span class="text-xs text-slate-400 font-sans">birlik</span>
        </div>
        <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-code">
          <span>Status</span>
          <span class="text-emerald-400">100% Ready</span>
        </div>
      </div>

      <!-- Card 2: Total Storage -->
      <div class="minimal-card p-6 flex flex-col justify-between">
        <div class="flex items-center justify-between mb-4">
          <span class="text-xs font-code text-slate-400 uppercase tracking-widest">Xotira Hajmi</span>
          <span class="px-2 py-0.5 rounded badge-pastel-amber text-[10px] font-code font-bold">DISK</span>
        </div>
        <div class="flex items-baseline gap-2">
          <h3 class="text-3xl font-code font-bold text-white">{{ totalStorageSize }}</h3>
          <span class="text-xs text-slate-400 font-code">MB</span>
        </div>
        <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-code">
          <span>Formatlar</span>
          <span class="text-slate-300">GLB / GLTF</span>
        </div>
      </div>

      <!-- Card 3: API Status -->
      <div class="minimal-card p-6 flex flex-col justify-between">
        <div class="flex items-center justify-between mb-4">
          <span class="text-xs font-code text-slate-400 uppercase tracking-widest">API Server</span>
          <span class="px-2 py-0.5 rounded badge-pastel-green text-[10px] font-code font-bold">LIVE</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
          <h3 class="text-2xl font-code font-bold text-emerald-400">ONLINE</h3>
        </div>
        <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-code">
          <span>Port</span>
          <span class="text-slate-300">:5000</span>
        </div>
      </div>

      <!-- Card 4: Engine Tech -->
      <div class="minimal-card p-6 flex flex-col justify-between">
        <div class="flex items-center justify-between mb-4">
          <span class="text-xs font-code text-slate-400 uppercase tracking-widest">3D Rendering</span>
          <span class="px-2 py-0.5 rounded badge-pastel-blue text-[10px] font-code font-bold">WEBGL</span>
        </div>
        <div class="flex items-baseline gap-2">
          <h3 class="text-2xl font-code font-bold text-white">Model-Viewer</h3>
        </div>
        <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-code">
          <span>Versiya</span>
          <span class="text-slate-300">v3.4.0</span>
        </div>
      </div>
    </div>

    <!-- Controls Bar: Search & View Switcher -->
    <div class="minimal-card p-3 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="relative w-full md:w-96">
        <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
        </svg>
        <input 
          v-model="searchQuery"
          type="text"
          placeholder="Model nomi yoki tavsifidan izlash..."
          class="w-full pl-10 pr-4 py-2 minimal-input text-xs placeholder:text-slate-400 transition font-sans"
        />
      </div>

      <div class="flex items-center justify-between w-full md:w-auto gap-4">
        <div class="flex items-center gap-2">
          <span class="text-xs text-slate-400 font-code">Natija:</span>
          <span class="px-2 py-0.5 rounded bg-white/5 text-slate-200 text-xs font-code font-bold border border-white/10">
            {{ filteredModels.length }}
          </span>
        </div>

        <div class="flex items-center gap-1 bg-[#0d0e12] p-1 rounded-lg border border-white/10">
          <button 
            @click="viewMode = 'grid'"
            :class="viewMode === 'grid' ? 'bg-white/10 text-white border-white/20' : 'text-slate-400 hover:text-white border-transparent'"
            class="px-3 py-1 rounded text-xs font-medium border transition flex items-center gap-1.5"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"></path>
            </svg>
            Grid
          </button>
          <button 
            @click="viewMode = 'table'"
            :class="viewMode === 'table' ? 'bg-white/10 text-white border-white/20' : 'text-slate-400 hover:text-white border-transparent'"
            class="px-3 py-1 rounded text-xs font-medium border transition flex items-center gap-1.5"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5m-16.5-7.5h16.5m-16.5-3.75h16.5"></path>
            </svg>
            Jadval
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="minimal-card p-16 text-center">
      <p class="text-xs font-code text-slate-400">Modellar yuklanmoqda...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredModels.length === 0" class="minimal-card p-16 text-center">
      <h3 class="text-xl font-editorial text-white font-normal">Hech qanday model topilmadi</h3>
      <p class="text-slate-400 text-xs mt-1 max-w-sm mx-auto font-sans">Izlangan so'rov bo'yicha hech qanday fayl topilmadi.</p>
      <button 
        @click="openUploadModal"
        class="mt-6 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium text-xs border border-white/10 transition inline-flex items-center gap-2"
      >
        Yangi model qo'shish
      </button>
    </div>

    <!-- VIEW MODE 1: GRID -->
    <div v-else-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="model in filteredModels" 
        :key="model.id"
        class="minimal-card p-6 flex flex-col justify-between group relative"
      >
        <div>
          <div class="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 class="text-base font-bold text-white group-hover:text-cyan-300 transition font-sans line-clamp-1">
                {{ model.name }}
              </h3>
              <div class="flex items-center gap-2 mt-1">
                <span class="px-2 py-0.5 rounded badge-pastel-blue text-[10px] font-code font-semibold">.GLB</span>
                <span class="text-[11px] text-slate-400 font-code">{{ formatSize(model.fileSize) }}</span>
              </div>
            </div>
            <span class="text-[11px] text-slate-400 font-code">{{ formatDate(model.createdAt) }}</span>
          </div>

          <p class="text-xs text-slate-400 line-clamp-2 mb-6 min-h-[2.5rem] leading-relaxed">
            {{ model.description || 'Tavsif ko\'rsatilmadi' }}
          </p>
        </div>

        <div class="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <button 
              @click="openInspectModal(model)"
              class="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/10 transition flex items-center gap-1.5"
            >
              <svg class="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 123c.516-5.114 4.545-9.143 9.658-9.658L12 12m-9.964.036L12 12m9.964.036c-.516 5.114-4.545 9.143-9.658 9.658L12 12m9.964-.036L12 12"></path>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              3D View
            </button>

            <button 
              @click="openEditModal(model)"
              class="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5 transition"
              title="Tahrirlash"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path>
              </svg>
            </button>
          </div>

          <div class="flex items-center gap-1.5">
            <button 
              @click="copyViewerLink(model.id)"
              class="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5 transition"
              title="Havolani nusxalash"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v9.25c0 .621-.504 1.125-1.125 1.125z"></path>
              </svg>
            </button>

            <button 
              @click="deleteModel(model.id)"
              class="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition"
              title="O'chirish"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- VIEW MODE 2: TABLE -->
    <div v-else class="minimal-card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-white/10 bg-[#0f1014] text-slate-400 text-xs font-code uppercase tracking-wider">
              <th class="py-3.5 px-6">Model</th>
              <th class="py-3.5 px-6">Tavsif</th>
              <th class="py-3.5 px-6">Hajmi</th>
              <th class="py-3.5 px-6">Sana</th>
              <th class="py-3.5 px-6 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5 text-xs text-slate-300">
            <tr v-for="model in filteredModels" :key="model.id" class="hover:bg-white/[0.02] transition">
              <td class="py-4 px-6 font-bold text-white flex items-center gap-3">
                <span class="px-2 py-0.5 rounded badge-pastel-blue text-[10px] font-code font-bold">GLB</span>
                <span>{{ model.name }}</span>
              </td>
              <td class="py-4 px-6 max-w-xs truncate text-slate-400 font-sans">
                {{ model.description || '—' }}
              </td>
              <td class="py-4 px-6 font-code text-slate-400">
                {{ formatSize(model.fileSize) }}
              </td>
              <td class="py-4 px-6 text-slate-400 font-code">
                {{ formatDate(model.createdAt) }}
              </td>
              <td class="py-4 px-6 text-right space-x-2">
                <button 
                  @click="openInspectModal(model)"
                  class="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition inline-flex items-center gap-1"
                >
                  3D View
                </button>
                <button 
                  @click="openEditModal(model)"
                  class="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 font-medium text-xs transition inline-flex items-center gap-1 border border-white/5"
                >
                  Tahrirlash
                </button>
                <button 
                  @click="deleteModel(model.id)"
                  class="px-2.5 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-medium text-xs transition inline-flex items-center gap-1 border border-rose-500/20"
                >
                  O'chirish
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL 1: UPLOAD MODAL -->
    <div v-if="showUploadModal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="minimal-card w-full max-w-lg p-6 sm:p-8 relative">
        <button 
          @click="showUploadModal = false" 
          class="absolute top-6 right-6 text-slate-400 hover:text-white transition"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <h3 class="text-2xl font-editorial text-white font-normal mb-1">Yangi 3D Model Yuklash</h3>
        <p class="text-slate-400 text-xs mb-6 font-code">.GLB / .GLTF faylini tanlang</p>

        <form @submit.prevent="handleUpload" class="space-y-4">
          <div>
            <label class="block text-xs font-code text-slate-400 uppercase tracking-wider mb-2">
              Model Nomi *
            </label>
            <input 
              v-model="form.name" 
              type="text" 
              required 
              placeholder="Masalan: Architectural Chair"
              class="w-full px-4 py-2.5 minimal-input text-xs transition font-sans"
            />
          </div>

          <div>
            <label class="block text-xs font-code text-slate-400 uppercase tracking-wider mb-2">
              Tavsif (Ixtiyoriy)
            </label>
            <textarea 
              v-model="form.description" 
              rows="3" 
              placeholder="Model haqida va xarakteristikalari..."
              class="w-full px-4 py-2.5 minimal-input text-xs transition resize-none font-sans"
            ></textarea>
          </div>

          <div>
            <label class="block text-xs font-code text-slate-400 uppercase tracking-wider mb-2">
              3D Fayli (.GLB / .GLTF) *
            </label>
            <div class="border border-dashed border-white/20 rounded-lg p-6 text-center bg-[#0d0e12] transition hover:border-white/40">
              <input 
                type="file" 
                ref="fileInput" 
                accept=".glb,.gltf" 
                required 
                @change="onFileSelected"
                class="hidden" 
                id="glbFileInput"
              />
              <label for="glbFileInput" class="cursor-pointer flex flex-col items-center">
                <svg class="w-8 h-8 text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"></path>
                </svg>
                <span class="text-xs font-semibold text-slate-200">
                  {{ selectedFileName || 'Faylni tanlash uchun bosing' }}
                </span>
                <span class="text-[10px] text-slate-400 mt-1 font-code">Maksimal: 100MB</span>
              </label>
            </div>
          </div>

          <!-- Visual Upload Progress Bar -->
          <div v-if="isUploading" class="space-y-2 pt-2">
            <div class="flex items-center justify-between text-xs font-code">
              <span class="text-slate-400 font-medium">Jarayon:</span>
              <span class="text-emerald-400 font-bold font-code">{{ uploadProgressPercent }}%</span>
            </div>
            <div class="w-full h-2.5 rounded-full bg-[#090a0d] border border-white/10 overflow-hidden relative">
              <div 
                class="h-full bg-emerald-400 transition-all duration-300 rounded-full"
                :style="{ width: uploadProgressPercent + '%' }"
              ></div>
            </div>
            <div v-if="uploadProgressDetail" class="text-[10px] text-slate-400 font-code text-right">
              {{ uploadProgressDetail }}
            </div>
          </div>

          <div v-if="uploadStatusMessage" :class="isSuccess ? 'text-emerald-400' : 'text-rose-400'" class="text-xs font-semibold text-center py-1 font-code">
            {{ uploadStatusMessage }}
          </div>

          <div class="pt-2 flex gap-3">
            <button 
              type="button" 
              @click="showUploadModal = false" 
              class="w-1/2 py-2.5 rounded-lg border border-white/10 text-slate-300 font-medium text-xs hover:bg-white/5 transition"
            >
              Bekor qilish
            </button>
            <button 
              type="submit" 
              :disabled="isUploading"
              class="w-1/2 py-2.5 rounded-lg bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs transition active:scale-[0.98] disabled:opacity-50"
            >
              {{ isUploading ? 'Yuklanmoqda...' : 'Saqlash' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL 2: 3D MODEL INSPECTOR -->
    <div v-if="showInspectModal" class="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div class="minimal-card w-full max-w-4xl rounded-xl overflow-hidden flex flex-col h-[80vh] relative">
        <div class="p-4 border-b border-white/10 flex items-center justify-between bg-[#0f1014]">
          <div class="flex items-center gap-3">
            <span class="px-2 py-0.5 rounded badge-pastel-blue text-[10px] font-code font-bold">3D</span>
            <div>
              <h3 class="text-base font-bold text-white font-sans">{{ activeInspectModel?.name }}</h3>
              <p class="text-slate-400 text-xs font-code">
                {{ formatSize(activeInspectModel?.fileSize) }} • Inspector Viewport
              </p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <a 
              :href="`http://localhost:3000/models/${activeInspectModel?.id}`"
              target="_blank"
              class="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/10 transition flex items-center gap-1.5"
            >
              <span>Saytda ochish</span>
              <svg class="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path>
              </svg>
            </a>
            <button 
              @click="showInspectModal = false"
              class="p-1.5 rounded text-slate-400 hover:text-white bg-white/5 transition"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <div class="flex-grow bg-[#090a0d] relative flex items-center justify-center overflow-hidden">
          <model-viewer
            v-if="activeInspectModel"
            :src="getFullUrl(activeInspectModel.fileUrl)"
            alt="3D Model"
            auto-rotate
            camera-controls
            shadow-intensity="1"
            touch-action="pan-y"
            class="w-full h-full"
          >
          </model-viewer>

          <!-- Keystroke help -->
          <div class="absolute bottom-4 left-4 flex items-center gap-2">
            <kbd>LMB</kbd><span class="text-[11px] text-slate-400 font-code">Rotate</span>
            <kbd>Scroll</kbd><span class="text-[11px] text-slate-400 font-code">Zoom</span>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL 3: EDIT MODAL -->
    <div v-if="showEditModal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="minimal-card w-full max-w-md p-6 sm:p-8 relative">
        <button 
          @click="showEditModal = false" 
          class="absolute top-6 right-6 text-slate-400 hover:text-white transition"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <h3 class="text-2xl font-editorial text-white font-normal mb-1">Modelni Tahrirlash</h3>
        <p class="text-slate-400 text-xs mb-6 font-code">ID: {{ editForm.id }}</p>

        <form @submit.prevent="handleEditSave" class="space-y-4">
          <div>
            <label class="block text-xs font-code text-slate-400 uppercase tracking-wider mb-2">
              Model Nomi
            </label>
            <input 
              v-model="editForm.name" 
              type="text" 
              required 
              class="w-full px-4 py-2.5 minimal-input text-xs transition font-sans"
            />
          </div>

          <div>
            <label class="block text-xs font-code text-slate-400 uppercase tracking-wider mb-2">
              Tavsif
            </label>
            <textarea 
              v-model="editForm.description" 
              rows="3" 
              class="w-full px-4 py-2.5 minimal-input text-xs transition resize-none font-sans"
            ></textarea>
          </div>

          <div class="pt-2 flex gap-3">
            <button 
              type="button" 
              @click="showEditModal = false" 
              class="w-1/2 py-2.5 rounded-lg border border-white/10 text-slate-300 font-medium text-xs hover:bg-white/5 transition"
            >
              Bekor qilish
            </button>
            <button 
              type="submit" 
              :disabled="isEditing"
              class="w-1/2 py-2.5 rounded-lg bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs transition active:scale-[0.98] disabled:opacity-50"
            >
              {{ isEditing ? 'Saqlanmoqda...' : 'Saqlash' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const config = useRuntimeConfig();

// UI States
const viewMode = ref('grid');
const searchQuery = ref('');
const toastMessage = ref('');

const showUploadModal = ref(false);
const showInspectModal = ref(false);
const showEditModal = ref(false);

const activeInspectModel = ref(null);

const selectedFile = ref(null);
const selectedFileName = ref('');
const isUploading = ref(false);
const uploadProgressPercent = ref(0);
const uploadProgressDetail = ref('');
const uploadStatusMessage = ref('');
const isSuccess = ref(false);

const form = ref({
  name: '',
  description: ''
});

const editForm = ref({
  id: '',
  name: '',
  description: ''
});
const isEditing = ref(false);

// Fetch Data
const { data: models, pending, refresh } = await useFetch(`${config.public.apiBase}/api/models`, {
  default: () => []
});

// Computed Properties
const filteredModels = computed(() => {
  if (!models.value) return [];
  if (!searchQuery.value.trim()) return models.value;
  const q = searchQuery.value.toLowerCase();
  return models.value.filter(m => 
    m.name?.toLowerCase().includes(q) || 
    m.description?.toLowerCase().includes(q)
  );
});

const totalStorageSize = computed(() => {
  if (!models.value || models.value.length === 0) return '0.00';
  const totalBytes = models.value.reduce((acc, m) => acc + (m.fileSize || 0), 0);
  return (totalBytes / 1024 / 1024).toFixed(2);
});

// Toast helper
const showToast = (msg) => {
  toastMessage.value = msg;
  setTimeout(() => {
    toastMessage.value = '';
  }, 3000);
};

// Utilities
const formatSize = (bytes) => {
  if (!bytes) return '0.00 MB';
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
};

const formatDate = (dateStr) => {
  if (!dateStr) return 'Noma\'lum';
  return new Date(dateStr).toLocaleDateString('uz-UZ');
};

const getFullUrl = (pathStr) => {
  if (!pathStr) return '';
  if (pathStr.startsWith('http')) return pathStr;
  return `${config.public.apiBase}${pathStr}`;
};

const copyViewerLink = (id) => {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const url = `${origin}/models/${id}`;
  navigator.clipboard.writeText(url);
  showToast("Havola buferga nusxalandi");
};

// Handlers
const openUploadModal = () => {
  form.value = { name: '', description: '' };
  selectedFile.value = null;
  selectedFileName.value = '';
  uploadStatusMessage.value = '';
  uploadProgressPercent.value = 0;
  uploadProgressDetail.value = '';
  showUploadModal.value = true;
};

const onFileSelected = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    selectedFileName.value = file.name;
    if (!form.value.name) {
      form.value.name = file.name.replace(/\.[^/.]+$/, "");
    }
  }
};

const handleUpload = async () => {
  const file = selectedFile.value;
  if (!file) {
    uploadStatusMessage.value = 'Iltimos, GLB faylini tanlang';
    isSuccess.value = false;
    return;
  }

  isUploading.value = true;
  uploadStatusMessage.value = '';
  uploadProgressPercent.value = 0;
  uploadProgressDetail.value = '';

  try {
    const chunkSize = 2 * 1024 * 1024; // 2MB per chunk (well below 4.5MB Vercel limit)
    if (file.size > chunkSize) {
      // Chunked Upload for larger GLB files
      const totalChunks = Math.ceil(file.size / chunkSize);
      const uploadId = `up-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

      for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = Math.min(file.size, start + chunkSize);
        const chunk = file.slice(start, end);

        const formData = new FormData();
        formData.append('uploadId', uploadId);
        formData.append('chunkIndex', i.toString());
        formData.append('totalChunks', totalChunks.toString());
        formData.append('name', form.value.name);
        formData.append('description', form.value.description);
        formData.append('originalName', file.name);
        formData.append('glbFile', chunk, file.name);

        const progress = Math.round(((i + 1) / totalChunks) * 100);
        uploadProgressPercent.value = progress;
        uploadProgressDetail.value = `${(end / 1024 / 1024).toFixed(1)} MB / ${(file.size / 1024 / 1024).toFixed(1)} MB • Chunk ${i + 1}/${totalChunks}`;
        uploadStatusMessage.value = `Yuklanmoqda... ${progress}% (${i + 1}/${totalChunks})`;

        await $fetch(`${config.public.apiBase}/api/models/upload-chunk`, {
          method: 'POST',
          body: formData
        });
      }
    } else {
      // Standard single request for small files (< 2MB)
      uploadProgressPercent.value = 50;
      uploadProgressDetail.value = `${(file.size / 1024 / 1024).toFixed(2)} MB`;
      uploadStatusMessage.value = 'Yuklanmoqda... 50%';

      const formData = new FormData();
      formData.append('name', form.value.name);
      formData.append('description', form.value.description);
      formData.append('glbFile', file);

      await $fetch(`${config.public.apiBase}/api/models`, {
        method: 'POST',
        body: formData
      });
      uploadProgressPercent.value = 100;
    }

    isSuccess.value = true;
    uploadProgressPercent.value = 100;
    uploadStatusMessage.value = 'Model muvaffaqiyatli saqlandi!';
    showToast("Yangi 3D model yuklandi");
    
    setTimeout(() => {
      showUploadModal.value = false;
      form.value = { name: '', description: '' };
      selectedFile.value = null;
      selectedFileName.value = '';
      uploadStatusMessage.value = '';
      uploadProgressPercent.value = 0;
      uploadProgressDetail.value = '';
      refresh();
    }, 800);
  } catch (err) {
    console.error(err);
    isSuccess.value = false;
    uploadStatusMessage.value = err.data?.message || 'Yuklashda xatolik yuz berdi.';
  } finally {
    isUploading.value = false;
  }
};

const openInspectModal = (model) => {
  activeInspectModel.value = model;
  showInspectModal.value = true;
};

const openEditModal = (model) => {
  editForm.value = {
    id: model.id,
    name: model.name,
    description: model.description || ''
  };
  showEditModal.value = true;
};

const handleEditSave = async () => {
  isEditing.value = true;
  try {
    await $fetch(`${config.public.apiBase}/api/models/${editForm.value.id}`, {
      method: 'PUT',
      body: {
        name: editForm.value.name,
        description: editForm.value.description
      }
    });

    showToast("Model ma'lumotlari yangilandi");
    showEditModal.value = false;
    refresh();
  } catch (err) {
    alert("Yangilashda xatolik: " + (err.data?.message || err.message));
  } finally {
    isEditing.value = false;
  }
};

const deleteModel = async (id) => {
  if (!confirm('Haqiqatan ham ushbu modelni o\'chirmoqchimisiz?')) return;

  try {
    await $fetch(`${config.public.apiBase}/api/models/${id}`, {
      method: 'DELETE'
    });
    showToast("Model o'chirildi");
    refresh();
  } catch (err) {
    alert('O\'chirishda xatolik yuz berdi: ' + (err.data?.message || err.message));
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
