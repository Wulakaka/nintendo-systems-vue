<script setup lang="ts">
import AreaDrawing from '@/views/paint/AreaDrawing.vue'
import AreaOperating from '@/views/paint/AreaOperating.vue'
import img from '@/assets/spiderman.jpg'
import loadImage from '@/views/paint/loadImage'
import { onMounted, ref } from 'vue'

const drawing = ref()

onMounted(async () => {
  const bg = await loadImage(img)
  drawing.value.loadBg(bg)
})

function handleActivate(type: 'rect' | 'ellipse' | 'arrow' | 'text') {
  drawing.value.activateDrawing(type)
}

function handleDownload() {
  drawing.value.download()
}

function handleConfirm() {
  drawing.value.copy()
}

function handleFlip(type: 'v' | 'h') {
  drawing.value.flip(type)
}
</script>

<template>
  <div>
    <AreaDrawing ref="drawing"></AreaDrawing>
    <AreaOperating
      @activate="handleActivate"
      @download="handleDownload"
      @confirm="handleConfirm"
      @flip="handleFlip"
    ></AreaOperating>
  </div>
</template>

<style scoped lang="scss"></style>
