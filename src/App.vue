<template>
  <div class="flex flex-col md:flex-row h-screen bg-slate-50 font-sans overflow-hidden">
    <!-- Header Mobile com Botão de Menu -->
    <header class="flex md:hidden justify-between items-center px-4 py-3 bg-white border-b border-slate-200 shrink-0 z-30">
      <h2 class="text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
        💧 <span class="text-emerald-600">SGA</span>-LETA Saneago
      </h2>
      <button 
        @click="menuAberto = !menuAberto" 
        class="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
        aria-label="Alternar Menu"
      >
        <svg v-if="!menuAberto" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </header>

    <!-- Fundo escuro quando o menu mobile está aberto -->
    <div 
      v-if="menuAberto" 
      @click="menuAberto = false" 
      class="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
    ></div>

    <!-- Sidebar (Gaveta no Mobile / Barra Lateral Fixa no Desktop) -->
    <aside 
      :class="[
        'fixed md:static inset-y-0 left-0 z-50 w-72 md:w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-6 shrink-0 transition-transform duration-300 ease-in-out',
        menuAberto ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
      ]"
    >
      <div>
        <div class="mb-8 px-2 flex justify-between items-center">
          <div>
            <h2 class="text-lg font-black text-slate-950 tracking-tight flex items-center gap-2">
              💧 <span class="text-emerald-600">SGA</span>-LETA
            </h2>
            <p class="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1">Conformidade & ESG Saneago</p>
          </div>
          <!-- Botão fechar dentro da gaveta mobile -->
          <button @click="menuAberto = false" class="md:hidden text-slate-400 hover:text-slate-600 text-lg font-bold">
            ✕
          </button>
        </div>

        <nav class="space-y-1.5">
          <router-link 
            to="/dashboard" 
            @click="menuAberto = false"
            class="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all"
            active-class="bg-emerald-50 text-emerald-700 font-extrabold shadow-sm"
            inactive-class="text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            📊 Painel de Conformidade
          </router-link>

          <router-link 
            to="/lotes" 
            @click="menuAberto = false"
            class="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all"
            active-class="bg-emerald-50 text-emerald-700 font-extrabold shadow-sm"
            inactive-class="text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            📋 Lotes & Laudos CONAMA
          </router-link>

          <router-link 
            to="/tracking" 
            @click="menuAberto = false"
            class="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all"
            active-class="bg-emerald-50 text-emerald-700 font-extrabold shadow-sm"
            inactive-class="text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            🚚 Rastreamento & MTR
          </router-link>

          <router-link 
            to="/simulador" 
            @click="menuAberto = false"
            class="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all"
            active-class="bg-emerald-50 text-emerald-700 font-extrabold shadow-sm"
            inactive-class="text-slate-600 hover:bg-slate-50 hover:text-slate-900"
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

    <!-- Barra de Navegação Inferior Fixa para Mobile (Bottom Navigation) -->
    <nav class="flex md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 justify-around py-2 z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      <router-link 
        to="/dashboard" 
        class="flex flex-col items-center gap-0.5 text-[10px] font-bold py-1 px-2 rounded-xl transition-colors"
        active-class="text-emerald-600 font-black"
        inactive-class="text-slate-400 hover:text-slate-600"
      >
        <span class="text-base">📊</span>
        <span>Painel</span>
      </router-link>

      <router-link 
        to="/lotes" 
        class="flex flex-col items-center gap-0.5 text-[10px] font-bold py-1 px-2 rounded-xl transition-colors"
        active-class="text-emerald-600 font-black"
        inactive-class="text-slate-400 hover:text-slate-600"
      >
        <span class="text-base">📋</span>
        <span>Lotes</span>
      </router-link>

      <router-link 
        to="/tracking" 
        class="flex flex-col items-center gap-0.5 text-[10px] font-bold py-1 px-2 rounded-xl transition-colors"
        active-class="text-emerald-600 font-black"
        inactive-class="text-slate-400 hover:text-slate-600"
      >
        <span class="text-base">🚚</span>
        <span>Rotas</span>
      </router-link>

      <router-link 
        to="/simulador" 
        class="flex flex-col items-center gap-0.5 text-[10px] font-bold py-1 px-2 rounded-xl transition-colors"
        active-class="text-emerald-600 font-black"
        inactive-class="text-slate-400 hover:text-slate-600"
      >
        <span class="text-base">🌱</span>
        <span>ESG</span>
      </router-link>
    </nav>

    <!-- Conteúdo Principal -->
    <main class="flex-1 h-full overflow-y-auto bg-slate-50 pb-20 md:pb-0">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'

const menuAberto = ref(false)
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #f8fafc;
}
</style>