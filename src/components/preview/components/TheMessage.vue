<script setup lang="ts">
import { ref } from 'vue'
import useSection from '@/components/preview/compositions/useSection'
import sectionShows from '@/components/editor/SectionShows'

const view = ref()
const { update, onScroll } = useSection(view)
defineExpose({
  update
})

onScroll((a) => {
  sectionShows['message']?.(a.innerRate)
})
</script>
<template>
  <section ref="view" class="message">message</section>
</template>
<style scoped lang="scss">
section.message {
  height: 200px;
  background: rgba(#85aaf8, 0.6);
}
</style>
