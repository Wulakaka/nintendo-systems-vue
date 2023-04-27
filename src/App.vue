<script setup lang="ts">
import TheEditor from '@/components/editor/components/TheEditor.vue'
import ThePreview from '@/components/preview/ThePreview.vue'

import RippleCanvas2 from '@/components/ripple-canvas/RippleCanvas2.vue'
</script>

<template>
  <div class="app">
    <TheEditor></TheEditor>

    <ThePreview></ThePreview>
  </div>
  <!--  <div class="app__ripple">
    <RippleCanvas2></RippleCanvas2>
  </div>-->
</template>

<style scoped lang="scss">
.app {
  position: relative;
  height: 100vh;

  &__ripple {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
