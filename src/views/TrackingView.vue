<template>
  <div class="p-6 bg-slate-50 min-h-screen text-slate-800 flex flex-col lg:flex-row gap-6">
    <!-- Lista de Transportes / MTRs -->
    <div class="w-full lg:w-5/12 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col h-[calc(100vh-3rem)] overflow-y-auto">
      <div class="mb-6">
        <h2 class="text-xl font-bold text-slate-900">Rastreabilidade & MTR</h2>
        <p class="text-xs text-slate-400 mt-1">Manifestos de Transporte de Resíduos Ativos</p>
      </div>

      <div class="space-y-4 flex-1">
        <div 
          v-for="truck in trucks" 
          :key="truck.id"
          @click="truckSelecionado = truck"
          :class="[
            'p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-2',
            truckSelecionado.id === truck.id ? 'border-emerald-600 bg-emerald-50/20 ring-1 ring-emerald-600' : 'border-slate-100 bg-white hover:border-slate-300'
          ]"
        >
          <div class="flex justify-between items-center">
            <span class="font-bold text-sm text-slate-900">{{ truck.id }}</span>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              MTR: {{ truck.mtr }}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p class="text-slate-400 text-[10px] uppercase">Destino Homologado</p>
              <p class="font-semibold text-slate-700 mt-0.5 truncate">{{ truck.destino }}</p>
            </div>
            <div>
              <p class="text-slate-400 text-[10px] uppercase">Retorno do CDF</p>
              <p class="font-semibold text-amber-600 mt-0.5">{{ truck.prazoCDF }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detalhe da Evidência e Rastreamento -->
    <div class="w-full lg:w-7/12 flex flex-col gap-6">
      <div class="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div class="w-full sm:w-auto">
          <div class="flex flex-wrap items-center gap-2">
            <h2 class="text-lg sm:text-xl font-black text-slate-900 tracking-tight whitespace-nowrap">
              {{ truckSelecionado.mtr }}
            </h2>
            <span class="inline-block whitespace-nowrap text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-md">
              Regular (PNRS)
            </span>
          </div>
          <p class="text-xs text-slate-500 mt-1 leading-relaxed">
            Transportador Homologado: <span class="font-medium text-slate-700">{{ truckSelecionado.transportadora }}</span> (LO SEMAD Ativa)
          </p>
        </div>
        
        <button class="w-full sm:w-auto shrink-0 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm text-center">
          Baixar MTR (PDF)
        </button>
      </div>

      <!-- Checklist de Evidências Obrigatórias (Auditável) -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Evidências de Conformidade Regulatória</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30">
            <p class="text-xs font-bold text-emerald-800">1. Pesagem na Portaria</p>
            <p class="text-[11px] text-slate-600 mt-1">Ticket nº 4891 validado na balança da ETA.</p>
            <span class="inline-block mt-2 text-[10px] font-bold text-emerald-700">✓ Concluído</span>
          </div>

          <div class="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30">
            <p class="text-xs font-bold text-emerald-800">2. MTR Eletrônico</p>
            <p class="text-[11px] text-slate-600 mt-1">Assinado digitalmente pelo responsável técnico.</p>
            <span class="inline-block mt-2 text-[10px] font-bold text-emerald-700">✓ Emitido</span>
          </div>

          <div class="p-4 rounded-xl border border-amber-200 bg-amber-50/30">
            <p class="text-xs font-bold text-amber-800">3. Retorno do CDF</p>
            <p class="text-[11px] text-slate-600 mt-1">Aguardando certificado da olaria parceira.</p>
            <span class="inline-block mt-2 text-[10px] font-bold text-amber-700">⏳ {{ truckSelecionado.prazoCDF }}</span>
          </div>
        </div>
      </div>

      <!-- Relatório Fotográfico de Carga -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Relatório Fotográfico de Vedação e Lacre</h3>
        <div class="grid grid-cols-3 gap-4">
          <div v-for="i in 2" :key="i" class="aspect-video bg-slate-100 rounded-xl border border-slate-200 flex flex-col items-center justify-center p-2 text-center">
            <span class="text-xs font-semibold text-slate-600">Foto_Lacre_Cacamba_{{ i }}.jpg</span>
            <span class="text-[10px] text-emerald-600 font-bold mt-1">Validado na Saída</span>
          </div>
          <button class="aspect-video border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-slate-400 transition-colors">
            <span class="text-base font-bold">+</span>
            <span class="text-[10px]">Anexar Evidência</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const trucks = ref([
  {
    id: 'CAM-01 (Placa: ONX-9210)',
    mtr: 'MTR-2026-00491',
    origem: 'ETA Meia Ponte',
    destino: 'Cerâmica Goiânia Estrutural S.A.',
    transportadora: 'TransEcológica Ltda',
    prazoCDF: '22 dias restantes'
  },
  {
    id: 'CAM-02 (Placa: PQZ-4011)',
    mtr: 'MTR-2026-00492',
    origem: 'ETA João Leite',
    destino: 'Fazenda Planalto - Rio Verde',
    transportadora: 'AgroLog Transportes',
    prazoCDF: '5 dias restantes (Alerta)'
  }
])

const truckSelecionado = ref(trucks.value[0])
</script>