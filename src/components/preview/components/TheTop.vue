<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useSection from '@/components/preview/compositions/useSection'

const view = ref()

useSection(view, 'top')
</script>
<template>
  <section ref="view" class="top">top</section>
</template>
<style scoped lang="scss">
section.top {
  height: 100px;
  background: rgba(#85aaf8, 0.5);
}
</style>
