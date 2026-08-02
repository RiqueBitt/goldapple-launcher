<template>
  <div class="absolute z-0 h-full w-full" :style="{ background: backgroundColor }">
    <transition name="fade-transition">
      <img
        v-if="backgroundImage?.type === 'image' && backgroundType === BackgroundType.IMAGE"
        :key="backgroundImage.url"
        :src="backgroundImage.url"
        class="absolute z-0 h-full w-full"
        :style="{ filter: `blur(${blur}px)`, 'object-fit': backgroundImageFit }"
      >
    </transition>
  </div>
</template>
<script lang="ts" setup>
// Sem video/gif/particulas de fundo (removidos de proposito). Mas voce pode
// colocar uma foto como wallpaper em Configuracoes > Tema > Fundo > Imagem —
// isso aqui e o que realmente desenha essa imagem na tela. Sem imagem
// selecionada, cai na cor solida do tema (que muda se voce trocar o tema).
import { injection } from '@/util/inject'
import { kTheme, BackgroundType } from '@/composables/theme'

const { backgroundColor, backgroundImage, backgroundType, blur, backgroundImageFit } = injection(kTheme)
</script>
