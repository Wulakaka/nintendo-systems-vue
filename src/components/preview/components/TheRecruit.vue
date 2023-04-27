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
  sectionShows['recruit']?.(a.innerRate)
})
</script>
<template>
  <section ref="view" class="recruit">recruit</section>
</template>
<style scoped lang="scss">
section.recruit {
  height: 200px;
  background: rgba(#85aaf8, 0.7);
}
</style>
