<script setup lang="ts">
import CardLayer from '@/views/card/CardLayer.vue'
</script>

<template>
  <div class="h-32 w-32 rounded-md bg-slate-100 absolute left-0 top-0 card-item">
    <CardLayer
      class="circle circle--1 animate-[z_infinite_alternate-reverse_4s_paused] group-hover:animate-[z_infinite_alternate-reverse_4s_running]"
    >
      <svg viewBox="-20 -20 40 40">
        <circle cx="0" cy="0" r="18" class="stroke-sky-500 fill-none stroke-2"></circle>
        <circle
          cx="0"
          cy="0"
          r="10"
          stroke-dasharray="1 2"
          class="stroke-sky-950 fill-none stroke-1 animate-[circle_4s_infinite_linear]"
        ></circle>
      </svg>
    </CardLayer>
    <CardLayer
      class="circle circle--2 animate-[z_infinite_alternate-reverse_4s_paused] group-hover:animate-[z_infinite_alternate-reverse_4s_running]"
    >
      <svg viewBox="-20 -20 40 40">
        <circle cx="0" cy="0" r="4" class="stroke-sky-300 fill-none stroke-2"></circle>
      </svg>
    </CardLayer>
    <CardLayer
      class="circle circle--3 animate-[z_infinite_alternate-reverse_4s_paused] group-hover:animate-[z_infinite_alternate-reverse_4s_running]"
    >
      <svg viewBox="-20 -20 40 40">
        <circle
          cx="0"
          cy="0"
          r="8"
          stroke-dasharray="30 100"
          class="stroke-sky-200 fill-none stroke-3 animate-[circle_reverse_4s_infinite_linear]"
        ></circle>
      </svg>
    </CardLayer>
  </div>
</template>

<style scoped lang="scss">
.circle {
  &--1 {
    --from: 0px;
    --to: 100px;
  }
  &--2 {
    --from: 0px;
    --to: 220px;
  }
  &--3 {
    --from: 0px;
    --to: 320px;
  }
}
</style>
