<script setup lang="ts">
// 存储操作的栈
import { onBeforeUnmount, onMounted, ref } from 'vue'
import img from '@/assets/spiderman.jpg'
import Paint from '@/views/paint/Paint'
import loadImage from '@/views/paint/loadImage'
import DrawCircle from '@/views/paint/DrawCircle'
import DrawRect from '@/views/paint/DrawRect'
import DrawArrow from '@/views/paint/DrawArrow'

const canvas = ref()
const paint = new Paint()
const drawCircle = new DrawCircle(paint)
const drawRect = new DrawRect(paint)
const drawArrow = new DrawArrow(paint)
function keydownHandler(e: KeyboardEvent) {
  if (e.key === 'z') {
    paint.revoke()
  }
}

onMounted(async () => {
  const ele = canvas.value
  // 设置画布元素
  paint.el = ele

  // 加载背景图
  const bg = await loadImage(img)
  paint.setBackground(bg)

  // 开启绘制圆形功能
  // drawCircle.el = ele
  // drawCircle.addListeners()
  // 开启绘制矩形功能
  // drawRect.el = ele
  // drawRect.addListeners()
  // 开启绘制箭头功能
  drawArrow.el = ele
  drawArrow.addListeners()

  // 撤销功能
  document.addEventListener('keydown', keydownHandler)
})

onBeforeUnmount(() => {
  drawCircle.removeListeners()
  drawRect.removeListeners()
  drawArrow.removeListeners()
  document.removeEventListener('keydown', keydownHandler)
})
</script>

<template>
  <div class="flex p-10">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style scoped lang="scss"></style>
