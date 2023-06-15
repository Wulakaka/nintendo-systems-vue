<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import DialogPrimaryDecorations from '@/components/dialog/DialogPrimaryDecorations.vue'
import IconClose from '@/components/dialog/IconClose.vue'
import useDisplayAnimation from '@/components/dialog/useDisplayAnimation'
import useFrame from '@/components/dialog/useFrame'
import useShadow from '@/components/dialog/useShadow'

const props = defineProps<{
  title: string
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void
}>()

const visible = computed({
  get() {
    return props.visible
  },
  set(val: boolean) {
    emit('update:visible', val)
  }
})
// 用于控制真正的显示隐藏
const _visible = ref(false)
const el = ref()
watch(visible, (val) => {
  if (val) {
    _visible.value = true
    nextTick(() => {
      resizeHandler()
      show()
      shadowShow(1000 / 0.7 + 500)
    })
  } else {
    hide().then(() => {
      _visible.value = false
    })
  }
})

function close() {
  visible.value = false
}

defineExpose({
  close
})

const panel = ref()

const panelTop = ref(0)
const panelLeft = ref(0)
const panelWidth = ref(0)
const panelHeight = ref(0)

function resizeHandler() {
  const el = panel.value
  if (!el) return
  panelTop.value = el.offsetTop
  panelLeft.value = el.offsetLeft
  panelWidth.value = el.offsetWidth
  panelHeight.value = el.offsetHeight
}
// 边框
const {
  viewBox: outerViewBox,
  borderPath,
  panelPath
} = useFrame(panelLeft, panelTop, panelWidth, panelHeight)
// 动画
const { t, dashArray, show, hide, borderEl } = useDisplayAnimation()
// 白色亮光
const { offset, opacity, show: shadowShow } = useShadow()

onMounted(() => {
  window.addEventListener('resize', resizeHandler, true)
  if (el.value) {
    document.body.appendChild(el.value)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler, true)
})

// 外边框
</script>

<template>
  <div ref="el">
    <div v-if="_visible" class="dialog-primary">
      <svg :viewBox="outerViewBox" @click.self="close">
        <defs>
          <filter id="dialog-primary-shadow">
            <feDropShadow
              :dx="offset"
              :dy="offset"
              stdDeviation="5"
              flood-color="white"
              :flood-opacity="opacity"
            />
            <feDropShadow
              :dx="-offset"
              :dy="-offset"
              stdDeviation="5"
              flood-color="white"
              :flood-opacity="opacity"
            />
          </filter>
        </defs>
        <path
          ref="borderEl"
          :d="borderPath"
          stroke="#20aef8"
          stroke-width="1"
          fill="none"
          :stroke-dasharray="dashArray"
          filter="url(#dialog-primary-shadow)"
        ></path>
      </svg>
      <div
        ref="panel"
        class="dialog-primary__panel"
        :style="{
          clipPath: `path('${panelPath}')`,
          backdropFilter: `blur(${t * 50}px)`,
          opacity: t
        }"
        @resize="resizeHandler"
      >
        <DialogPrimaryDecorations :width="panelWidth" :height="panelHeight" />
        <button class="dialog-primary__close-button" type="button" @click="close">
          <IconClose />
        </button>

        <div class="dialog-primary__main">
          <div class="dialog-primary__head">
            <slot name="head">{{ title }}</slot>
          </div>
          <div class="dialog-primary__body">
            <slot></slot>
          </div>
          <div class="dialog-primary__foot">
            <slot name="foot"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dialog-primary {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  &__panel {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    //backdrop-filter: blur(50px);

    & > svg {
      position: absolute;
      left: 0;
      top: 0;
      pointer-events: none;
    }
  }

  &__close-button {
    position: absolute;
    right: 15px;
    top: 23px;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: 0.5s;

    &:hover {
      transform: rotate(90deg);
    }
  }

  &__main {
    padding: 0 38px;
  }

  &__head {
    padding-top: 28px;
    text-align: center;
    height: 32px;
    color: white;
    line-height: 32px;
    font-size: 24px;
  }
}
</style>
