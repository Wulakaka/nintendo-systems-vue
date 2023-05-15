<script setup lang="ts">
import { computed, toRefs } from 'vue'
import useBubbleOut from '@/views/navigation/useBubbleOut'
import useBubbleIn from '@/views/navigation/useBubbleIn'

const props = defineProps<{
  t: number
  outerR: number
  r: number
  dr: number
  offset: number
  rotate: number
}>()

const { t, outerR, r, dr, offset, rotate } = toRefs(props)

const moveOutT = computed(() => {
  return t.value * 2
})

const moveInT = computed(() => {
  return (t.value - 0.5) * 2
})

const isMoveOut = computed(() => t.value < 0.5)

const {
  d: dOut,
  cX1: xOut,
  cY1: yOut
} = useBubbleOut(moveOutT, outerR.value, r.value, dr.value, offset.value)
const {
  d: dIn,
  cX1: xIn,
  cY1: yIn
} = useBubbleIn(moveInT, outerR.value, r.value, dr.value, offset.value)

const x = computed(() => (isMoveOut.value ? xOut : xIn))
const y = computed(() => (isMoveOut.value ? yOut.value : yIn.value))
const d = computed(() => (isMoveOut.value ? dOut.value : dIn.value))

const color = computed(() => (isMoveOut.value ? 'var(--fill-bubble-big)' : 'var(--bg-bubble)'))
</script>

<template>
  <g :style="{ transform: `rotate(${rotate}deg)` }">
    <path :d="d" :fill="color" :stroke="color"></path>
    <circle :cx="x" :cy="y" :r="r" fill="var(--fill-bubble-small)"></circle>
  </g>
</template>

<style scoped lang="scss"></style>
