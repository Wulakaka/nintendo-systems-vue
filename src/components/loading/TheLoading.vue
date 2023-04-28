<script setup lang="ts">
import { nextTick, ref } from 'vue'
import chain from '@/utils/chain'
import LoadingI from '@/components/loading/components/LoadingI.vue'
import LoadingII from '@/components/loading/components/LoadingII.vue'

defineExpose({
  show,
  update,
  hide
})

const I = ref()
const II = ref()
const loadingI = ref(true)
const loadingII = ref(false)

function show() {
  return chain(
    () => I.value.show(),
    () => {
      loadingI.value = false
      loadingII.value = true
      return nextTick()
    }
  )
}

function update(t: number) {
  return chain(() => II.value?.show(t))
}
function hide() {}
</script>
<template>
  <div class="loading">
    <LoadingI v-if="loadingI" ref="I"></LoadingI>
    <LoadingII v-show="loadingII" ref="II"></LoadingII>
  </div>
</template>
<style scoped lang="scss">
.loading {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: aliceblue;
}
</style>
