<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import CoverDrawing from '@/views/paint/CoverDrawing'
import type { Rect } from '@/views/paint/types'

const emit = defineEmits<{
  (e: 'cut', val: Rect): void
}>()

const el = ref()
const canvas = ref()
const drawing = new CoverDrawing()

const startX = ref(0)
const startY = ref(0)
const endX = ref(0)
const endY = ref(0)

const x = computed(() => Math.min(startX.value, endX.value))
const y = computed(() => Math.min(startY.value, endY.value))
const width = computed(() => Math.abs(endX.value - startX.value))
const height = computed(() => Math.abs(endY.value - startY.value))

function handleMouseDown(e: MouseEvent) {
  startX.value = endX.value = e.offsetX
  startY.value = endY.value = e.offsetY
  el.value.addEventListener('mousemove', mousemoveHandler)
}

function handleMouseUp(e: MouseEvent) {
  endX.value = e.offsetX
  endY.value = e.offsetY
  el.value.removeEventListener('mousemove', mousemoveHandler)
}

function mousemoveHandler(e: MouseEvent) {
  endX.value = e.offsetX
  endY.value = e.offsetY

  drawRect()
}
// 在canvas上绘制
function drawRect() {
  drawing.drawRect(x.value, y.value, width.value, height.value)
}

onMounted(() => {
  drawing.init(canvas.value)
})

onBeforeUnmount(() => {
  emit('cut', {
    x: x.value,
    y: y.value,
    width: width.value,
    height: height.value
  })
})
</script>

<template>
  <div
    class="absolute w-full h-full left-0 top-0"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    ref="el"
  >
    <canvas ref="canvas" class="w-full h-full opacity-50"></canvas>
    <!--    <div-->
    <!--      class="absolute bg-red-200 left-0 top-0 pointer-events-none"-->
    <!--      :style="{-->
    <!--        transform: `translateX(${x}px) translateY(${y}px)`,-->
    <!--        width: `${width}px`,-->
    <!--        height: `${height}px`-->
    <!--      }"-->
    <!--    ></div>-->
  </div>
</template>

<style scoped lang="scss"></style>
