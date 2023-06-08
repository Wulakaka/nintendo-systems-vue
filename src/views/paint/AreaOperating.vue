<script setup lang="ts">
defineEmits<{
  (e: 'activate', type: 'rect' | 'ellipse' | 'arrow' | 'text'): void
  (e: 'download'): void
  (e: 'confirm'): void
}>()
</script>

<template>
  <div class="p-2 gap-5 flex">
    <button
      class="rounded-full bg-sky-500 text-white px-2 active:bg-sky-600 focus:ring-pink-500 ring"
      @click="$emit('activate', 'rect')"
    >
      rect
    </button>
    <button
      class="rounded-full bg-sky-500 text-white px-2 active:bg-sky-600 focus:ring-pink-500 ring"
      @click="$emit('activate', 'ellipse')"
    >
      ellipse
    </button>
    <button
      class="rounded-full bg-sky-500 text-white px-2 active:bg-sky-600 focus:ring-pink-500 ring"
      @click="$emit('activate', 'arrow')"
    >
      arrow
    </button>
    <button
      class="rounded-full bg-sky-500 text-white px-2 active:bg-sky-600 focus:ring-pink-500 ring"
      @click="$emit('activate', 'text')"
    >
      text
    </button>
    <button
      class="rounded-full bg-sky-500 text-white px-2 active:bg-sky-600 focus:ring-pink-500 ring"
      @click="$emit('download')"
    >
      download
    </button>
    <button
      class="rounded-full bg-sky-500 text-white px-2 active:bg-sky-600 focus:ring-pink-500 ring"
    >
      cancel
    </button>
    <button
      class="rounded-full bg-sky-500 text-white px-2 active:bg-sky-600 focus:ring-pink-500 ring"
      @click="$emit('confirm')"
    >
      confirm
    </button>
  </div>
</template>

<style scoped lang="scss"></style>
