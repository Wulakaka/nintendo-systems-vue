<script setup lang="ts">
import { computed, toRef } from 'vue'

const props = defineProps<{
  data: {
    x: number
    y: number
    id: string
    t: number
  }
  size: number
}>()

defineEmits<{
  (e: 'click'): void
}>()

const centerX = computed(() => {
  const { x } = props.data
  const size = props.size
  return x * size + size / 2
})

const centerY = computed(() => {
  const { y } = props.data
  const size = props.size
  return y * size + size / 2
})

const x = computed(() => {
  return centerX.value - size.value / 2
})
const y = computed(() => {
  return centerY.value - size.value / 2
})

const t = toRef(props.data, 't')

const size = computed(() => {
  const scale = 0.3 + Math.abs(t.value - 0.3)
  return props.size * scale
})
</script>
<template>
  <rect :width="size" :height="size" :x="x" :y="y" @click="$emit('click')" fill="gray"></rect>
</template>
<style scoped lang="scss"></style>
