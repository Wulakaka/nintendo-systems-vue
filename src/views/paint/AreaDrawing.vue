<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Paint from '@/views/paint/Paint'
import DrawEllipse from '@/views/paint/DrawEllipse'
import DrawRect from '@/views/paint/DrawRect'
import DrawArrow from '@/views/paint/DrawArrow'
import TextCover from '@/views/paint/TextCover.vue'

const canvas = ref()
const paint = new Paint()
const drawEllipse = new DrawEllipse(paint)
const drawRect = new DrawRect(paint)
const drawArrow = new DrawArrow(paint)

const isActivateText = ref(false)

function keydownHandler(e: KeyboardEvent) {
  if (e.key === 'z') {
    paint.revoke()
  }
}

onMounted(async () => {
  const ele = canvas.value
  paint.el = ele
  drawRect.el = ele
  drawEllipse.el = ele
  drawArrow.el = ele

  // 撤销功能
  document.addEventListener('keydown', keydownHandler)
})

function removeAllListeners() {
  drawEllipse.removeListeners()
  drawRect.removeListeners()
  drawArrow.removeListeners()
}

onBeforeUnmount(() => {
  removeAllListeners()
  document.removeEventListener('keydown', keydownHandler)
})

// 加载背景图
function loadBg(bg: HTMLImageElement) {
  paint.setBackground(bg)
}

function activateDrawing(type: 'rect' | 'ellipse' | 'arrow' | 'text' | null) {
  isActivateText.value = false
  removeAllListeners()
  switch (type) {
    case 'rect':
      drawRect.addListeners()
      break
    case 'ellipse':
      drawEllipse.addListeners()
      break
    case 'arrow':
      drawArrow.addListeners()
      break
    case 'text':
      isActivateText.value = true
      break
    default:
  }
}

defineExpose({
  loadBg,
  activateDrawing
})
</script>

<template>
  <div class="flex relative">
    <canvas ref="canvas"></canvas>
    <TextCover v-show="isActivateText"></TextCover>
  </div>
</template>

<style scoped lang="scss"></style>
