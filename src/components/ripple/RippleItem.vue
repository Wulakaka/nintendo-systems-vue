<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const emit = defineEmits<{
  (e: 'click', position: { x: number; y: number }): void
  (e: 'mounted', id: string): void
}>()

let reqId = -1

defineExpose({
  update(val) {
    active.value = val
    // cancelAnimationFrame(reqId)
    // reqId = requestAnimationFrame(() => {
    //   active.value = false
    // })
  }
})

const view = ref()
const x = ref(0)
const y = ref(0)

const active = ref(false)

onMounted(() => {
  y.value = view.value.offsetTop / view.value.offsetHeight
  x.value = view.value.offsetLeft / view.value.offsetWidth
  emit('mounted', `${x.value},${y.value}`)
})

function handleClick() {
  emit('click', {
    x: x.value,
    y: y.value
  })
}
</script>
<template>
  <div ref="view" class="ripple-item" @click="handleClick" :class="{ active }"></div>
</template>
<style scoped lang="scss">
.ripple-item {
  outline: 1px solid red;
}
.active {
  background: red;
}
</style>
