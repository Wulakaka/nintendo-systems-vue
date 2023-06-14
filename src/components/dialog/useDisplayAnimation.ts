import { computed, ref } from 'vue'

export default function useDisplayAnimation() {
  const t = ref(0)
  const borderEl = ref<SVGPathElement>()
  const dashArray = computed(() => {
    const line = (borderEl.value?.getTotalLength() ?? 1000) / 2
    const dash = t.value * line
    const gap = line - dash
    return `${dash} ${gap}`
  })

  function show() {
    t.value = 0
    render()
    function render() {
      const delta = 1 / ((1000 / 16) | 0)
      t.value += delta
      t.value = t.value > 1 ? 1 : t.value < 0 ? 0 : t.value
      if (t.value < 1) {
        requestAnimationFrame(render)
      }
    }
  }

  function hide() {
    return new Promise((resolve) => {
      t.value = 1
      render()
      function render() {
        const delta = 1 / ((1000 / 16) | 0)
        t.value -= delta
        t.value = t.value > 1 ? 1 : t.value < 0 ? 0 : t.value
        if (t.value > 0) {
          requestAnimationFrame(render)
        } else {
          resolve(void 0)
        }
      }
    })
  }

  return {
    show,
    hide,
    t,
    dashArray,
    borderEl,
  }
}
