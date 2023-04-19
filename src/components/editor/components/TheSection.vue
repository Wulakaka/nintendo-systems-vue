<script setup lang="ts">
import type { Fragment } from '@/components/editor/types'
import { ref } from 'vue'
import Code from '@/models/Code'
import TheLine from '@/components/editor/components/TheLine.vue'

const props = defineProps<{
  data: Fragment
  index: number
}>()

defineExpose({
  show,
  get length() {
    return getLength()
  },
  get index() {
    return props.index
  }
})

const lines = Code.splitToLines(props.data.code)

const children = ref<InstanceType<typeof TheLine>[]>([])

function getLength() {
  return children.value.reduce((count, child) => {
    return count + child.length
  }, 0)
}

function show(t: number) {
  let m = 0
  const length = getLength()
  children.value
    .sort((a, b) => a.index - b.index)
    .forEach((child) => {
      const _t = (t * length - m) / child.length
      child.show(0 > _t ? 0 : 1 < _t ? 1 : _t)
      m += child.length
    })
}
</script>
<template>
  <TheLine
    v-for="(i, index) in lines"
    :data="i"
    :key="index"
    ref="children"
    :index="index"
  ></TheLine>
</template>
<style scoped lang="scss"></style>
