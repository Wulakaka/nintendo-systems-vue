import { computed, type Ref } from 'vue'
import { getKB } from '@/views/navigation/utils'
/** 使用公切圆
 *
 * @param t
 * @param R
 * @param r
 * @param dr 制作弧形的圆半径
 * @param offset 最大偏移距离
 *
 */
export default function useBubbleIn(
  t: Ref<number>,
  R: number,
  r: number,
  dr: number,
  offset: number
) {
  // 大圆圆心
  const cX0 = 0
  const cY0 = 0
  // 小圆圆心X
  const cX1 = 0
  // 小圆圆心Y
  const cY1 = computed(() => {
    const min = R + r + offset
    const max = 0
    return min + (max - min) * t.value
  })
  // 公切圆圆心Y
  const cYD = computed(() => {
    const ys = cY1.value
    return (Math.pow(R - dr, 2) - Math.pow(r + dr, 2) + Math.pow(ys, 2)) / (2 * Math.max(ys, 1e-4))
  })
  // 公切圆圆心X
  const cXD = computed(() => Math.pow(Math.pow(R - dr, 2) - Math.pow(cYD.value, 2), 1 / 2))

  // 两个公切圆的交点，靠近大圆一侧
  const y0 = computed(() => {
    if (cXD.value > dr) return 0
    return cYD.value + Math.pow(Math.pow(dr, 2) - Math.pow(cXD.value, 2), 1 / 2)
  })
  // 两个公切圆的交点，靠近小圆一侧
  const y1 = computed(() => {
    if (cXD.value > dr) return 0
    return cYD.value - Math.pow(Math.pow(dr, 2) - Math.pow(cXD.value, 2), 1 / 2)
  })

  // 大圆上的公切点X
  const tX0 = computed(() => (cXD.value * R) / (R - dr))
  // 大圆上的公切点Y
  const tY0 = computed(() => (cYD.value * R) / (R - dr))

  // 小圆上的公切点X
  const tX1 = computed(() => (cXD.value * r) / (r + dr))
  // 小圆上的公切点Y
  const tY1 = computed(() => {
    const { k, b } = getKB(cX1, cY1.value, cXD.value, cYD.value)
    return k * tX1.value + b
  })

  const d = computed(() => {
    if (!cXD.value || cYD.value > Number.MAX_SAFE_INTEGER) return ''
    if (cXD.value > dr || cY1.value > R) {
      return `M ${tX1.value},${tY1.value} A ${dr} ${dr} 0 0 0 ${tX0.value},${
        tY0.value
      } A ${R} ${R} 0 0 1 ${-tX0.value},${tY0.value} A ${dr} ${dr} 0 0 0 ${-tX1.value},${
        tY1.value
      } A ${r} ${r} 0 0 0 ${tX1.value},${tY1.value} z`
    } else {
      const up = `M 0,${y1.value} A ${dr} ${dr} 0 0 1 ${tX1.value},${
        tY1.value
      } A ${r} ${r} 0 0 1 ${-tX1.value},${tY1.value} A ${dr} ${dr} 0 0 1 0,${y1.value}`

      const down = `M 0,${y0.value} A ${dr} ${dr} 0 0 0 ${tX0.value},${
        tY0.value
      } A ${R} ${R} 0 0 0 ${-tX0.value},${tY0.value} A ${dr} ${dr} 0 0 0 0,${y0.value}`
      return `${up} ${down} Z`
    }
  })

  return {
    cXD,
    cYD,
    cX1,
    cY1,
    d,
    tX1,
    tY1
  }
}
