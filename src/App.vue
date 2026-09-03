<template>
  <div class="flex flex-col md:flex-row h-screen bg-slate-50 font-sans overflow-hidden">
    <!-- Header Mobile -->
    <header class="flex md:hidden justify-between items-center px-4 py-3 bg-white border-b border-slate-100 shrink-0">
      <h2 class="text-md font-black text-slate-950 tracking-tight flex items-center gap-1">
        💧 <span class="text-emerald-600">SGA</span>-LETA Saneago
      </h2>
    </header>

    <!-- Sidebar Desktop -->
    <aside class="hidden md:flex w-64 bg-white border-r border-slate-100 flex-col justify-between p-6 shrink-0">
      <div>
        <div class="mb-8 px-2">
          <h2 class="text-lg font-black text-slate-950 tracking-tight flex items-center gap-2">
            💧 <span class="text-emerald-600">SGA</span>-LETA
          </h2>
          <p class="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1">Conformidade & ESG Saneago</p>
        </div>

        <nav class="space-y-1">
          <router-link 
            to="/dashboard" 
            class="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all"
            active-class="bg-emerald-50 text-emerald-700 font-extrabold"
            inactive-class="text-slate-500 hover:bg-slate-50 hover:text-slate-800"
          >
            📊 Painel de Conformidade
          </router-link>

          <router-link 
            to="/lotes" 
            class="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all"
            active-class="bg-emerald-50 text-emerald-700 font-extrabold"
            inactive-class="text-slate-500 hover:bg-slate-50 hover:text-slate-800"
          >
            📋 Lotes & Laudos CONAMA
          </router-link>

          <router-link 
            to="/tracking" 
            class="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all"
            active-class="bg-emerald-50 text-emerald-700 font-extrabold"
            inactive-class="text-slate-500 hover:bg-slate-50 hover:text-slate-800"
          >
            🚚 Rastreamento & MTR
          </router-link>

          <router-link 
            to="/simulador" 
            class="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all"
            active-class="bg-emerald-50 text-emerald-700 font-extrabold"
            inactive-class="text-slate-500 hover:bg-slate-50 hover:text-slate-800"
          >
            🌱 Viabilidade & Carbono
          </router-link>
        </nav>
      </div>

      <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500">
        <p class="font-bold text-slate-700">Ambiente de Auditoria</p>
        <p class="text-[10px] text-slate-400">ISO 14001 / PNRS 12.305</p>
      </div>
    </aside>

    <main class="flex-1 h-full overflow-y-auto bg-slate-50 pb-20 md:pb-0">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>