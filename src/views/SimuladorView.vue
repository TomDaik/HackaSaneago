<template>
  <div class="p-6 bg-slate-50 min-h-screen text-slate-800">
    <header class="mb-8">
      <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Simulador de Custo-Benefício</h1>
      <p class="text-sm text-slate-500">Compare os custos e veja quanto pode poupar utilizando o LETA (matéria-prima gratuita, pagando apenas o frete).</p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-1 flex flex-col gap-6">
        <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Configurar Simulação</h3>

        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase mb-2">Aplicação do Lodo</label>
          <div class="grid grid-cols-2 gap-2">
            <button 
              @click="segmento = 'construcao'"
              :class="[
                'py-2 px-3 rounded-xl text-xs font-bold border transition-all',
                segmento === 'construcao' ? 'bg-[#e0565b] text-white border-[#e0565b]' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              ]"
            >
              🧱 Construção Civil
            </button>
            <button 
              @click="segmento = 'agricultura'"
              :class="[
                'py-2 px-3 rounded-xl text-xs font-bold border transition-all',
                segmento === 'agricultura' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              ]"
            >
              🌱 Agricultura
            </button>
          </div>
        </div>

        <div>
          <div class="flex justify-between items-center mb-2">
            <label class="text-xs font-bold text-slate-700 uppercase">Volume Necessário</label>
            <span class="text-sm font-black text-slate-900">{{ volume }} Toneladas</span>
          </div>
          <input 
            v-model.number="volume" 
            type="range" 
            min="5" 
            max="200" 
            step="5"
            class="w-full accent-[#e0565b] bg-slate-100 h-2 rounded-lg cursor-pointer"
          />
          <div class="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>5 Ton</span>
            <span>200 Ton</span>
          </div>
        </div>

        <div>
          <div class="flex justify-between items-center mb-2">
            <label class="text-xs font-bold text-slate-700 uppercase">Distância da ETA mais próxima</label>
            <span class="text-sm font-black text-slate-900">📍 {{ distancia }} km</span>
          </div>
          <input 
            v-model.number="distancia" 
            type="range" 
            min="2" 
            max="100" 
            step="1"
            class="w-full accent-[#e0565b] bg-slate-100 h-2 rounded-lg cursor-pointer"
          />
          <div class="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>2 km</span>
            <span>100 km</span>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-2">
          <p>💡 **Base de cálculo do mercado atual:**</p>
          <p>• Matéria-prima convencional: <span class="font-semibold text-slate-700">R$ {{ custoMateriaPrimaPorTon }}/Ton</span></p>
          <p>• Estimativa de frete: <span class="font-semibold text-slate-700">R$ {{ custoFretePorKmTon.toFixed(2) }} por Ton/km</span></p>
        </div>
      </div>

      <div class="lg:col-span-2 flex flex-col gap-6">
        
        <div class="bg-slate-900 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 sm:p-6 rounded-2xl shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-slate-800">
          <div>
            <p class="text-xs font-bold uppercase tracking-wider text-rose-400">Sua Economia Estimada</p>
            <h2 class="text-4xl font-black mt-1 text-white">R$ {{ economiaTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</h2>
            <p class="text-xs text-slate-300 mt-1">Poupado ao substituir insumos comerciais por LETA nesta operação.</p>
          </div>
          <router-link 
            to="/lotes" 
            class="w-full sm:w-auto px-5 py-3 bg-[#e0565b] hover:bg-[#c9454a] text-white text-xs font-bold rounded-xl text-center shadow-sm transition-all uppercase tracking-wider"
          >
            Encontrar Lotes Próximos
          </router-link>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-center mb-4">
                <h4 class="text-sm font-bold text-slate-900">Insumo de Mercado</h4>
                <span class="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-md">Convencional</span>
              </div>
              <p class="text-2xl font-extrabold text-slate-700">R$ {{ custoTotalConvencional.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</p>
              
              <div class="space-y-2 mt-6 pt-4 border-t border-slate-50 text-xs">
                <div class="flex justify-between text-slate-500">
                  <span>Custo do Material:</span>
                  <span class="font-medium text-slate-800">R$ {{ (volume * custoMateriaPrimaPorTon).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</span>
                </div>
                <div class="flex justify-between text-slate-500">
                  <span>Custo do Frete:</span>
                  <span class="font-medium text-slate-800">R$ {{ custoFreteTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</span>
                </div>
              </div>
            </div>
            <div class="mt-6 text-[11px] text-amber-600 bg-amber-50 p-2.5 rounded-lg font-medium">
              ⚠️ Paga pelo valor comercial da matéria-prima adicionado ao valor logístico.
            </div>
          </div>

          <div class="bg-white p-6 rounded-2xl border-2 border-emerald-500 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div class="absolute top-0 right-0 bg-emerald-500 text-white text-[9px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-wider">
              Recomendado
            </div>
            
            <div>
              <div class="flex justify-between items-center mb-4">
                <h4 class="text-sm font-bold text-slate-900">Solução com LETA</h4>
                <span class="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-md">Sustentável</span>
              </div>
              <p class="text-2xl font-black text-emerald-600">R$ {{ custoFreteTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</p>
              
              <div class="space-y-2 mt-6 pt-4 border-t border-slate-50 text-xs">
                <div class="flex justify-between text-slate-500">
                  <span>Custo do Material:</span>
                  <span class="font-bold text-emerald-600">R$ 0,00 (Gratuito)</span>
                </div>
                <div class="flex justify-between text-slate-500">
                  <span>Custo do Frete:</span>
                  <span class="font-medium text-slate-800">R$ {{ custoFreteTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</span>
                </div>
              </div>
            </div>
            
            <div class="mt-6 text-[11px] text-emerald-700 bg-emerald-50 p-2.5 rounded-lg font-medium">
              ✅ Isenção total de custos no resíduo gerado pela ETA. O seu único custo é a logística.
            </div>
          </div>

        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Proporção Visual de Despesa</h4>
          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-xs font-medium mb-1">
                <span class="text-slate-700">Gasto no Mercado Tradicional</span>
                <span class="text-slate-500">100% do custo</span>
              </div>
              <div class="w-full bg-slate-100 h-6 rounded-lg overflow-hidden flex">
                <div class="bg-slate-400 h-full text-[10px] text-white flex items-center justify-center font-bold" :style="{ width: percentualMaterialConvencional + '%' }">
                  Material
                </div>
                <div class="bg-slate-500 h-full text-[10px] text-white flex items-center justify-center font-bold" :style="{ width: (100 - percentualMaterialConvencional) + '%' }">
                  Frete
                </div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs font-medium mb-1">
                <span class="text-slate-700">Gasto Utilizando LETA</span>
                <span class="text-emerald-600 font-bold">{{ percentualCustoLetaEmRelacaoAoTotal }}% do custo tradicional</span>
              </div>
              <div class="w-full bg-slate-100 h-6 rounded-lg overflow-hidden">
                <div class="bg-emerald-500 h-full text-[10px] text-white flex items-center justify-center font-bold transition-all duration-300" :style="{ width: percentualCustoLetaEmRelacaoAoTotal + '%' }">
                  Apenas Frete
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const segmento = ref('construcao')
const volume = ref(20) // Em toneladas
const distancia = ref(15) // Em quilómetros

// Variáveis de mercado simuladas para o algoritmo de cálculo do MVP
const custoMateriaPrimaPorTon = computed(() => {
  // Argila/Areia para cerâmica costuma ser mais barata que substrato/adubo preparado para agricultura
  return segmento.value === 'construcao' ? 140 : 280
})

const custoFretePorKmTon = ref(1.20) // R$ por tonelada a cada km rodado

// Cálculos Reativos e Computados
const custoFreteTotal = computed(() => {
  return volume.value * distancia.value * custoFretePorKmTon.value
})

const custoTotalConvencional = computed(() => {
  const custoMaterial = volume.value * custoMateriaPrimaPorTon.value
  return custoMaterial + custoFreteTotal.value
})

const economiaTotal = computed(() => {
  // A economia é exatamente o custo do material convencional que deixa de ser pago
  return volume.value * custoMateriaPrimaPorTon.value
})

// Proporções para os gráficos de barra utilitários
const percentualMaterialConvencional = computed(() => {
  const custoMaterial = volume.value * custoMateriaPrimaPorTon.value
  if (custoTotalConvencional.value === 0) return 0
  return Math.round((custoMaterial / custoTotalConvencional.value) * 100)
})

const percentualCustoLetaEmRelacaoAoTotal = computed(() => {
  if (custoTotalConvencional.value === 0) return 0
  return Math.round((custoFreteTotal.value / custoTotalConvencional.value) * 100)
})
</script>