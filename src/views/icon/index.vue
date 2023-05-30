<script setup lang="ts">
import { defineComponent } from 'vue'
import IconIntegration from '@/views/icon/IconIntegration.vue'

defineComponent({
  name: 'IconList'
})
</script>

<template>
  <div class="bg-[#2b2c32] flex h-full justify-center flex-col">
    <div class="flex justify-center">
      <IconIntegration></IconIntegration>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
