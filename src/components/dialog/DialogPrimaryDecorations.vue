<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, toRefs } from 'vue'
const props = defineProps<{
  width: number
  height: number
}>()

const { width, height } = toRefs(props)

const {
  viewBox: innerViewBox,
  squareX,
  squareY,
  leftArrowPath,
  rightArrowPath,
  rectWidth,
  rectHeight,
  rectX1,
  rectX2,
  rectY1,
  rectY2,
  rectY3,
} = useDecoration(width, height)

// 装饰元素
function useDecoration(width: Ref<number>, height: Ref<number>) {
  const w = computed(() => width.value)
  const h = computed(() => height.value)
  // 内部点缀
  const viewBox = computed(() => `${-w.value / 2} ${-h.value / 2} ${w.value} ${h.value}`)

  const squareX = computed(() => -w.value / 2 + 108)
  const squareY = computed(() => -h.value / 2 + 34)

  const arrowX = computed(() => -w.value / 2 + 12)
  const arrowY = computed(() => h.value / 2 - 13)

  const leftArrowPath = computed(() => {
    const x = arrowX.value
    const y = arrowY.value
    return `M ${x},${y} v -10 l 12,10 z`
  })
  const rightArrowPath = computed(() => {
    const x = -arrowX.value
    const y = arrowY.value
    return `M ${x},${y} v -10 l -12,10 z`
  })

  const rectHeight = 78
  const rectWidth = 6
  const rectGap = 10
  const rectX1 = computed(() => -w.value / 2 + 12)
  const rectX2 = computed(() => -rectX1.value - rectWidth)
  const rectY1 = computed(() => -rectHeight / 2 - rectGap - rectHeight)
  const rectY2 = computed(() => rectY1.value + rectGap + rectHeight)
  const rectY3 = computed(() => rectY2.value + rectGap + rectHeight)

  return {
    viewBox,
    squareX,
    squareY,
    leftArrowPath,
    rightArrowPath,
    rectWidth,
    rectHeight,
    rectX1,
    rectX2,
    rectY1,
    rectY2,
    rectY3,
  }
}
</script>

<template>
  <svg :viewBox="innerViewBox">
    <defs>
      <filter id="dialog-primary-shadow-blue" width="36" height="36" x="-12" y="-12" filterUnits="objectBoundingBox">
        <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#00F9FC" />
      </filter>
      <filter id="dialog-primary-shadow-white" width="36" height="36" x="-12" y="-12" filterUnits="objectBoundingBox">
        <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="white" fill-opacity="0.5" />
      </filter>
    </defs>
    <g fill="#20aef8" filter="url(#dialog-primary-shadow-blue)">
      <rect :x="squareX" :y="squareY" width="12" height="12"></rect>
      <rect :x="squareX + 24" :y="squareY" width="12" height="12"></rect>
      <rect :x="squareX + 48" :y="squareY" width="12" height="12"></rect>
      <path :d="leftArrowPath"></path>
      <path :d="rightArrowPath"></path>
    </g>
    <g fill="#ffffff" filter="url(#dialog-primary-shadow-white)" opacity="0.7">
      <rect :x="-squareX" :y="squareY" width="12" height="12"></rect>
      <rect :x="-squareX - 24" :y="squareY" width="12" height="12"></rect>
      <rect :x="-squareX - 48" :y="squareY" width="12" height="12"></rect>
    </g>
    <g fill="#20AEF8">
      <rect :x="rectX1" :y="rectY2" :width="rectWidth" :height="rectHeight"></rect>
      <rect :x="rectX2" :y="rectY2" :width="rectWidth" :height="rectHeight"></rect>
      <g opacity="0.2">
        <rect :x="rectX1" :y="rectY1" :width="rectWidth" :height="rectHeight"></rect>
        <rect :x="rectX1" :y="rectY3" :width="rectWidth" :height="rectHeight"></rect>
        <rect :x="rectX2" :y="rectY1" :width="rectWidth" :height="rectHeight"></rect>
        <rect :x="rectX2" :y="rectY3" :width="rectWidth" :height="rectHeight"></rect>
      </g>
    </g>
  </svg>
</template>

<style scoped lang="scss"></style>
