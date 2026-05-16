<template>
  <div class="flex flex-col md:flex-row h-screen bg-slate-50 font-sans overflow-hidden">
    
    <header class="flex md:hidden justify-between items-center px-4 py-3 bg-white border-b border-slate-100 shrink-0">
      <h2 class="text-md font-black text-slate-950 tracking-tight flex items-center gap-1">
        💧 <span class="text-[#e0565b]">LETA</span>Saneago
      </h2>
    </header>

    <aside class="hidden md:flex w-64 bg-white border-r border-slate-100 flex-col justify-between p-6 shrink-0">
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

    <nav class="flex md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 justify-around py-2 z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      <router-link 
        to="/dashboard" 
        class="flex flex-col items-center gap-0.5 text-[10px] font-bold py-1 px-3 rounded-xl"
        active-class="text-[#e0565b]"
        inactive-class="text-slate-400"
      >
        <span class="text-base">📊</span>
        <span>Painel</span>
      </router-link>

      <router-link 
        to="/tracking" 
        class="flex flex-col items-center gap-0.5 text-[10px] font-bold py-1 px-3 rounded-xl"
        active-class="text-[#e0565b]"
        inactive-class="text-slate-400"
      >
        <span class="text-base">🚚</span>
        <span>Rotas</span>
      </router-link>

      <router-link 
        to="/lotes" 
        class="flex flex-col items-center gap-0.5 text-[10px] font-bold py-1 px-3 rounded-xl"
        active-class="text-[#e0565b]"
        inactive-class="text-slate-400"
      >
        <span class="text-base">📦</span>
        <span>Lotes</span>
      </router-link>

      <router-link 
        to="/simulador" 
        class="flex flex-col items-center gap-0.5 text-[10px] font-bold py-1 px-3 rounded-xl"
        active-class="text-[#e0565b]"
        inactive-class="text-slate-400"
      >
        <span class="text-base">🧮</span>
        <span>Simulador</span>
      </router-link>
    </nav>

    <main class="flex-1 h-full overflow-y-auto bg-slate-50 pb-20 md:pb-0">
      <RouterView />
    </main>

  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #f8fafc;
}
</style>