<script setup lang="ts">
import TheEditor from '@/components/editor/components/TheEditor.vue'
import ThePreview from '@/components/preview/ThePreview.vue'

import TheLoading from '@/components/loading/TheLoading.vue'
import { nextTick, onMounted, ref } from 'vue'
import LoadingParallel from '@/models/LoadingParallel'
import chain from '@/utils/chain'
import Play from '@/models/Play'
import { useSectionScrollStore } from '@/stores/sectionScroll'

const sectionScrollStore = useSectionScrollStore()

const refLoading = ref()
const loading = ref(false)

onMounted(() => {
  const p = LoadingParallel.getInstance()
  loading.value = true
  setTimeout(() => {
    chain(
      () =>
        chain(
          () => refLoading.value.show(),
          () => {
            return p
              .start((t) => {
                // 在promise列表中加入loading 的promise
                refLoading.value.update(t)
              }, 1e3)
              .then(function () {
                return refLoading.value.hide()
              })
          },
          () => {
            loading.value = false
            return nextTick()
          }
        ),
      () => {
        new Play(4e3).start(({ t }) => {
          sectionScrollStore.update('default', { innerRate: t })
        })
        return Promise.resolve()
      }
    )
  }, 1000)
})
</script>

<template>
  <div class="main">
    <TheEditor></TheEditor>
    <ThePreview></ThePreview>
  </div>
  <Transition name="hide">
    <TheLoading ref="refLoading" v-show="loading"></TheLoading>
  </Transition>
</template>

<style scoped lang="scss">
.main {
  position: relative;
  height: 100vh;
}
.hide {
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
  &-enter-to,
  &-leave-from {
    opacity: 1;
  }
  &-enter-active {
    transition: opacity ease-out 0.5s;
  }

  &-leave-active {
    transition: opacity ease-out 0.5s;
  }
}
</style>
