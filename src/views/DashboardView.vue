<template>
  <div class="p-6 bg-gray-50 min-h-screen text-gray-800">
    <header class="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Painel do Cliente</h1>
        <p class="text-sm text-gray-500">Bem-vindo de volta! Acompanhe o consumo e a economia do uso de LETA.</p>
      </div>
      <div class="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-sm font-medium text-gray-600">
        📅 {{ dataAtual }}
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-400 uppercase tracking-wider">LETA Consumido</p>
          <h3 class="text-3xl font-bold text-gray-900 mt-1">{{ metricas.totalConsumido }} <span class="text-lg font-normal text-gray-500">Ton</span></h3>
          <p class="text-xs text-green-600 mt-2 font-medium">↑ 12% em relação ao mês passado</p>
        </div>
        <div class="p-4 bg-blue-50 text-blue-600 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13.5a3 3 0 100-6 3 3 0 000 6z" />
          </svg>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-400 uppercase tracking-wider">Economia Total</p>
          <h3 class="text-3xl font-bold text-emerald-600 mt-1">R$ {{ metricas.economiaTotal }}</h3>
          <p class="text-xs text-gray-500 mt-2">Matéria-prima gratuita (paga apenas frete)</p>
        </div>
        <div class="p-4 bg-emerald-50 text-emerald-600 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-400 uppercase tracking-wider">Impacto Ambiental</p>
          <h3 class="text-3xl font-bold text-gray-900 mt-1">{{ metricas.residuoEvitado }} <span class="text-lg font-normal text-gray-500">m³</span></h3>
          <p class="text-xs text-emerald-600 mt-2 font-medium">De resíduos evitados em aterros</p>
        </div>
        <div class="p-4 bg-amber-50 text-amber-600 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-bold text-gray-900">Histórico de Economia (R$)</h3>
          <span class="text-xs text-gray-400">Últimos 4 meses</span>
        </div>
        
        <div class="flex items-end justify-between h-48 pt-4 px-4">
          <div v-for="mes in historicoEconomia" :key="mes.nome" class="flex flex-col items-center flex-1 group">
            <div class="w-12 bg-emerald-100 group-hover:bg-emerald-500 transition-colors duration-200 rounded-t-lg relative" :style="{ height: mes.porcentagem + '%' }">
              <span class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                R$ {{ mes.valor }}
              </span>
            </div>
            <span class="text-xs text-gray-500 mt-2 font-medium">{{ mes.nome }}</span>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 class="text-lg font-bold text-gray-900 mb-4">Pedidos em Andamento</h3>
        <div class="space-y-4">
          <div v-for="pedido in pedidosAtivos" :key="pedido.id" class="p-4 border border-gray-50 bg-gray-50 rounded-xl flex flex-col gap-2">
            <div class="flex justify-between items-center">
              <span class="text-xs font-semibold px-2 py-1 rounded-md" :class="pedido.statusClass">
                {{ pedido.status }}
              </span>
              <span class="text-xs text-gray-400">{{ pedido.tempo }}</span>
            </div>
            <p class="text-sm font-bold text-gray-800">{{ pedido.lote }}</p>
            <p class="text-xs text-gray-500">Origem: {{ pedido.origem }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Data atual formatada para o cabeçalho
const dataAtual = ref(new Date().toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' }))

// Dados fictícios (Mock) para o MVP
const metricas = ref({
  totalConsumido: '148.5',
  economiaTotal: '32.600,00',
  residuoEvitado: '98.2'
})

const historicoEconomia = ref([
  { nome: 'Fevereiro', valor: '5.200', porcentagem: 40 },
  { nome: 'Março', valor: '7.800', porcentagem: 60 },
  { nome: 'Abril', valor: '9.100', porcentagem: 75 },
  { nome: 'Maio', valor: '10.500', porcentagem: 90 }
])

const pedidosAtivos = ref([
  {
    id: 1,
    lote: 'Lote #LETA-2026-04',
    origem: 'ETA Meia Ponte',
    status: 'A caminho',
    statusClass: 'bg-green-100 text-green-700',
    tempo: '25 min restantes'
  },
  {
    id: 2,
    lote: 'Lote #LETA-2026-05',
    origem: 'ETA João Leite',
    status: 'Carregando',
    statusClass: 'bg-amber-100 text-amber-700',
    tempo: 'Aguardando saída'
  }
])
</script>