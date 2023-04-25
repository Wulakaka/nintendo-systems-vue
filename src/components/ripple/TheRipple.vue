<script setup lang="ts">
import RippleItem from '@/components/ripple/RippleItem.vue'
import { ref } from 'vue'
import Source from '@/components/ripple/Source'

const row = ref(50)

let sources: Source[] = []

const items = ref<InstanceType<typeof RippleItem>[]>([])

let reqId: number
function handleClick({ x, y }: { x: number; y: number }) {
  sources.push(new Source(x, y, Math.round(row.value * Math.pow(2, 0.5))))

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

  items.value.forEach((i, index) => {
    const x = index % row.value
    const y = Math.floor(index / row.value)
    const key = `${x},${y}`
    if (idSet.has(key)) {
      i.update(true)
      return
    }
    i.update(false)
  })

  reqId = requestAnimationFrame(update)
}
</script>
<template>
  <div class="ripple">
    <RippleItem v-for="i in row * row" :key="i" @click="handleClick" ref="items"> </RippleItem>
  </div>
</template>
<style scoped lang="scss">
.ripple {
  width: 800px;
  height: 800px;
  display: grid;
  grid-template-columns: repeat(v-bind(row), 1fr);
  grid-template-rows: repeat(v-bind(row), 1fr);
}
</style>
