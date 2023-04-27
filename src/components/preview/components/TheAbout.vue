<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useSection from '@/components/preview/compositions/useSection'
const view = ref()
useSection(view, 'about')
</script>
<template>
  <section ref="view" class="about">about</section>
</template>
<style scoped lang="scss">
section.about {
  height: 200px;
  background: rgba(#85aaf8, 0.5);
}
</style>
