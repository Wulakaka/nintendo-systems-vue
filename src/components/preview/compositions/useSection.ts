import Callbacks from '@/models/Callbacks'
import type { PreviewScrollParams, SectionScrollParams } from '@/components/preview/types'
import type { Ref } from 'vue'

export default function useSection(view: Ref<HTMLElement>) {
  const _scrollHandlers = new Callbacks<SectionScrollParams>()

  function update(a: PreviewScrollParams) {
    const globalRate = a.value
    const invisibleHeight = a.valueInPxMax
    let y = view.value.offsetTop
    const height = view.value.offsetHeight,
      viewportHeight = a.viewportHeight
    const scrollTop = a.valueInPx // 滚动的位置
    let top = y // 顶部距离容器顶部的像素值
    const bottom = top + height // 底部距离容器顶部的像素值
    top = 0 > top ? 0 : top // 如果距离小于0，取0

    // 0 --> 1 从元素顶部开始不可见到元素底部不可见（或不能滚动）
    // 元素顶部到 viewport顶部 的距离/元素顶部不可见的最大距离
    const innerRate =
      (scrollTop - top) / ((bottom > invisibleHeight ? invisibleHeight : bottom) - top)
    y -= viewportHeight

    const _bottom = y + height + viewportHeight
    y = 0 > y ? 0 : y

    // 0 --> 1 从元素顶部开始可见到元素底部不可见
    // 元素顶部到viewport底部的距离 / min((元素的高 + viewport 的高),(元素的高 + 元素底部距离父元素底部的高))
    const outerRate =
      (scrollTop - y) / ((_bottom > invisibleHeight ? invisibleHeight : _bottom) - y)

    _scrollHandlers.exec({
      globalRate: globalRate,
      innerRate: 0 > innerRate ? 0 : 1 < innerRate ? 1 : innerRate, // 不可见区域的占比
      outerRate: 0 > outerRate ? 0 : 1 < outerRate ? 1 : outerRate
    })
  }

  function onScroll(fn: (arg: SectionScrollParams) => void) {
    _scrollHandlers.add(fn)
  }

  return {
    onScroll,
    update
  }
}
