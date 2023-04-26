<script setup lang="ts">
import RippleItem from '@/components/ripple/RippleItem.vue'
import { ref } from 'vue'
import Source from '@/components/ripple/Source'
import * as d3 from 'd3'
const interpolatorTransform = d3.interpolateTransformCss('scale(1) rotate(1turn)', 'scale(0.5)')

const interpolatorColor = d3.interpolateRgb('red', 'blue')
console.log(interpolatorColor(0.5))

const row = 20

const ts = ref(new Array(row * row).fill(0))

let sources: Source[] = []

let reqId: number
function handleClick({ x, y }: { x: number; y: number }) {
  sources.push(new Source(x, y, Math.round(row * Math.pow(2, 0.5)), 0.2))

  cancelAnimationFrame(reqId)
  reqId = requestAnimationFrame(update)
}

function update() {
  sources = sources.filter((s) => !s.isUseless)
  if (!sources.length) {
    return
  }
  const idSet = sources.reduce((set, s) => {
    s.getPoints().forEach((i) => {
      set.add(i)
    })
    return set
  }, new Set())
  ts.value = ts.value.map((i, index) => {
    if (i) {
      i -= 0.1
    }

    if (1e-5 > i) i = 0

    const x = index % row
    const y = Math.floor(index / row)
    const key = `${x},${y}`
    if (idSet.has(key)) {
      i = 1
    }
    return i
  })

  reqId = requestAnimationFrame(update)
}
</script>
<template>
  <div class="ripple">
    <RippleItem
      v-for="(i, index) in ts"
      :key="index"
      @click="handleClick"
      :t="i"
      :interpolator-transform="interpolatorTransform"
    ></RippleItem>
  </div>
</template>
<style scoped lang="scss">
.ripple {
  width: 600px;
  height: 600px;
  display: grid;
  grid-template-columns: repeat(v-bind(row), 1fr);
  grid-template-rows: repeat(v-bind(row), 1fr);
}
</style>
