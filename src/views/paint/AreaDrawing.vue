<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import Paint from '@/views/paint/Paint'
import DrawEllipse from '@/views/paint/DrawEllipse'
import DrawRect from '@/views/paint/DrawRect'
import DrawArrow from '@/views/paint/DrawArrow'
import TextCover from '@/views/paint/TextCover.vue'
import type { TextItem } from '@/views/paint/AttachText'
import CutCover from '@/views/paint/CutCover.vue'
import State from '@/views/paint/State'
import Context from '@/views/paint/Context'
import type { Rect } from '@/views/paint/types'
import Box from '@/views/paint/Box'

const props = withDefaults(
  defineProps<{
    revocable?: boolean
  }>(),
  {
    revocable: false
  }
)

const emit = defineEmits<{
  (e: 'update:revocable', val: boolean): void
}>()

const currentStateName = ref('')

// 可撤销
const revocable = computed({
  get() {
    return props.revocable
  },
  set(val: boolean) {
    emit('update:revocable', val)
  }
})

const canvas = ref()
// 视图区域
const view = ref()
const paint = new Paint()
paint.onStackChange((size) => {
  revocable.value = size > 1
})
const drawEllipse = new DrawEllipse(paint)
const drawRect = new DrawRect(paint)
const drawArrow = new DrawArrow(paint)
const box = new Box()

const scale = ref(1)
const x = ref(0)
const y = ref(0)

box.onScaleChange((val) => {
  scale.value = val
})
box.onPositionChange((vX, vY) => {
  x.value = vX
  y.value = vY
})
class BasicState extends State {
  inject() {
    currentStateName.value = this.name
  }
  extract() {
    currentStateName.value = ''
  }
}
// 失活状态
class InactivatedState extends BasicState {
  constructor() {
    super('inactivated')
  }
  inject() {
    super.inject()
    box.addListeners()
  }
  extract() {
    super.extract()
    box.removeListeners()
  }
}

class IsDrawingRectState extends BasicState {
  constructor() {
    super('isDrawingRect')
  }
  inject() {
    super.inject()
    drawRect.addListeners()
  }
  extract() {
    super.extract()
    drawRect.removeListeners()
  }
}
class IsDrawingEllipseState extends BasicState {
  constructor() {
    super('isDrawingEllipse')
  }
  inject() {
    super.inject()
    drawEllipse.addListeners()
  }
  extract() {
    super.extract()
    drawEllipse.removeListeners()
  }
}
class IsDrawingArrowState extends BasicState {
  constructor() {
    super('isDrawingArrow')
  }
  inject() {
    super.inject()
    drawArrow.addListeners()
  }
  extract() {
    super.extract()
    drawArrow.removeListeners()
  }
}
class IsDrawingTextState extends BasicState {
  constructor() {
    super('isDrawingText')
  }
}
class IsCuttingState extends BasicState {
  constructor() {
    super('isCutting')
  }
}

const context = new Context()
const inactivatedState = new InactivatedState()
const isDrawingEllipseState = new IsDrawingEllipseState()
const isDrawingRectState = new IsDrawingRectState()
const isDrawingArrowState = new IsDrawingArrowState()
const isDrawingTextState = new IsDrawingTextState()
const isCuttingState = new IsCuttingState()

function keydownHandler(e: KeyboardEvent) {
  if (e.key === 'z') {
    paint.revoke()
  }
}

onMounted(async () => {
  const ele = canvas.value
  paint.el = ele
  drawRect.el = ele
  drawEllipse.el = ele
  drawArrow.el = ele
  box.el = ele
  box.view = view.value

  context.setState(inactivatedState)

  // 撤销功能
  document.addEventListener('keydown', keydownHandler)
})

onBeforeUnmount(() => {
  // 设置为未激活状态
  context.setState(inactivatedState)
  // 移除键盘撤销功能
  document.removeEventListener('keydown', keydownHandler)
})

function handleDrawText(list: TextItem[]) {
  list.forEach(({ text, size, x, y, color }) => {
    paint.fillText(text, size, x, y, color)
  })
}

function handleCut(rect: Rect) {
  paint.crop(rect.x, rect.y, rect.width, rect.height)
}

// 加载背景图
function loadBg(bg: HTMLImageElement) {
  paint.setBackground(bg)
}

// 激活功能
function activate(type: 'rect' | 'ellipse' | 'arrow' | 'text' | 'cut' | null) {
  switch (type) {
    case 'rect':
      context.setState(isDrawingRectState)
      break
    case 'ellipse':
      context.setState(isDrawingEllipseState)
      break
    case 'arrow':
      context.setState(isDrawingArrowState)
      break
    case 'text':
      context.setState(isDrawingTextState)
      break
    case 'cut':
      context.setState(isCuttingState)
      break
    default:
      context.setState(inactivatedState)
  }
}

async function download() {
  // 设置未激活状态，为了将文字绘制到图像上
  context.setState(inactivatedState)

  await nextTick()
  const a = document.createElement('a')
  const blob = await paint.toBlob()
  a.href = URL.createObjectURL(blob)
  a.download = '截图'
  a.click()
}

async function copy() {
  // 设置未激活状态，为了将文字绘制到图像上
  context.setState(inactivatedState)

  await nextTick()
  const blob = await paint.toBlob()
  const data = [
    new ClipboardItem({
      [blob.type]: blob
    })
  ]
  await navigator.clipboard.write(data)
}

async function flip(type: 'v' | 'h') {
  // 设置未激活状态，为了将文字绘制到图像上
  context.setState(inactivatedState)

  await nextTick()
  paint.flip(type)
}
// 撤销
function revoke() {
  paint.revoke()
}

defineExpose({
  loadBg,
  activate,
  download,
  copy,
  flip,
  revoke
})
</script>

<template>
  <div
    class="w-[1280px] h-[720px] mt-[20px] flex flex-col justify-center overflow-hidden"
    ref="view"
  >
    <div
      class="max-w-full max-h-full relative mx-auto"
      :style="{
        transform: `scale(${scale}) translateX(${x}px) translateY(${y}px)`
      }"
    >
      <canvas ref="canvas" class="max-w-full max-h-full"></canvas>
      <TextCover
        v-if="currentStateName === 'isDrawingText'"
        @draw-text="handleDrawText"
      ></TextCover>
      <CutCover v-if="currentStateName === 'isCutting'" @cut="handleCut"></CutCover>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
