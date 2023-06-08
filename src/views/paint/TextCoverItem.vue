<script setup lang="ts">
import type { TextItem } from '@/views/paint/AttachText'
import { computed, onMounted, ref, toRef } from 'vue'

const props = defineProps<{
  data: TextItem
}>()

const emit = defineEmits<{
  (e: 'focus'): void
  (e: 'blur'): void
  (e: 'remove'): void
}>()

const data = toRef(props, 'data')
const el = ref()

function handleBlur(e: FocusEvent) {
  emit('blur')
  // todo
  // if (!e.target?.innerText) {
  //   console.log('remove')
  //   emit('remove')
  // }
}

function handleFocus() {
  emit('focus')
}

onMounted(() => {
  el.value.focus()
})
</script>

<template>
  <div
    class="absolute p-1 border border-black hover:border-red-600 hover:border-dashed focus:border-red-600 focus:outline-none focus:border-solid"
    contenteditable="true"
    ref="el"
    @blur="handleBlur"
    @focus="handleFocus"
    :style="{
      left: data.x + 'px',
      top: data.y + 'px',
      color: data.color,
      fontSize: data.size + 'px'
    }"
  ></div>
</template>

<style scoped lang="scss"></style>
