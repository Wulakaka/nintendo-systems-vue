<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useSection from '@/components/preview/compositions/useSection'

const view = ref()
useSection(view, 'office')
</script>
<template>
  <section ref="view" class="office">office</section>
</template>
<style scoped lang="scss">
section.office {
  height: 300px;
  background: rgba(#85aaf8, 0.7);
}
</style>
