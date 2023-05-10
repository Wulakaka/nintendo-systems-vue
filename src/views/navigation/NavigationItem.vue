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

const x2 = computed(
  () =>
    centerY.value / Math.tan(a.value) +
    r * (Math.cos(a.value) / Math.tan(a.value) + Math.sin(a.value))
)

const dl = computed(() => {
  if (x1.value > 0) return `M -100,0 Q ${x2.value},0 ${x1.value},${y1.value} v ${-y1.value} z`
  return `M -100,0 Q ${x2.value},0 ${x1.value},${y1.value} z`
})
const dr = computed(() => {
  if (x1.value > 0) return `M 100,0 Q ${-x2.value},0 ${-x1.value},${y1.value} v ${-y1.value} z`
  return `M 100,0 Q ${-x2.value},0 ${-x1.value},${y1.value} z`
})

const d = computed(
  () =>
    `M -100,0 Q ${x2.value},0 ${x1.value},${y1.value} L ${-x1.value},${
      y1.value
    } Q ${-x2.value},0 100,0 V 100 H -200 Z`
)

const pause = ref(false)

function step() {
  const delta = 8e-3
  if (!pause.value) {
    t.value -= delta
  } else {
    t.value += delta
  }

  t.value = t.value < 0 ? 0 : t.value > 1 ? 1 : t.value

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
    <!--    <rect width="200" height="200" x="-100" y="-100" fill="aliceblue"></rect>-->
    <path :d="d" fill="aliceblue" fill-rule="evenodd"></path>
    <circle :r="r" cx="0" :cy="centerY" fill="aliceblue"></circle>

    <g fill="white">
      <path :d="dl"></path>
      <path :d="dr"></path>
    </g>
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
