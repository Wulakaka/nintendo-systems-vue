<script setup lang="ts">
import { useCode } from '@/components/editor/compositions/useCode'
import TheSection from '@/components/editor/components/TheSection.vue'
import { onMounted, ref, watch } from 'vue'
import Play from '@/models/Play'
import { useSectionScrollStore } from '@/stores/sectionScroll'
import { usePreviewScrollStore } from '@/stores/previewScroll'

const { fragments, getCode } = useCode()
getCode()

const view = ref()
const sectionScrollStore = useSectionScrollStore()
const previewScrollStore = usePreviewScrollStore()

watch(
  () => previewScrollStore.info,
  () => {
    view.value?.scrollTo({ top: view.value.scrollHeight, behavior: 'instant' })
  },
  {
    flush: 'post'
  }
)

onMounted(() => {
  setTimeout(() => {
    new Play(4e3).start(({ t }) => {
      sectionScrollStore.update('default', { innerRate: t })
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
  <div class="editor" ref="view">
    <ol>
      <TheSection
        v-for="(i, index) in fragments"
        :data="i"
        :key="i.id"
        :index="index"
        ref="children"
      ></TheSection>
    </ol>
  </div>
</template>
<style scoped lang="scss">
.editor {
  position: absolute;
  max-height: 100vh;
  width: 50vw;
  overflow: auto;
  color: #85aaf8;
  white-space: pre;
}
</style>
