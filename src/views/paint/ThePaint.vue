<script setup lang="ts">
import AreaDrawing from '@/views/paint/AreaDrawing.vue'
import AreaOperating from '@/views/paint/AreaOperating.vue'
import { onMounted, ref } from 'vue'

const drawing = ref()
const revocable = ref(false)
const video = ref()

onMounted(() => {
  video.value.addEventListener('loadeddata', () => {
    setTimeout(() => {
      drawing.value.loadBg(video.value)
    }, 1000)
  })
})

function handleActivate(type: 'rect' | 'ellipse' | 'arrow' | 'text' | 'cut') {
  drawing.value.activate(type)
}

function handleDownload() {
  drawing.value.download()
}

function handleConfirm() {
  drawing.value.activate(null)
  // drawing.value.copy()
}

function handleFlip(type: 'v' | 'h') {
  drawing.value.flip(type)
}

function handleRevoke() {
  drawing.value.revoke()
}
</script>

<template>
  <div>
    <div class="flex justify-center">
      <AreaDrawing ref="drawing" v-model:revocable="revocable"></AreaDrawing>
    </div>
    <AreaOperating
      @activate="handleActivate"
      @download="handleDownload"
      @confirm="handleConfirm"
      @flip="handleFlip"
      @revoke="handleRevoke"
      :revocable="revocable"
    ></AreaOperating>
    <video
      ref="video"
      crossorigin="anonymous"
      src="https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4"
    ></video>
  </div>
</template>

<style scoped lang="scss"></style>
