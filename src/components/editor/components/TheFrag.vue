<script setup lang="ts">
import { Fragment } from '@/components/editor/types'
import { computed, ref } from 'vue'

const props = defineProps<{
  data: Fragment
  index: number
}>()

defineExpose({
  show,
  get length() {
    return props.data.code.length
  },
  get index() {
    return props.index
  }
})

const view = ref()

const t = ref(0)
const stat = computed(() => {
  if (t.value === 0) {
    return 'empty'
  } else if (t.value === 1) {
    return 'complete'
  } else {
    return 'typing'
  }
})

const end = computed(() => {
  return (t.value * props.data.code.length) | 0
})

const text = computed(() => {
  return props.data.code.substring(0, end.value)
})

let reqId: number

function show(time: number) {
  reqId = requestAnimationFrame(function () {
    t.value = time
  })
}
</script>
<template>
  <span ref="view" class="frag" :class="`frag--${data.id}`" :data-stat="stat">{{ text }}</span>
</template>
<style scoped lang="scss">
.frag {
  &--comment {
    color: #88adff;
  }
  &--separator {
    color: #2064ea;
  }
  &--keyword {
    color: #2064ea;
  }
  &--indent {
    position: relative;
  }

  &--indent::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 2px;
    background-color: #2064ea;
    content: '';
    opacity: 0.05;
  }
}
</style>
