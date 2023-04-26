<script setup lang="ts">
import { computed, onMounted, ref, toRef } from 'vue'

const props = defineProps<{
  t: number
}>()

const emit = defineEmits<{
  (e: 'click', position: { x: number; y: number }): void
}>()

const view = ref()
const x = ref(0)
const y = ref(0)

const _t = toRef(props, 't')

const style = computed(() => {
  const scale = 0.3 + Math.abs(_t.value - 0.3)
  return {
    transform: `scale(${scale})`,
    opacity: scale
  }
})

onMounted(() => {
  y.value = view.value.offsetTop / view.value.offsetHeight
  x.value = view.value.offsetLeft / view.value.offsetWidth
})

function handleClick() {
  emit('click', {
    x: x.value,
    y: y.value
  })
}
</script>
<template>
  <div ref="view" class="ripple-item" @click="handleClick" :style="style"></div>
</template>
<style scoped lang="scss">
.ripple-item {
  background: red;
  transition: 16ms;
}
</style>

<style>
@keyframes move {
  0% {
    scale: 1;
    background: #d2c73b;
  }

  100% {
    scale: 0.1;
    background: #d2c73b;
  }
}
</style>
