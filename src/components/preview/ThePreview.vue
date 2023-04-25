<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TheTop from '@/components/preview/components/TheTop.vue'
import Callbacks from '@/models/Callbacks'

const emit = defineEmits<{
  (e: 'scroll', scale: number): void
}>()

const view = ref()

let scale = 0
let lastScale = 0
let contentHeight = 0
let viewportHeight = 0
let invisibleHeight = 0
let scrollTop = 0

const handlerOption = {
  capture: true,
  passive: true
}

const _onScroll = new Callbacks()
let reqId = -1
onMounted(() => {
  addHandlers()
  _onScroll.add(sectionTop.value.update)
})

const sectionTop = ref()

defineExpose({
  update,
  forceDispatch() {
    update()
  }
})

function storePosition() {
  const el = view.value
  contentHeight = el.scrollHeight // 总高度
  viewportHeight = el.offsetHeight // 可见高度
  scrollTop = el.scrollTop // 卷起的高度
  invisibleHeight = contentHeight - viewportHeight // 总不可见高度
  scale = scrollTop / invisibleHeight // 当前位置的比例
}

function addHandlers() {
  const el = view.value
  el.removeEventListener('scroll', addHandlers, handlerOption)
  el.addEventListener('scroll', storePosition, handlerOption)
  window.removeEventListener('resize', addHandlers, handlerOption)
  window.addEventListener('resize', storePosition, handlerOption)
  storePosition()
  reqId = requestAnimationFrame(update)
}

function update() {
  const el = view.value
  let delta = scale - lastScale
  if (1e-5 > Math.abs(delta)) {
    lastScale = scale
    delta = 0
    el.removeEventListener('scroll', storePosition, handlerOption)
    el.addEventListener('scroll', addHandlers, handlerOption)
    window.removeEventListener('resize', storePosition, handlerOption)
    window.addEventListener('resize', addHandlers, handlerOption)
    cancelAnimationFrame(reqId)
  } else {
    lastScale += 0.1 * delta
    reqId = requestAnimationFrame(update)
  }

  _onScroll.exec({
    value: lastScale,
    valueInPx: lastScale * invisibleHeight,
    valueInPxMax: invisibleHeight,
    delta: delta,
    contentHeight: contentHeight,
    viewportHeight: viewportHeight
  })
}

// function onScroll(fn) {
//   _onScroll.add(fn)
// }
</script>
<template>
  <div ref="view" class="preview">
    <div class="preview__inner">
      <TheTop ref="sectionTop"></TheTop>
    </div>
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
    padding-top: 400px;
  }
}
</style>
