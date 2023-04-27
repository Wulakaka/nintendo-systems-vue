<script setup lang="ts">
import { useCode } from '@/components/editor/compositions/useCode'
import TheSection from '@/components/editor/components/TheSection.vue'
import { onMounted, ref } from 'vue'
import Play from '@/models/Play'
import sectionShows from '@/components/editor/SectionShows'

defineExpose({
  show
})

const { fragments, getCode } = useCode()
getCode()

onMounted(() => {
  setTimeout(() => {
    new Play(4e3).start(({ t }) => {
      sectionShows['default'](t)
    })
  }, 2000)
})

const sectionMap = new Map()
const children = ref<InstanceType<typeof TheSection>[]>([])
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
  <ol>
    <TheSection
      v-for="(i, index) in fragments"
      :data="i"
      :key="i.id"
      :id="i.id"
      :index="index"
      ref="children"
    ></TheSection>
  </ol>
</template>
<style scoped lang="scss"></style>
