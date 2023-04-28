<script setup lang="ts">
import TheEditor from '@/components/editor/components/TheEditor.vue'
import ThePreview from '@/components/preview/ThePreview.vue'

import RippleCanvas2 from '@/components/ripple-canvas/RippleCanvas2.vue'
import TheLoading from '@/components/loading/TheLoading.vue'
import { onMounted, ref } from 'vue'
import LoadingParallel from '@/models/LoadingParallel'
import chain from '@/utils/chain'

const refLoading = ref()

onMounted(() => {
  const p = LoadingParallel.getInstance()
  chain(
    () => refLoading.value.show(),
    () => {
      return p.start(refLoading.value.update, 1e3)
    }
  )
})
</script>

<template>
  <div class="app">
    <TheEditor></TheEditor>
    <ThePreview></ThePreview>
  </div>
  <TheLoading ref="refLoading"></TheLoading>
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
