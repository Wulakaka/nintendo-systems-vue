<script setup lang="ts">
import { computed, onMounted, ref, toRef } from 'vue'

const props = defineProps<{
  t: number
  interpolatorTransform: (t: number) => string
}>()

const emit = defineEmits<{
  (e: 'click', position: { x: number; y: number }): void
}>()

const view = ref()
const x = ref(0)
const y = ref(0)

const _t = toRef(props, 't')

const style = computed(() => {
  return {
    transform: props.interpolatorTransform(_t.value)
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
  background: gray;
  transition: 16ms;
  animation: 4s move ease-in infinite alternate;
}
</style>

<style>
@keyframes move {
  0% {
    scale: 1;
  }

  100% {
    scale: 0.9;
  }
}
</style>
