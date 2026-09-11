<template>
  <div class="m-8 flex flex-col items-center justify-center">
    <!--
      Item pedido: "melhore o carregamento do launcher deixando mais
      rápido e mais bonito" — trocado os 3 círculos concêntricos
      genéricos (sem relação nenhuma com a marca, e cada um sua própria
      animação "indeterminate" própria do Vuetify rodando ao mesmo
      tempo) por um único anel de progresso, mais leve de renderizar, com
      o logo PC (verde suave, mesmo da instalação/ícone do app) pulsando
      suavemente no centro — dá uma identidade visual própria pro
      carregamento em vez de um spinner genérico que poderia ser de
      qualquer app.
    -->
    <div class="relative mt-8 flex items-center justify-center pc-loading-ring">
      <v-progress-circular
        color="primary"
        :size="76"
        :width="4"
        indeterminate
      />
      <img
        src="../assets/icons/pc-logo-green.png"
        class="absolute pc-loading-logo"
        alt=""
      >
    </div>
    <slot />
  </div>
</template>
<script setup lang="ts">
defineProps<{
  texts: (string| number)[]
  hint?: string
  secondaryHint?: boolean
}>()
</script>
<style scoped>
.pc-loading-logo {
  width: 34px;
  height: auto;
  animation: pc-loading-pulse 1.6s ease-in-out infinite;
}
@keyframes pc-loading-pulse {
  0%, 100% { opacity: 0.55; transform: scale(0.92); }
  50% { opacity: 1; transform: scale(1); }
}
</style>
