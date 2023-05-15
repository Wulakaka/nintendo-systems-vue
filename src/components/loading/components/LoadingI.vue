<script setup lang="ts">
import chain from '@/utils/chain'
import Blink from '@/models/Blink'
import RandomText from '@/models/RandomText'
import { computed, ref } from 'vue'
import wait from '@/utils/wait'

const cursorText = new Blink('&#9608;', '&nbsp;')
const randomText = new RandomText('hello world')

const random = ref('')
const cursor = ref('')

const text = computed(() => {
  return (random.value + cursor.value).padEnd(12, ' ').replace(/ /g, '&nbsp;')
})

defineExpose({
  show
})

function handleRandomText(t: string) {
  requestAnimationFrame(function () {
    random.value = t
  })
}

function show() {
  return chain(
    function () {
      cursorText.show(
        (t) => {
          cursor.value = t
        },
        {
          duration: 2e3,
          interval: 1e2
        }
      )
      return randomText.show(handleRandomText, { duration: 300, delay: 500, interval: 20 })
    },
    () => wait(1000)
  )
}
</script>
<template><span v-html="text"></span></template>
<style scoped lang="scss"></style>
