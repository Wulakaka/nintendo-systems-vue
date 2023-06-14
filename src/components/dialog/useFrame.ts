import { computed, type Ref } from 'vue'
export default function useFrame(left: Ref<number>, top: Ref<number>, width: Ref<number>, height: Ref<number>) {
  const viewBox = computed(() => `-${left.value} -${top.value} ${left.value * 2} ${top.value * 2}`)
  // 蓝色边
  const borderPath = computed(() => {
    const w = width.value + 1
    const h = height.value + 1
    const radius = 8
    return getPath(w, h, radius)
  })
  // 主体多边形
  const panelPath = computed(() => {
    const w = width.value - 1
    const h = height.value - 1
    const radius = 8
    return getPath(w, h, radius, w / 2 + 0.5, h / 2 + 0.5)
  })

  // 默认起始点为图形中心
  function getPath(w: number, h: number, r: number, offsetX = 0, offsetY = 0) {
    const radiusLT = `M ${-w / 2 + r + offsetX},${-h / 2 + offsetY} a ${r},${r} 0,0,0 ${-r},${r}`
    const lineL = `v 110 l 9,17 v ${h - r * 2 - 110 - 17 * 2 - 180} l -9,17 v 180`
    const radiusLB = `a ${r},${r} 0,0,0 ${r},${r}`
    const lineB = `h ${w - r * 2}`
    const radiusRB = `a ${r},${r} 0,0,0 ${r},${-r}`
    const lineR = `v -180 l -9,-17, v ${-(h - r * 2 - 110 - 17 * 2 - 180)} l 9,-17 v -110`
    const radiusRT = `a ${r},${r} 0,0,0 ${-r},${-r}`
    return `${radiusLT} ${lineL} ${radiusLB} ${lineB} ${radiusRB} ${lineR} ${radiusRT} z`
  }

  return {
    viewBox,
    borderPath,
    panelPath,
  }
}
