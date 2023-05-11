<script setup lang="ts">
import { computed, Ref, ref, watchEffect } from 'vue'
import * as d3 from 'd3'
import { getB, getIntersectionPoint, getKB } from '@/views/navigation/utils'

const t = ref(0.6)

const R = 100
const r = 50

const { cX1, cY1, XTangentPoint, dL, dR, x1, y1, x0, y0 } = useBubble(t, R, r, 20)

const id = 'path' + ((Math.random() * 100) & 1) + performance.now()

const pause = ref(false)

let isGoingDown = true
function update() {
  const delta = 1e-3
  if (isGoingDown) {
    t.value += delta
  } else {
    t.value -= delta
  }
  if (t.value > 1) {
    isGoingDown = false
    t.value = 1
  } else if (t.value < 0) {
    isGoingDown = true
    t.value = 0
  }
}

function step() {
  if (!pause.value) {
    update()
  }

  requestAnimationFrame(step)
}
step()

function useBubble(t: Ref<number>, R: number, r: number, offsetY: number) {
  // 大圆圆心
  const cX0 = 0
  const cY0 = 0
  // 小圆圆心
  const cX1 = 0
  const cY1 = computed(() => {
    const min = R - r
    const max = R + r + offsetY + 5
    return min + (max - min) * t.value
  })

  // 两圆交点
  const Xy = computed(() => {
    const ys = cY1.value
    return (Math.pow(R, 2) - Math.pow(r, 2) + Math.pow(ys, 2)) / (2 * ys)
  })
  const Xx = computed(() => Math.pow(Math.pow(R, 2) - Math.pow(Xy.value, 2), 1 / 2))
  // 小圆上的交点
  const Xy1 = computed(() => (Xy.value > R ? cY1.value - r : Xy.value))

  // 交点对应的小圆的弧度
  const a1 = computed(() => Math.acos((Xy1.value - cY1.value) / r))
  // 小圆经过偏移后的弧度
  const b1 = computed(() => {
    // todo
    return a1.value * 0.8
    if (Xy.value < R) {
      // 仍有交点
      return a1.value * 0.8
    } else {
      let rate = (Xy1.value - R) / offsetY
      rate *= Math.PI * 0.2
      return Math.min(Math.PI * 0.8 + rate, Math.PI)
    }
  })

  // 小圆上的切点
  const x1 = computed(() => r * Math.sin(b1.value))
  const y1 = computed(() => cY1.value + r * Math.cos(b1.value))

  const tangent1K = computed(() => -Math.tan(b1.value))
  const tangent1B = computed(() => getB(tangent1K.value, x1.value, y1.value))

  const Xy0 = computed(() => (Xy.value > R ? R : Xy.value))

  // 交点对应的大圆的弧度
  const a0 = computed(() => Math.acos(Xy0.value / R))
  // 交点对应的大圆的最大弧度
  const a0Max = Math.asin(r / R)

  // 大圆经过偏移后的弧度
  const b0 = computed(() => {
    // todo
    return a0.value * 0.5 + a0Max
    if (Xy.value < R) {
      // 存在交点
      if (a1.value < Math.PI / 2) {
        return a0.value * 1.5
      }
      return a0.value * 0.5 + a0Max
    } else {
      let rate = (Xy1.value - R) / offsetY
      rate *= Math.PI * 0.5
      rate = rate > 1 ? 1 : rate

      return a0Max - a0Max * rate
    }
  })
  // 大圆切点
  const x0 = computed(() => R * Math.sin(b0.value))
  const y0 = computed(() => R * Math.cos(b0.value))

  const tangent0K = computed(() => -Math.tan(b0.value))
  const tangent0B = computed(() => getB(tangent0K.value, x0.value, y0.value))

  const XTangentPoint = computed(() =>
    getIntersectionPoint(tangent1K.value, tangent1B.value, tangent0K.value, tangent0B.value)
  )

  const dL = computed(
    () =>
      `M ${x0.value},${y0.value} Q ${XTangentPoint.value.x}, ${XTangentPoint.value.y} ${x1.value},${y1.value} L 0, ${y1.value} L 0,${y0.value} Z`
  )
  const dR = computed(
    () =>
      `M ${-x0.value},${y0.value} Q ${-XTangentPoint.value.x}, ${
        XTangentPoint.value.y
      } ${-x1.value},${y1.value} L 0, ${y1.value} L 0,${y0.value} Z`
  )

  return {
    cX1,
    cY1,
    XTangentPoint,
    dL,
    dR,
    x0,
    y0,
    x1,
    y1
  }
}
</script>

<template>
  <svg
    viewBox="-200 -200 400 400"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    @mouseover="pause = true"
    @mouseleave="pause = false"
  >
    <circle cx="0" cy="0" :r="R" fill="aliceblue" stroke-width="1" stroke="black"></circle>
    <circle :cx="cX1" :cy="cY1" :r="r" fill="aliceblue" stroke-width="1" stroke="black"></circle>

    <!--    <path :d="dL" fill="aliceblue"></path>-->
    <!--    <path :d="dR" fill="aliceblue"></path>-->
    <circle :cx="XTangentPoint.x" :cy="XTangentPoint.y" r="1" fill="blue"></circle>
    <circle :cx="x0" :cy="y0" r="1" fill="green"></circle>
    <circle :cx="x1" :cy="y1" r="1" fill="red"></circle>
    <line :x1="x1" :y1="y1" :x2="cX1" :y2="cY1" stroke="black"></line>
  </svg>
</template>

<style scoped lang="scss"></style>
