import { onMounted, ref } from 'vue'

export default function useD3(chart: () => SVGSVGElement | null) {
  const container = ref()

  function render() {
    container.value.appendChild(chart())
  }

  onMounted(render)
  return {
    container
  }
}
