<script setup lang="ts">
import { ref } from 'vue'
import Blink from '@/models/Blink'

const chars = ref('')
const charsEnd = ref('')
const bar = ref('')
const label = new Blink('DOWNLOADING:', 'DOWNLOADING '.replace(/ /g, '&nbsp;'))
label.show(() => {}, { duration: 5e3, interval: 1e2 })
function show(t: number) {
  return new Promise((resolve) => {
    const count = (30 * t) | 0
    chars.value = label.value.replace(/ /g, '&nbsp;')
    bar.value = '&#9608;'.repeat(count) + '&#9617;'.repeat(30 - count)
    charsEnd.value = (((100 * t) | 0) + '').padStart(3, ' ').replace(/ /g, '&nbsp;') + '%&nbsp;'
    resolve(void 0)
  })
}

defineExpose({
  show
})
</script>
<template>
  <p>
    <span class="chars" v-html="chars"></span><span class="bar" v-html="bar"></span
    ><span class="chars" v-html="charsEnd"></span>
  </p>
</template>
<style scoped lang="scss"></style>
