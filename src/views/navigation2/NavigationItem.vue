<script setup lang="ts">
defineProps<{
  name: string
  active: boolean
}>()

defineEmits<{
  (e: 'click', name: string): void
}>()
</script>

<template>
  <div
    class="px-3 py-1 cursor-pointer data-[active=true]:bg-gradient-to-b from-cyan-500 to-transparent border-l-[1px] border-t-[1px] border-inherit relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-purple-600 data-[active=true]:after:bg-transparent"
    :data-active="active"
    @click="$emit('click', name)"
  >
    {{ name }}
  </div>
</template>

<style scoped lang="scss"></style>
