<script setup lang="ts">
import { ref } from 'vue'
import Blink from '@/models/Blink'
import chain from '@/utils/chain'

const text = ref('')
const b = new Blink('COMPLETE&#9608;', 'COMPLETE&nbsp;')
defineExpose({
  show: () => {
    return chain(() =>
      b.show((t) => (text.value = t), {
        duration: 1000,
        interval: 100
      })
    )
  }
})
</script>

<template>
  <p v-html="text"></p>
</template>

<style scoped lang="scss"></style>
