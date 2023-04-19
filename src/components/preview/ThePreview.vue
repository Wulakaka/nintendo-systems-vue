<script setup lang="ts">
import { onMounted, ref } from 'vue'

const view = ref()

onMounted(() => {})
</script>
<template>
  <div ref="view" class="preview">
    <div class="preview__inner"></div>
  </div>
</template>
<style scoped lang="scss">
.preview {
  height: 300px;
  overflow: auto;
  width: 300px;
  position: absolute;
  right: 10px;
  top: 10px;
  background: beige;

  &__inner {
    height: 800px;
  }
}
</style>
