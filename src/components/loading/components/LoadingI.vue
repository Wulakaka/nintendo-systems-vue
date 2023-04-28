<script setup lang="ts">
import chain from '@/utils/chain'
import Blink from '@/models/Blink'
import RandomText from '@/models/RandomText'
import { ref } from 'vue'

const cursorText = new Blink('&#9608;', '&nbsp;')
const randomText = new RandomText('hello world')

const text = ref('')
const cursor = ref('')

defineExpose({
  show
})

function handleRandomText(t: string) {
  requestAnimationFrame(function () {
    text.value = t.padEnd(12, ' ').replace(/ /g, '&nbsp;')
  })
}

function show() {
  return chain(function () {
    cursorText.show(
      (t) => {
        cursor.value = t
      },
      {
        duration: 1e3,
        interval: 1e2
      }
    )
    return randomText.show(handleRandomText, { duration: 300, delay: 500, interval: 20 })
  })
}
</script>
<template><span v-html="text"></span><span v-html="cursor"></span></template>
<style scoped lang="scss"></style>
