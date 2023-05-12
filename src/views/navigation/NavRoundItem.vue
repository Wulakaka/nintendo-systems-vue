<script setup lang="ts">
import { toRefs } from 'vue'
import useBubbleWithCircle from '@/views/navigation/useBubbleWithCircle'

const props = defineProps<{
  t: number
  outerR: number
  r: number
  dr: number
  offset: number
  rotate: number
}>()

const { t, outerR, r, dr, offset, rotate } = toRefs(props)

const { d, cX1, cY1 } = useBubbleWithCircle(t, outerR.value, r.value, dr.value, offset.value)
</script>

<template>
  <g fill="aliceblue" :style="{ transform: `rotate(${rotate}deg)` }">
    <circle :cx="cX1" :cy="cY1" :r="r"></circle>
    <path :d="d"></path>
  </g>
</template>

<style scoped lang="scss"></style>
