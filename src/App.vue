<script setup lang="ts">
import TheArticle from '@/components/editor/components/TheArticle.vue'
import ThePreview from '@/components/preview/ThePreview.vue'
import { ref } from 'vue'
import TheRipple from '@/components/ripple/TheRipple.vue'
import RippleSvg from '@/components/ripple-svg/RippleSvg.vue'

const editor = ref()
function handleScroll(scale: number) {
  editor.value.show(scale)
}
</script>

<template>
  <div class="app">
    <div class="editor">
      <pre><TheArticle ref="editor"></TheArticle></pre>
    </div>
    <ThePreview @scroll="handleScroll"></ThePreview>
  </div>
  <div class="app__ripple">
    <RippleSvg></RippleSvg>
  </div>
</template>

<style scoped lang="scss">
.app {
  position: relative;
  height: 100vh;

  &__ripple {
    position: absolute;
    left: 100px;
    top: 100px;
  }
}

.editor {
  position: absolute;
  max-height: 100vh;
  width: 50vw;
  overflow: auto;
  color: #85aaf8;
}
</style>
