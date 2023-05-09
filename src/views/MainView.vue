<script setup lang="ts">
import TheEditor from '@/components/editor/components/TheEditor.vue'
import ThePreview from '@/components/preview/ThePreview.vue'

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
  <div class="main">
    <TheEditor></TheEditor>
    <ThePreview></ThePreview>
  </div>
  <TheLoading ref="refLoading"></TheLoading>
</template>
main

<style scoped lang="scss">
.main {
  position: relative;
  height: 100vh;

  &__ripple {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
