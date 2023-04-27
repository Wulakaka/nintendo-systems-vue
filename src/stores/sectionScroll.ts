import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { SectionScrollParams } from '@/components/preview/types'

export const useSectionScrollStore = defineStore('sectionScroll', () => {
  const info = reactive<{ [id: string]: SectionScrollParams }>({})
  function update(id: string, val: SectionScrollParams) {
    info[id] = val
  }

  return { info, update }
})
