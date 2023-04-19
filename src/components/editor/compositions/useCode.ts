import { ref } from 'vue'
import Code from '@/models/Code'
import type { Fragment } from '@/components/editor/types'

export function useCode() {
  const fragments = ref<Fragment[]>([])

  async function getCode() {
    const instance = Code.getInstance()
    await instance.getData('/main.ts.txt')
    fragments.value = instance.parseFragmentDirective()
  }

  return {
    getCode,
    fragments
  }
}
