<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
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
const paint = new Paint()
paint.onStackChange((size) => {
  revocable.value = size > 1
})
const drawEllipse = new DrawEllipse(paint)
const drawRect = new DrawRect(paint)
const drawArrow = new DrawArrow(paint)

class InactivatedState extends State {
  constructor() {
    super('inactivated')
  }

  handle() {
    removeAllListeners()
  }
}

class IsDrawingRectState extends State {
  constructor() {
    super('isDrawingRect')
  }

  handle() {
    removeAllListeners()
    drawRect.addListeners()
  }
}
class IsDrawingEllipseState extends State {
  constructor() {
    super('isDrawingEllipse')
  }

  handle() {
    removeAllListeners()
    drawEllipse.addListeners()
  }
}
class IsDrawingArrowState extends State {
  constructor() {
    super('isDrawingArrow')
  }

  handle() {
    removeAllListeners()
    drawArrow.addListeners()
  }
}
class IsDrawingTextState extends State {
  constructor() {
    super('isDrawingText')
  }

  handle() {
    removeAllListeners()
  }
}
class IsCuttingState extends State {
  constructor() {
    super('isCutting')
  }

  handle() {
    removeAllListeners()
  }
}

const context = reactive(new Context())
const inactivatedState = new InactivatedState()
const isDrawingEllipseState = new IsDrawingEllipseState()
const isDrawingRectState = new IsDrawingRectState()
const isDrawingArrowState = new IsDrawingArrowState()
const isDrawingTextState = new IsDrawingTextState()
const isCuttingState = new IsCuttingState()

context.setState(inactivatedState)
context.request()

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

  // 撤销功能
  document.addEventListener('keydown', keydownHandler)
})

function removeAllListeners() {
  drawEllipse.removeListeners()
  drawRect.removeListeners()
  drawArrow.removeListeners()
}

onBeforeUnmount(() => {
  // 设置为未激活状态
  context.setState(inactivatedState)
  context.request()
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
  context.request()
}

async function download() {
  // 设置未激活状态，为了将文字绘制到图像上
  context.setState(inactivatedState)
  context.request()

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
  context.request()

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
  context.request()

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
  <div class="w-[1280px] h-[720px] mt-[20px] flex flex-col justify-center">
    <div class="max-w-full max-h-full relative mx-auto">
      <canvas ref="canvas" class="max-w-full max-h-full"></canvas>
      <TextCover v-if="context.state === 'isDrawingText'" @draw-text="handleDrawText"></TextCover>
      <CutCover v-if="context.state === 'isCutting'" @cut="handleCut"></CutCover>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
