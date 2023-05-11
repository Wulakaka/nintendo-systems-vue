<script setup lang="ts">
import { computed, ref } from 'vue'
import * as d3 from 'd3'

const t = ref(0)

const centerY = computed(() => {
  const max = -89
  const min = 50
  const _t = d3.easeCubicInOut(t.value)
  return min + _t * (max - min)
})
const r = 50

const maxBottom = -40
const k = Math.PI / (maxBottom - 100)
const b = -Math.PI - k * 100

const a = computed(() => {
  const bottom = centerY.value + 50
  return bottom * k + b
})

const x1 = computed(() => r * Math.sin(a.value))
const y1 = computed(() => r * Math.cos(a.value) + centerY.value)

const x2 = computed(() => {
  return (
    centerY.value / Math.tan(a.value) +
    r * (Math.cos(a.value) / Math.tan(a.value) + Math.sin(a.value))
  )
})

const d = computed(
  () =>
    `M -100,0 L ${x1.value},${y1.value} L ${-x1.value},${
      y1.value
    } Q ${-x2.value},0 100,0 L -100,0 z`
)

// 使用剪切，只绘制左侧曲线
const clipD = computed(
  () =>
    `M -100,0 Q ${x2.value},0 ${x1.value},${y1.value} L ${-x1.value},${y1.value} L 100,0 L -100,0 z`
)

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
</script>

<template>
  <svg
    viewBox="-100 -200 200 300"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    @mouseover="pause = true"
    @mouseleave="pause = false"
  >
    <clipPath :id="id">
      <path :d="clipD"></path>
    </clipPath>
    <path :d="d" fill="aliceblue" fill-rule="evenodd" :clip-path="`url(#${id})`"></path>
    <rect width="200" height="100" x="-100" y="0" fill="aliceblue"></rect>
    <circle :r="r" cx="0" :cy="centerY" fill="aliceblue"></circle>

    <!--    <g fill="white" stroke="red">
      <path :d="dl"></path>
      <path :d="dr"></path>
    </g>-->
    <!--    <g fill="aliceblue">
          <rect width="200" height="100" x="-100" y="0"></rect>
          <circle :r="r" cx="0" :cy="centerY"></circle>
        </g>-->
    <!--    <circle r="2" :cx="x1" :cy="y1" fill="red"></circle>
    <circle r="2" :cx="x2" :cy="0" fill="green"></circle>-->
    <!--    <line :x1="x1" :y1="y1" :x2="x2" y2="0" stroke="black" stroke-width="1" fill="none"></line>-->
  </svg>
</template>

<style scoped lang="scss"></style>
