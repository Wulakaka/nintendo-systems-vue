<script setup lang="ts">
import TickItem from '@/views/tick/TickItem.vue'

const length = 20
const list = new Array(length).fill(null).map((_, index) => {
  return (index + '').padStart(2, '0')
})
</script>

<template>
  <div class="relative w-20 h-40 mx-auto">
    <TickItem v-for="(i, index) in list" :key="i" :delay="index">{{ i }}</TickItem>
  </div>
</template>

<style scoped lang="scss"></style>
