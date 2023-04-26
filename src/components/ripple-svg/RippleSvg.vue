<script setup lang="ts">
import RippleSvgItem from '@/components/ripple-svg/RippleSvgItem.vue'
import { ref } from 'vue'
import Source from '@/components/ripple/Source'

const row = 100
const items = ref(getItems(row))

function getItems(count: number): { x: number; y: number; id: string; t: number }[] {
  return new Array(Math.pow(count, 2)).fill(null).map((_, index) => {
    const x = index % count
    const y = Math.floor(index / count)
    return {
      id: `${x},${y}`,
      x,
      y,
      t: 0
    }
  })
}

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
  items.value.forEach((i) => {
    if (i.t) {
      i.t -= 0.1
    }
    if (1e-5 > i.t) i.t = 0
    if (idSet.has(i.id)) {
      i.t = 1
    }
  })

  reqId = requestAnimationFrame(update)
}
</script>
<template>
  <svg viewBox="0 0 1000 1000" width="800" height="800">
    <RippleSvgItem
      v-for="i in items"
      :key="i.id"
      :data="i"
      :size="50"
      @click="handleClick(i)"
    ></RippleSvgItem>
  </svg>
</template>
<style scoped></style>
