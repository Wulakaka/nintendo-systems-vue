<script setup lang="ts">
import { onMounted, ref } from 'vue'

const emit = defineEmits<{
  (e: 'scroll', scale: number): void
}>()

const view = ref()

let lastScale = 0

let invisibleHeight = 0

let reqId = -1
onMounted(() => {
  invisibleHeight = getInvisibleHeight(view.value)
})

function getInvisibleHeight(el: HTMLElement) {
  const contentHeight = el.offsetHeight
  const scrollHeight = el.scrollHeight
  return scrollHeight - contentHeight
}

function getScale(el: HTMLElement, fn: (t: number) => void) {
  cancelAnimationFrame(reqId)
  const scrollTop = el.scrollTop
  const newScale = scrollTop / invisibleHeight
  const step = () => {
    const diff = newScale - lastScale
    if (Math.abs(diff) < 5e-4) {
      lastScale = newScale
      fn(lastScale)
      cancelAnimationFrame(reqId)
    } else {
      lastScale += diff * 0.001
      fn(lastScale)
      reqId = requestAnimationFrame(step)
    }
  }
  step()

  // reqId = requestAnimationFrame(step)
}

function handleScroll() {
  getScale(view.value, (t) => emit('scroll', t))
}
</script>
<template>
  <div ref="view" class="preview" @scroll="handleScroll">
    <div class="preview__inner"></div>
  </div>
</template>
<style scoped lang="scss">
.preview {
  height: 300px;
  overflow: auto;
  width: 300px;
  position: absolute;
  right: 10px;
  top: 10px;
  background: beige;

  &__inner {
    height: 1000px;
  }
}
</style>
