<template>
  <div class="p-6 bg-slate-50 min-h-screen text-slate-800">
    <header class="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <div class="flex items-center gap-2">
          <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Painel de Conformidade Ambiental</h1>
          <span class="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">ETA Meia Ponte</span>
        </div>
        <p class="text-sm text-slate-500">Monitoramento de condicionantes da Licença de Operação (LO) e valorização de LETA.</p>
      </div>
      <div class="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 text-sm font-medium text-slate-600">
        📅 {{ dataAtual }}
      </div>
    </header>

    <!-- Indicadores Principais de Compliance -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
        <div>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Conformidade Legal</p>
          <h3 class="text-3xl font-black text-emerald-600 mt-1">{{ metricas.conformidadeGeral }}%</h3>
          <p class="text-xs text-slate-500 mt-1">Licença Vigente (LO SEMAD)</p>
        </div>
        <div class="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-xl">✓</div>
      </div>

      <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
        <div>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">LETA Valorizado</p>
          <h3 class="text-3xl font-black text-slate-900 mt-1">{{ metricas.totalValorizado }} <span class="text-sm font-normal text-slate-500">Ton</span></h3>
          <p class="text-xs text-emerald-600 mt-1 font-medium">Economia Circular (PNRS)</p>
        </div>
        <div class="p-3.5 bg-blue-50 text-blue-600 rounded-xl font-bold text-xl">♻</div>
      </div>

      <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
        <div>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Desvio de Aterros</p>
          <h3 class="text-3xl font-black text-slate-900 mt-1">{{ metricas.residuoEvitado }} <span class="text-sm font-normal text-slate-500">m³</span></h3>
          <p class="text-xs text-slate-500 mt-1">Passivo evitado no mês</p>
        </div>
        <div class="p-3.5 bg-amber-50 text-amber-600 rounded-xl font-bold text-xl">🌱</div>
      </div>

      <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
        <div>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Não Conformidades</p>
          <h3 class="text-3xl font-black text-rose-600 mt-1">{{ metricas.naoConformidades }}</h3>
          <p class="text-xs text-rose-500 mt-1 font-medium">1 aguardando tratativa</p>
        </div>
        <div class="p-3.5 bg-rose-50 text-rose-600 rounded-xl font-bold text-xl">⚠️</div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Tabela de Monitoramento de Condicionantes Legais -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h3 class="text-lg font-bold text-slate-900">Condicionantes da Licença de Operação (LO)</h3>
            <p class="text-xs text-slate-400">Controle tempestivo de prazos e evidências ambientais</p>
          </div>
          <span class="text-xs bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded-lg">LO Nº 4892/2022</span>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="border-b border-slate-100 text-slate-400 font-semibold uppercase">
                <th class="pb-3">Condicionante / Obrigação</th>
                <th class="pb-3">Responsável</th>
                <th class="pb-3">Prazo</th>
                <th class="pb-3">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
              <tr v-for="item in condicionantes" :key="item.id" class="hover:bg-slate-50/50">
                <td class="py-3 font-medium text-slate-800">
                  {{ item.titulo }}
                  <span class="block text-[10px] text-slate-400 font-mono">{{ item.codigo }}</span>
                </td>
                <td class="py-3 text-slate-600">{{ item.responsavel }}</td>
                <td class="py-3 font-semibold" :class="item.prazoAlerta ? 'text-amber-600' : 'text-slate-700'">
                  {{ item.prazo }}
                </td>
                <td class="py-3">
                  <span :class="['px-2.5 py-1 rounded-full font-bold text-[10px]', item.statusClass]">
                    {{ item.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Alertas Regulatórios e Planos de Ação -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
        <div>
          <h3 class="text-lg font-bold text-slate-900 mb-2">Tratamento de Não Conformidades</h3>
          <p class="text-xs text-slate-400 mb-4">Ações preventivas e corretivas pendentes</p>
          
          <div class="space-y-3">
            <div v-for="nc in naoConformidadesLista" :key="nc.id" class="p-3.5 border border-slate-100 bg-slate-50/70 rounded-xl">
              <div class="flex justify-between items-start mb-1">
                <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded" :class="nc.criticidadeClass">
                  {{ nc.codigo }} - {{ nc.criticidade }}
                </span>
                <span class="text-[10px] text-slate-400">{{ nc.data }}</span>
              </div>
              <p class="text-xs font-bold text-slate-800 mt-1">{{ nc.titulo }}</p>
              <p class="text-[11px] text-slate-500 mt-0.5">{{ nc.acaoRequerida }}</p>
            </div>
          </div>
        </div>

        <button class="w-full mt-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors">
          + Abrir Nova Não Conformidade
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const dataAtual = ref(new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }))

const metricas = ref({
  conformidadeGeral: '98',
  totalValorizado: '148.5',
  residuoEvitado: '98.2',
  naoConformidades: '1'
})

const condicionantes = ref([
  {
    id: 1,
    codigo: 'COND-12/2026',
    titulo: 'Envio de laudo trimestral físico-químico do LETA',
    responsavel: 'Téc. de Laboratório',
    prazo: '15 dias restantes',
    prazoAlerta: true,
    status: 'Em Aberto',
    statusClass: 'bg-amber-100 text-amber-800'
  },
  {
    id: 2,
    codigo: 'COND-04/2026',
    titulo: 'Comprovação de Destinação Final (Retorno CDFs)',
    responsavel: 'Coord. Logística',
    prazo: '5 dias restantes',
    prazoAlerta: true,
    status: 'Atenção',
    statusClass: 'bg-rose-100 text-rose-800'
  },
  {
    id: 3,
    codigo: 'COND-02/2026',
    titulo: 'Protocolo de renovação da Licença de Operação',
    responsavel: 'Gestor Ambiental',
    prazo: '115 dias restantes',
    prazoAlerta: false,
    status: 'Conforme',
    statusClass: 'bg-emerald-100 text-emerald-800'
  }
])

const naoConformidadesLista = ref([
  {
    id: 1,
    codigo: 'NC-2026-004',
    criticidade: 'MÉDIA',
    criticidadeClass: 'bg-amber-100 text-amber-800',
    data: 'Ontem às 16:30',
    titulo: 'Atraso de CDF da Cerâmica Rio Verde',
    acaoRequerida: 'Notificar parceiro destinador antes de bloquear novos envios.'
  }
])
</script>