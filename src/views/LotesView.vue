<template>
  <div class="p-6 bg-slate-50 min-h-screen text-slate-800">
    <header class="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Lotes Disponíveis</h1>
        <p class="text-sm text-slate-500">Explore e reserve os lotes de LETA gerados pelas estações de tratamento mais próximas.</p>
      </div>
    </header>

    <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="relative w-full md:w-80">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input 
          v-model="busca" 
          type="text" 
          placeholder="Buscar por ETA ou lote..." 
          class="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e0565b] focus:border-transparent bg-slate-50"
        />
      </div>

      <div class="flex flex-wrap gap-2 w-full md:w-auto">
        <button 
          v-for="categoria in ['Todos', 'Agricultura', 'Construção Civil']" 
          :key="categoria"
          @click="filtroAptidao = categoria"
          :class="[
            'px-4 py-2 rounded-xl text-xs font-bold transition-all border',
            filtroAptidao === categoria 
              ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          ]"
        >
          {{ categoria }}
        </button>
      </div>
    </div>

    <div v-if="lotesFiltrados.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="lote in lotesFiltrados" 
        :key="lote.id" 
        class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between"
      >
        <div>
          <div class="flex justify-between items-start mb-4">
            <div>
              <span class="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{{ lote.id }}</span>
              <h3 class="text-lg font-bold text-slate-900 mt-2">{{ lote.eta }}</h3>
            </div>
            <span 
              :class="[
                'text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider',
                lote.aptidao === 'Agricultura' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
              ]"
            >
              {{ lote.aptidao }}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-4 py-3 px-4 bg-slate-50 rounded-xl mb-4 border border-slate-100">
            <div>
              <p class="text-[10px] text-slate-400 uppercase font-semibold">Volume Disp.</p>
              <p class="text-base font-black text-slate-800">{{ lote.volume }} <span class="text-xs font-normal text-slate-500">Ton</span></p>
            </div>
            <div>
              <p class="text-[10px] text-slate-400 uppercase font-semibold">Distância</p>
              <p class="text-base font-black text-slate-800">📍 {{ lote.distanciaKm }} <span class="text-xs font-normal text-slate-500">km</span></p>
            </div>
          </div>

          <div class="mb-6">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Laudo Laboratorial</h4>
            <div class="space-y-2">
              <div class="flex justify-between text-xs border-b border-slate-50 pb-1">
                <span class="text-slate-500">Umidade Média</span>
                <span class="font-semibold text-slate-800">{{ lote.specs.umidade }}%</span>
              </div>
              <div class="flex justify-between text-xs border-b border-slate-50 pb-1">
                <span class="text-slate-500">Potencial Hidrogeniônico (pH)</span>
                <span class="font-semibold text-slate-800">{{ lote.specs.ph }}</span>
              </div>
              <div class="flex justify-between text-xs border-b border-slate-50 pb-1">
                <span class="text-slate-500">Matéria Orgânica</span>
                <span class="font-semibold text-slate-800">{{ lote.specs.materiaOrganca }}%</span>
              </div>
              <div class="flex justify-between text-xs">
                <span class="text-slate-500">Metais Pesados</span>
                <span class="font-bold text-emerald-600">Dentro dos Limites (Conama)</span>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4 pt-4 border-t border-slate-100 flex gap-2">
          <router-link 
            to="/simulador" 
            class="flex-1 text-center py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors"
          >
            Simular Custo
          </router-link>
          <button 
            @click="reservarLote(lote.id)"
            class="flex-1 py-2.5 bg-[#e0565b] text-white rounded-xl text-xs font-bold hover:bg-[#c9454a] transition-colors shadow-sm"
          >
            Reservar Lote
          </button>
        </div>
      </div>
    </div>

    <div v-else class="bg-white rounded-2xl border border-slate-100 p-12 text-center max-w-md mx-auto mt-12">
      <p class="text-base font-bold text-slate-800">Nenhum lote encontrado</p>
      <p class="text-xs text-slate-400 mt-1">Tente ajustar os filtros ou o termo de busca para encontrar o lodo ideal.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const busca = ref('')
const filtroAptidao = ref('Todos')

// Dados simulados de lotes de LETA baseados nas necessidades da engenharia civil e agricultura
const lotes = ref([
  {
    id: 'LOTE-LETA-001',
    eta: 'ETA Meia Ponte',
    aptidao: 'Construção Civil',
    volume: 24.5,
    distanciaKm: 14,
    specs: {
      umidade: 18.2,
      ph: 6.8,
      materiaOrganca: 12.5
    }
  },
  {
    id: 'LOTE-LETA-002',
    eta: 'ETA João Leite',
    aptidao: 'Agricultura',
    volume: 45.0,
    distanciaKm: 28,
    specs: {
      umidade: 65.4,
      ph: 7.2,
      materiaOrganca: 48.0
    }
  },
  {
    id: 'LOTE-LETA-003',
    eta: 'ETA Goiânia Sul',
    aptidao: 'Construção Civil',
    volume: 15.2,
    distanciaKm: 8,
    specs: {
      umidade: 15.0,
      ph: 6.4,
      materiaOrganca: 9.1
    }
  },
  {
    id: 'LOTE-LETA-004',
    eta: 'ETA Senador Canedo',
    aptidao: 'Agricultura',
    volume: 38.8,
    distanciaKm: 42,
    specs: {
      umidade: 60.1,
      ph: 7.0,
      materiaOrganca: 52.3
    }
  }
])

// Lógica reativa de filtros e busca combinados
const lotesFiltrados = computed(() => {
  return lotes.value.filter(lote => {
    const correspondeBusca = lote.eta.toLowerCase().includes(busca.value.toLowerCase()) || 
                             lote.id.toLowerCase().includes(busca.value.toLowerCase())
    
    const correspondeAptidao = filtroAptidao.value === 'Todos' || lote.aptidao === filtroAptidao.value

    return correspondeBusca && correspondeAptidao
  })
})

const reservarLote = (id) => {
  alert(`Lote ${id} reservado com sucesso! Entraremos em contato para coordenar a coleta e a transportadora.`)
}
</script>