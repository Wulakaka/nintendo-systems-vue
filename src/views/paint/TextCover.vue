<script setup lang="ts">
import { onBeforeUnmount, reactive, ref } from 'vue'
import type { TextItem } from '@/views/paint/AttachText'
import TextCoverItem from '@/views/paint/TextCoverItem.vue'

const emit = defineEmits<{
  (e: 'drawText', val: TextItem[]): void
}>()

const list = reactive<TextItem[]>([])

const hasActiveItem = ref(false)

function add({ x, y }: { x: number; y: number }) {
  list.push({
    x,
    y,
    text: '',
    size: 20,
    color: 'red'
  })
}

function handleMouseDown(e: MouseEvent) {
  if (hasActiveItem.value) return
  add({
    x: e.offsetX,
    y: e.offsetY
  })
}

function handleActivateItem() {
  hasActiveItem.value = true
}

function handleDeactivateItem() {
  hasActiveItem.value = false
}

function handleRemove(data: TextItem) {
  const index = list.indexOf(data)
  if (index > -1) {
    list.splice(index, 1)
  }
}

onBeforeUnmount(() => {
  emit('drawText', list)
})
</script>

<template>
  <div class="absolute w-full h-full left-0 top-0" @mousedown.self="handleMouseDown">
    <TextCoverItem
      v-for="i in list"
      :data="i"
      :key="i"
      @activate="handleActivateItem"
      @deactivate="handleDeactivateItem"
      @remove="handleRemove(i)"
    ></TextCoverItem>
  </div>
</template>

<style scoped lang="scss"></style>
