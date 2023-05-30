<script setup lang="ts">
import { computed, toRef } from 'vue'

const props = defineProps<{
  delay: number
}>()

const delay = toRef(props, 'delay')

const _d = computed(() => delay.value * 0.5 + 's')
</script>

<template>
  <div
    class="w-20 h-40 flex justify-center flex-grow-0 flex-shrink-0 items-center group absolute tick-item"
  >
    <div class="w-5 h-20 rounded-3xl animate-tick opacity-0"></div>
  </div>
</template>

<style scoped lang="scss">
.tick-item {
  --delay: v-bind(_d);
}
</style>
