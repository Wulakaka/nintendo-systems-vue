<script setup lang="ts">
import { ref } from 'vue'
import useSection from '@/components/preview/compositions/useSection'

const view = ref()

useSection(view, 'recruit')
</script>
<template>
  <section ref="view" class="recruit">recruit</section>
</template>
<style scoped lang="scss">
section.recruit {
  height: 400px;
  background: rgba(#85aaf8, 0.7);
}
</style>
