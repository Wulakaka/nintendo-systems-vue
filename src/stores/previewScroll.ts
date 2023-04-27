import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { PreviewScrollParams } from '@/components/preview/types'

export const usePreviewScrollStore = defineStore('previewScroll', () => {
  const info = ref<PreviewScrollParams>({
    value: 0,
    valueInPx: 0,
    valueInPxMax: 0,
    delta: 0,
    contentHeight: 0,
    viewportHeight: 0
  })
  function update(val: PreviewScrollParams) {
    info.value = val
  }

  return { info, update }
})
