<script setup lang="ts">
import { defineComponent } from 'vue'
import TheBubbles from '@/views/bubbles/TheBubbles.vue'

defineComponent({
  name: 'BubblesView'
})
</script>

<template>
  <div class="w-[600px] h-[600px]">
    <TheBubbles />
  </div>
</template>

<style scoped lang="scss"></style>
