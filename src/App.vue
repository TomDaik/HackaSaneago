<template>
  <div class="flex h-screen bg-slate-50 font-sans overflow-hidden">
    
    <aside class="w-64 bg-white border-r border-slate-100 flex flex-col justify-between p-6 shrink-0">
      <div>
        <div class="mb-8 px-2">
          <h2 class="text-xl font-black text-slate-950 tracking-tight flex items-center gap-2">
            💧 <span class="text-[#e0565b]">LETA</span>Saneago
          </h2>
          <p class="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1">HackSaneago 2026</p>
        </div>

        <nav class="space-y-1">
          <router-link 
            to="/dashboard" 
            class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all"
            active-class="bg-rose-50 text-[#e0565b]"
            inactive-class="text-slate-500 hover:bg-slate-50 hover:text-slate-800"
          >
            📊 Dashboard
          </router-link>

          <router-link 
            to="/tracking" 
            class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all"
            active-class="bg-rose-50 text-[#e0565b]"
            inactive-class="text-slate-500 hover:bg-slate-50 hover:text-slate-800"
          >
            🚚 Rastreamento
          </router-link>

          <router-link 
            to="/lotes" 
            class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all"
            active-class="bg-rose-50 text-[#e0565b]"
            inactive-class="text-slate-500 hover:bg-slate-50 hover:text-slate-800"
          >
            📦 Lotes Disponíveis
          </router-link>

          <router-link 
            to="/simulador" 
            class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all"
            active-class="bg-rose-50 text-[#e0565b]"
            inactive-class="text-slate-500 hover:bg-slate-50 hover:text-slate-800"
          >
            🧮 Simulador Custo
          </router-link>
        </nav>
      </div>
    </aside>

    <main class="flex-1 h-full overflow-y-auto bg-slate-50">
      <RouterView />
    </main>

  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style>
/* Reset básico para garantir que o layout ocupe a tela toda perfeitamente */
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #f8fafc;
}
</style>