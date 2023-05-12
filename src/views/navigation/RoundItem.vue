<script setup lang="ts">
import { computed, Ref, ref, watch, watchEffect } from 'vue'
import * as d3 from 'd3'
import { getB, getIntersectionPoint, getKB } from '@/views/navigation/utils'

const t = ref(0)

const R = 100
const r = 50
const dr = 15
const offsetY = 40

const { cX1, cY1, dL } = useBubble2(t, R, r, dr, offsetY)

const id = 'path' + ((Math.random() * 100) & 1) + performance.now()

const pause = ref(false)

let isGoingDown = true
function update() {
  const delta = 4e-3
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

// 贝塞尔曲线的方式，但是无法处理两圆离开后的问题
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

/** 使用公切圆
 *
 * @param t
 * @param R
 * @param r
 * @param dr 制作弧形的圆半径
 * @param offsetY 最大偏移距离
 *
 */
function useBubble2(t: Ref<number>, R: number, r: number, dr: number, offsetY: number) {
  // 大圆圆心
  const cX0 = 0
  const cY0 = 0
  // 小圆圆心X
  const cX1 = 0
  // 小圆圆心Y
  const cY1 = computed(() => {
    const min = R - r
    const max = R + r + offsetY
    return min + (max - min) * t.value
  })
  // 公切圆圆心Y
  const cYD = computed(() => {
    const ys = cY1.value
    return (Math.pow(R + dr, 2) - Math.pow(r + dr, 2) + Math.pow(ys, 2)) / (2 * ys)
  })
  // 公切圆圆心X
  const cXD = computed(() => Math.pow(Math.pow(R + dr, 2) - Math.pow(cYD.value, 2), 1 / 2))

  // 两个公切圆的交点，靠近大圆一侧
  const y0 = computed(() => {
    if (cXD.value > dr) return 0
    return cYD.value - Math.pow(Math.pow(dr, 2) - Math.pow(cXD.value, 2), 1 / 2)
  })
  // 两个公切圆的交点，靠近小圆一侧
  const y1 = computed(() => {
    if (cXD.value > dr) return 0
    return cYD.value + Math.pow(Math.pow(dr, 2) - Math.pow(cXD.value, 2), 1 / 2)
  })

  // 大圆上的公切点X
  const tX0 = computed(() => (cXD.value * R) / (R + dr))
  // 大圆上的公切点Y
  const tY0 = computed(() => (cYD.value * R) / (R + dr))

  // 小圆上的公切点X
  const tX1 = computed(() => (cXD.value * r) / (r + dr))
  // 小圆上的公切点Y
  const tY1 = computed(() => {
    const { k, b } = getKB(cX1, cY1.value, cXD.value, cYD.value)
    return k * tX1.value + b
  })

  const dL = computed(() => {
    if (!cXD.value) return ''
    if (cXD.value > dr || cY1.value < R) {
      return `M ${tX1.value},${tY1.value} A ${dr} ${dr} 0 0 1 ${tX0.value},${
        tY0.value
      } H ${-tX0.value} A ${dr} ${dr} 0 0 1 ${-tX1.value},${tY1.value}  z`
    } else {
      const up = `M 0,${y1.value} A ${dr} ${dr} 0 0 0 ${tX1.value},${
        tY1.value
      } A ${r} ${r} 0 0 0 ${-tX1.value},${tY1.value} A ${dr} ${dr} 0 0 0 0,${y1.value}`

      const down = `M 0,${y0.value} A ${dr} ${dr} 0 0 1 ${tX0.value},${
        tY0.value
      } A ${R} ${R} 0 0 1 ${-tX0.value},${tY0.value} A ${dr} ${dr} 0 0 1 0,${y0.value}`
      return `${up} ${down} Z`
    }
  })

  return {
    cXD,
    cYD,
    cX1,
    cY1,
    dL,
    tX1,
    tY1
  }
}
</script>

<template>
  <svg
    viewBox="-300 -300 600 600"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    @mouseover="pause = true"
    @mouseleave="pause = false"
  >
    <circle cx="0" cy="0" :r="R" fill="aliceblue"></circle>

    <g fill="aliceblue">
      <circle :cx="cX1" :cy="cY1" :r="r"></circle>
      <path :d="dL"></path>
    </g>
    <g fill="aliceblue" style="transform: rotate(90deg)">
      <circle :cx="cX1" :cy="cY1" :r="r"></circle>
      <path :d="dL"></path>
    </g>
  </svg>
</template>

<style scoped lang="scss"></style>
