<script setup lang="ts">
import RippleItem from '@/components/ripple/RippleItem.vue'
import { ref } from 'vue'
import Source from '@/components/ripple/Source'

const row = ref(40)

let sources: Source[] = []

const items = ref([])

function handleClick({ x, y }: { x: number; y: number }) {
  sources.push(new Source(x, y, Math.round(row.value * Math.pow(2, 0.5))))
  update()
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

  Object.entries(map).forEach(([key, value]) => {
    if (idSet.has(key)) {
      value.update(true)
      return
    }
    value.update(false)
  })

  requestAnimationFrame(update)
}
const map = {}

function handleMount(id: string, index: number) {
  map[id] = items.value[index]
}
</script>
<template>
  <div class="ripple">
    <RippleItem
      v-for="(i, index) in row * row"
      :key="index"
      @click="handleClick"
      ref="items"
      @mounted="(id) => handleMount(id, index)"
    ></RippleItem>
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
