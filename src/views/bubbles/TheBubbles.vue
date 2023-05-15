<script setup lang="ts">
import { reactive, ref } from 'vue'
import * as d3 from 'd3'
import Bubble from './Bubble'
import TheBubble from '@/views/bubbles/TheBubble.vue'

const R = 100
const dr = 15
const interval = 300
const length = 12

const bubbles = new Array(length).fill(null).map((_, index) => {
  const rotate = (360 / length) * index
  const r = (20 - 10) * Math.random() + 15
  const offset = (60 - 10) * Math.random() + 40

  return reactive(new Bubble(r, R, dr, offset, rotate))
})
let timers: number[] = []
function start() {
  timers = bubbles.map((b, index) => {
    return setTimeout(() => {
      b.start()
    }, index * interval)
  })
}

function stop() {
  bubbles.forEach((b, index) => {
    b.stop()
  })
  timers.forEach((t) => {
    clearTimeout(t)
  })
}

const isPaused = ref(true)
function handleClick() {
  isPaused.value = !isPaused.value
  if (isPaused.value) {
    stop()
  } else {
    start()
  }
}
</script>

<template>
  <svg
    viewBox="-300 -300 600 600"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    @click="handleClick"
  >
    <circle cx="0" cy="0" :r="R" fill="var(--fill-bubble-big)"></circle>

    <TheBubble
      v-for="(b, index) in bubbles"
      :key="index"
      :rotate="b.rotate"
      :t="d3.easeCubicInOut(b.t)"
      :dr="b.dr"
      :r="b.r"
      :outer-r="b.R"
      :offset="b.offset"
    ></TheBubble>
  </svg>
</template>

<style scoped lang="scss">
svg {
  --fill-bubble-big: #4dbbb9;
  --fill-bubble-small: #0879e4;
  --bg-bubble: white;
}
</style>
