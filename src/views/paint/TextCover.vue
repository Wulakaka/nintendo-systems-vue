<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue'
import type { TextItem } from '@/views/paint/AttachText'
import TextCoverItem from '@/views/paint/TextCoverItem.vue'

const list = reactive<TextItem[]>([])

const isFocusItem = ref(false)

function add({ x, y }: { x: number; y: number }) {
  list.push({
    x,
    y,
    text: '',
    size: 12,
    color: 'red'
  })
}

function handleClick(e: MouseEvent) {
  console.log(isFocusItem.value)
  if (isFocusItem.value) return
  add({
    x: e.offsetX,
    y: e.offsetY
  })
}

function handleFocusItem() {
  console.log('focus')
  isFocusItem.value = true
}

function handleBlurItem() {
  setTimeout(() => {
    isFocusItem.value = false
  }, 100)
}

function handleRemove(data: TextItem) {
  const index = list.indexOf(data)
  if (index > -1) {
    list.splice(index, 1)
  }
}
</script>

<template>
  <div class="absolute w-full h-full left-0 top-0" @mousedown.self="handleClick">
    <TextCoverItem
      v-for="i in list"
      :data="i"
      :key="i"
      @focus="handleFocusItem"
      @blur="handleBlurItem"
      @remove="handleRemove(i)"
    ></TextCoverItem>
  </div>
</template>

<style scoped lang="scss"></style>
