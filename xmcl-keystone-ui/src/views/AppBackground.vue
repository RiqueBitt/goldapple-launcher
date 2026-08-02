<template>
  <div
    class="absolute z-0 h-full w-full"
    :style="{ background: backgroundColor }"
  />
</template>
<script lang="ts" setup>
// Sem video, gif, imagem ou particulas de fundo — so a cor solida configurada
// no tema (Configuracoes > Tema). Muda com o tema: se voce trocar a cor de
// fundo la (inclusive pra branco), o launcher inteiro reflete isso aqui.
import { injection } from '@/util/inject'
import { kTheme } from '@/composables/theme'

const { backgroundColor } = injection(kTheme)
</script>
