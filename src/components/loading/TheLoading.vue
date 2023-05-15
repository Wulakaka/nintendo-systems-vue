<script setup lang="ts">
import { nextTick, ref } from 'vue'
import chain from '@/utils/chain'
import LoadingI from '@/components/loading/components/LoadingI.vue'
import LoadingII from '@/components/loading/components/LoadingII.vue'
import LoadingIII from '@/components/loading/components/LoadingIII.vue'
import wait from '@/utils/wait'

defineExpose({
  show,
  update,
  hide
})

const I = ref()
const II = ref()
const III = ref()
const loadingI = ref(true)
const loadingII = ref(false)
const loadingIII = ref(false)

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
function hide() {
  return chain(
    () => wait(500),
    () => {
      loadingII.value = false
      loadingIII.value = true
      return nextTick()
    },
    () => {
      return III.value.show()
    }
  )
}
</script>
<template>
  <div class="fixed bg-red-50 left-0 top-0 right-0 bottom-0 flex flex-col justify-center loading">
    <div class="text-center">
      <LoadingI v-show="loadingI" ref="I"></LoadingI>
      <LoadingII v-show="loadingII" ref="II"></LoadingII>
      <LoadingIII v-show="loadingIII" ref="III"></LoadingIII>
    </div>
  </div>
</template>
<style scoped lang="scss">
.loading {
  font-family: Menlo, 'Roboto Mono', 'Droid Sans Mono', 'Lucida Sans Typewriter', 'Courier New',
    Courier, monospace;
}
</style>
