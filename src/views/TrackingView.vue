<template>
  <div class="p-6 bg-slate-50 min-h-screen text-slate-800 flex flex-col lg:flex-row gap-6">
    
    <div class="w-full lg:w-5/12 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col h-[calc(100vh-3rem)] overflow-y-auto">
      <div class="mb-6">
        <h2 class="text-xl font-bold text-slate-900">Rastreamento</h2>
        <p class="text-xs text-slate-400 mt-1">Filtrar por status dos lotes de LETA</p>
        
        <div class="flex flex-wrap gap-2 mt-4">
          <button 
            v-for="filtro in ['Todos', 'A Caminho', 'Aguardando']" 
            :key="filtro"
            @click="filtroAtivo = filtro"
            :class="[
              'px-3 py-1.5 rounded-full text-xs font-semibold transition-colors',
              filtroAtivo === filtro ? 'bg-[#e0565b] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            ]"
          >
            {{ filtro }}
          </button>
        </div>
      </div>

      <div class="space-y-4 flex-1">
        <div 
          v-for="truck in trucksFiltrados" 
          :key="truck.id"
          @click="truckSelecionado = truck"
          :class="[
            'p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-3 relative overflow-hidden',
            truckSelecionado.id === truck.id ? 'border-[#e0565b] bg-rose-50/30 ring-1 ring-[#e0565b]' : 'border-slate-100 hover:border-slate-300 bg-white'
          ]"
        >
          <div class="flex justify-between items-center">
            <span class="font-bold text-sm text-slate-900">{{ truck.id }}</span>
            <span 
              :class="[
                'text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1',
                truck.status === 'A Caminho' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
              ]"
            >
              <span class="w-1.5 h-1.5 rounded-full" :class="truck.status === 'A Caminho' ? 'bg-green-500' : 'bg-amber-500'"></span>
              {{ truck.status }}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p class="text-slate-400 text-[10px] uppercase">Tempo Restante</p>
              <p class="font-semibold text-slate-700 mt-0.5">{{ truck.tempoRestante }}</p>
            </div>
            <div>
              <p class="text-slate-400 text-[10px] uppercase">Origem/ETA</p>
              <p class="font-semibold text-slate-700 mt-0.5 truncate">{{ truck.origem }}</p>
            </div>
          </div>

          <div class="mt-2 pt-2 border-t border-slate-50 flex justify-between items-center text-xs text-slate-500">
            <span>Destino: {{ truck.destino }}</span>
            <span class="font-bold text-slate-700">{{ truck.capacidade }}% Cheio</span>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full lg:w-7/12 flex flex-col gap-6">
      
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-xl font-bold text-slate-900">{{ truckSelecionado.id }}</h2>
            <span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-md font-medium">{{ truckSelecionado.status }}</span>
          </div>
          <p class="text-xs text-slate-400 mt-0.5">Motorista: {{ truckSelecionado.motorista }}</p>
        </div>
        <div class="flex gap-2 w-full sm:w-auto">
          <button class="flex-1 sm:flex-initial px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
            📞 Ligar
          </button>
          <button class="flex-1 sm:flex-initial px-4 py-2 bg-[#e0565b] text-white rounded-xl text-xs font-semibold hover:bg-[#c9454a] transition-colors">
            💬 Chat com Motorista
          </button>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Capacidade Atual de Carga</h3>
        <div class="bg-slate-50 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-6 border border-slate-100">
          <div class="relative w-32 h-32 flex items-center justify-center bg-white rounded-full shadow-inner border border-slate-100">
            <span class="text-3xl font-black text-slate-900">{{ truckSelecionado.capacidade }}%</span>
          </div>
          <div class="flex-1 w-full">
            <div class="w-full bg-slate-200 h-4 rounded-full overflow-hidden">
              <div class="bg-[#e0565b] h-full transition-all duration-500" :style="{ width: truckSelecionado.capacidade + '%' }"></div>
            </div>
            <div class="grid grid-cols-2 gap-4 mt-4 text-xs">
              <div>
                <p class="text-slate-400">Volume Atual</p>
                <p class="font-bold text-slate-800 text-sm mt-0.5">{{ (truckSelecionado.capacidade * 0.25).toFixed(1) }} Toneladas</p>
              </div>
              <div>
                <p class="text-slate-400">Tipo de Lodo</p>
                <p class="font-bold text-slate-800 text-sm mt-0.5">{{ truckSelecionado.tipoLodo }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex-1 flex flex-col min-h-[300px]">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400">Rota em Tempo Real</h3>
            <p class="text-xs text-slate-600 mt-0.5">Previsão de chegada: <span class="font-bold text-slate-900">{{ truckSelecionado.tempoRestante }}</span></p>
          </div>
        </div>

        <div class="bg-slate-100 rounded-xl flex-1 relative overflow-hidden border border-slate-200 min-h-[200px] flex items-center justify-center">
          <svg class="absolute inset-0 w-full h-full stroke-slate-300 stroke-[2] fill-none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-20,50 Q100,20 200,120 T400,80 T600,180 T800,100" />
            <path d="M0,180 Q150,140 300,220 T600,120" stroke-dasharray="4 4" />
            
            <path d="M200,120 T400,80 T510,130" class="stroke-[#e0565b] stroke-[4] stroke-linecap-round" />
            
            <circle cx="200" cy="120" r="6" class="fill-blue-600 stroke-white stroke-2" />
            <circle cx="510" cy="130" r="6" class="fill-[#e0565b] stroke-white stroke-2" />
          </svg>
          
          <div class="absolute bg-white px-3 py-1.5 rounded-lg shadow-sm text-[11px] font-bold border border-slate-100 top-1/4 left-1/4">
            📍 {{ truckSelecionado.origem }}
          </div>
          <div class="absolute bg-white px-3 py-1.5 rounded-lg shadow-sm text-[11px] font-bold border border-slate-100 bottom-1/3 right-1/4">
            🏢 {{ truckSelecionado.destino }}
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Relatório Fotográfico de Carga (ETA)</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div v-for="i in 3" :key="i" class="aspect-video bg-slate-100 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center p-2 relative overflow-hidden group">
            <span class="text-xs font-semibold text-slate-500">Foto_Lote_{{ i }}.jpg</span>
            <span class="text-[9px] text-slate-400 mt-1">Verificada na pesagem</span>
          </div>
          <button class="aspect-video border-2 border-dashed border-slate-200 hover:border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
            <span class="text-lg font-bold">+</span>
            <span class="text-[10px] font-medium">Anexar Foto</span>
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const filtroAtivo = ref('Todos')

// Lista de Caminhões / Lodos Ativos
const trucks = ref([
  {
    id: 'YR-34DFR734W2',
    status: 'A Caminho',
    tempoRestante: '57 min restantes',
    origem: 'ETA Meia Ponte',
    destino: 'Cerâmica Goiânia',
    capacidade: 82,
    motorista: 'Carlos Santos',
    tipoLodo: 'LETA Desidratado (Classe II-A)'
  },
  {
    id: 'RE-74ER453TR5',
    status: 'A Caminho',
    tempoRestante: '1h 15 min restantes',
    origem: 'ETA João Leite',
    destino: 'Fazenda Planalto (Rio Verde)',
    capacidade: 100,
    motorista: 'Marcos Souza',
    tipoLodo: 'LETA Adensado (Rico em Orgânicos)'
  },
  {
    id: 'AQ-257DRE141E',
    status: 'Aguardando',
    tempoRestante: '--',
    origem: 'ETA Goiânia Sul',
    destino: 'Tijolos Ecológicos S.A.',
    capacidade: 45,
    motorista: 'Ana Júlia',
    tipoLodo: 'LETA Seco em Leito de Secagem'
  }
])

// Define o primeiro caminhão como selecionado por padrão
const truckSelecionado = ref(trucks.value[0])

// Filtro computado para a barra lateral
const trucksFiltrados = computed(() => {
  if (filtroAtivo.value === 'Todos') return trucks.value
  return trucks.value.filter(t => t.status === filtroAtivo.value)
})
</script>