<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useSection from '@/components/preview/compositions/useSection'

const view = ref()
useSection(view, 'message')
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
