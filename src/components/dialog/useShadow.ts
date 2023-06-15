import { computed, ref } from 'vue'
import * as d3 from 'd3'

export default function useShadow() {
  const t = ref(0)
  const split = 0.7
  const _t = computed(() => {
    if (t.value < split) {
      const tmp = t.value / split
      return d3.easeCubicInOut(tmp)
    } else {
      const tmp = (1 - t.value) / (1 - split)
      return d3.easeCubicInOut(tmp)
    }
  })

  const offset = computed(() => {
    const min = 0
    const max = 3
    return _t.value * (max - min) + min
  })
  const opacity = computed(() => {
    const min = 0.5
    const max = 1
    return _t.value * (max - min) + min
  })
  function show(ms = 500) {
    return new Promise((resolve) => {
      t.value = 0
      render()
      function render() {
        const delta = 1 / ((ms / 16) | 0)
        t.value += delta
        t.value = t.value > 1 ? 1 : t.value < 0 ? 0 : t.value
        if (t.value < 1) {
          requestAnimationFrame(render)
        } else {
          resolve(void 0)
        }
      }
    })
  }
  return {
    offset,
    opacity,
    show
  }
}
