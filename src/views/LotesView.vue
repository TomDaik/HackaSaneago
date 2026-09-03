<template>
  <div class="p-6 bg-slate-50 min-h-screen text-slate-800">
    <header class="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Controle e Liberação de Lotes</h1>
        <p class="text-sm text-slate-500">Validação laboratorial e classificação de aptidão para descarte/economia circular.</p>
      </div>
      <button class="bg-[#e0565b] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#c9454a] transition-all">
        + Cadastrar Novo Lote Desaguado
      </button>
    </header>

    <!-- Filtros e Busca -->
    <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="relative w-full md:w-80">
        <input 
          v-model="busca" 
          type="text" 
          placeholder="Buscar por lote ou ETA..." 
          class="w-full pl-4 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e0565b] bg-slate-50"
        />
      </div>

      <div class="flex flex-wrap gap-2 w-full md:w-auto">
        <button 
          v-for="categoria in ['Todos', 'Construção Civil', 'Agricultura', 'Bloqueados']" 
          :key="categoria"
          @click="filtroAptidao = categoria"
          :class="[
            'px-4 py-2 rounded-xl text-xs font-bold transition-all border',
            filtroAptidao === categoria 
              ? 'bg-slate-900 text-white border-slate-900' 
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          ]"
        >
          {{ categoria }}
        </button>
      </div>
    </div>

    <!-- Grid de Lotes -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="lote in lotesFiltrados" 
        :key="lote.id" 
        class="bg-white rounded-2xl border shadow-sm p-6 flex flex-col justify-between"
        :class="lote.bloqueado ? 'border-rose-200 bg-rose-50/10' : 'border-slate-100'"
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
                lote.bloqueado ? 'bg-rose-100 text-rose-700' : (lote.aptidao === 'Agricultura' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700')
              ]"
            >
              {{ lote.bloqueado ? 'Em Quarentena' : lote.aptidao }}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-4 py-3 px-4 bg-slate-50 rounded-xl mb-4 border border-slate-100">
            <div>
              <p class="text-[10px] text-slate-400 uppercase font-semibold">Volume Disponível</p>
              <p class="text-base font-black text-slate-800">{{ lote.volume }} <span class="text-xs font-normal text-slate-500">Ton</span></p>
            </div>
            <div>
              <p class="text-[10px] text-slate-400 uppercase font-semibold">Status de Laudo</p>
              <p class="text-xs font-bold mt-1" :class="lote.bloqueado ? 'text-rose-600' : 'text-emerald-600'">
                {{ lote.statusLaudo }}
              </p>
            </div>
          </div>

          <!-- Laudo Físico-Químico -->
          <div class="mb-4">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Parâmetros Analíticos (CONAMA)</h4>
            <div class="space-y-1.5 text-xs">
              <div class="flex justify-between border-b border-slate-50 pb-1">
                <span class="text-slate-500">Umidade</span>
                <span class="font-semibold">{{ lote.specs.umidade }}%</span>
              </div>
              <div class="flex justify-between border-b border-slate-50 pb-1">
                <span class="text-slate-500">pH</span>
                <span class="font-semibold">{{ lote.specs.ph }}</span>
              </div>
              <div class="flex justify-between border-b border-slate-50 pb-1">
                <span class="text-slate-500">Metais Pesados</span>
                <span :class="lote.bloqueado ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'">
                  {{ lote.specs.metais }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4 pt-4 border-t border-slate-100 flex gap-2">
          <button 
            v-if="!lote.bloqueado"
            @click="liberarLote(lote.id)"
            class="w-full py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors"
          >
            Emitir Liberação & MTR
          </button>
          <button 
            v-else
            @click="abrirNC(lote.id)"
            class="w-full py-2.5 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition-colors"
          >
            Tratar Não Conformidade (Bloqueado)
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const busca = ref('')
const filtroAptidao = ref('Todos')

const lotes = ref([
  {
    id: 'LOTE-LETA-001',
    eta: 'ETA Meia Ponte',
    aptidao: 'Construção Civil',
    volume: 24.5,
    bloqueado: false,
    statusLaudo: 'Aprovado CONAMA',
    specs: { umidade: 18.2, ph: 6.8, metais: 'Dentro dos Limites' }
  },
  {
    id: 'LOTE-LETA-002',
    eta: 'ETA João Leite',
    aptidao: 'Agricultura',
    volume: 45.0,
    bloqueado: false,
    statusLaudo: 'Aprovado CONAMA',
    specs: { umidade: 65.4, ph: 7.2, metais: 'Dentro dos Limites' }
  },
  {
    id: 'LOTE-LETA-003',
    eta: 'ETA Goiânia Sul',
    aptidao: 'Bloqueados',
    volume: 18.0,
    bloqueado: true,
    statusLaudo: 'Reprovado (Chumbo alto)',
    specs: { umidade: 32.0, ph: 5.1, metais: 'Excede Limite Classe II' }
  }
])

const lotesFiltrados = computed(() => {
  return lotes.value.filter(lote => {
    const matchBusca = lote.eta.toLowerCase().includes(busca.value.toLowerCase()) || lote.id.toLowerCase().includes(busca.value.toLowerCase())
    if (filtroAptidao.value === 'Todos') return matchBusca
    if (filtroAptidao.value === 'Bloqueados') return matchBusca && lote.bloqueado
    return matchBusca && lote.aptidao === filtroAptidao.value && !lote.bloqueado
  })
})

const liberarLote = (id) => alert(`Lote ${id} homologado! Pronto para vinculação de MTR e pesagem na balança.`)
const abrirNC = (id) => alert(`Ação de Não Conformidade disparada para o lote ${id}. Resíduo travado para saída.`)
</script>