<script setup lang="ts">
import type { TextItem } from '@/views/paint/AttachText'
import { onMounted, ref, toRef } from 'vue'

const props = defineProps<{
  data: TextItem
}>()

const emit = defineEmits<{
  (e: 'activate'): void
  (e: 'deactivate'): void
  (e: 'remove'): void
}>()

const data = toRef(props, 'data')
const el = ref()

const editable = ref(false)

class State {
  name?: string
  handle() {
    throw new Error('need implement')
  }
}

class ActiveState extends State {
  name = 'active'
  handle() {
    editable.value = true
    setTimeout(() => {
      el.value.focus()
    })
    emit('activate')
    el.value.removeEventListener('mousedown', mousedownHandler)
  }
}

class InactiveState extends State {
  name = 'inactive'
  handle() {
    editable.value = false
    const text = el.value.innerHTML
    if (!text) {
      emit('remove')
    } else {
      data.value.text = text
    }
    emit('deactivate')

    el.value.addEventListener('mousedown', mousedownHandler)
  }
}

class Context {
  private _state?: State

  setState(state: State) {
    this._state = state
  }

  get state() {
    return this._state?.name
  }

  request() {
    this._state?.handle()
  }
}

const context = new Context()

function handleBlur(e: FocusEvent) {
  context.setState(new InactiveState())
  context.request()
}

function handleDblClick() {
  if (context.state === 'inactive') {
    context.setState(new ActiveState())
    context.request()
  }
}
let startX = 0,
  startY = 0
function mousedownHandler(e: MouseEvent) {
  startX = e.x
  startY = e.y
  el.value.addEventListener('mousemove', mousemoveHandler)
  el.value.addEventListener('mouseup', mouseupHandler)
}
function mousemoveHandler(e: MouseEvent) {
  data.value.x += e.x - startX
  data.value.y += e.y - startY
  startX = e.x
  startY = e.y
}

function mouseupHandler() {
  el.value.removeEventListener('mousemove', mousemoveHandler)
  el.value.removeEventListener('mouseup', mouseupHandler)
}

onMounted(() => {
  context.setState(new ActiveState())
  context.request()
})
</script>

<template>
  <div
    class="absolute p-1 outline outline-black hover:outline-red-600 hover:outline-dashed focus:outline-red-600 focus:outline-none focus:outline-solid data-[editable=false]:cursor-move data-[editable=false]:select-none -translate-y-1/2 -translate-x-1 font-mono"
    :contenteditable="editable"
    :data-editable="editable"
    ref="el"
    @blur="handleBlur"
    @dblclick="handleDblClick"
    :style="{
      left: data.x + 'px',
      top: data.y + 'px',
      color: data.color,
      fontSize: data.size + 'px'
    }"
  ></div>
</template>

<style scoped lang="scss"></style>
