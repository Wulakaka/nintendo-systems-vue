<script setup lang="ts">
import TheArticle from '@/components/editor/components/TheArticle.vue'
import ThePreview from '@/components/preview/ThePreview.vue'
</script>

<template>
  <div class="app">
    <div class="editor">
      <pre><TheArticle></TheArticle></pre>
    </div>
    <ThePreview></ThePreview>
  </div>
</template>

<style scoped lang="scss">
.app {
  position: relative;
}
</style>
