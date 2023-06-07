<script setup lang="ts">
// 存储操作的栈
import { onBeforeUnmount, onMounted, ref } from 'vue'
import img from '@/assets/spiderman.jpg'
import Paint from '@/views/paint/Paint'
import loadImage from '@/views/paint/loadImage'
import DrawCircle from '@/views/paint/DrawCircle'

// 加载图片
// 每次渲染完再存储

const canvas = ref()
const paint = new Paint()
const drawCircle = new DrawCircle(paint)
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
  drawCircle.el = ele
  drawCircle.addListeners()

  // 撤销功能
  document.addEventListener('keydown', keydownHandler)
})

onBeforeUnmount(() => {
  drawCircle.removeListeners()
  document.removeEventListener('keydown', keydownHandler)
})
</script>

<template>
  <div class="flex p-10">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style scoped lang="scss"></style>
