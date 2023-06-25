<script setup lang="ts">
import { ref } from 'vue'
import bg from '@/assets/bg.png'
import DialogPrimary from '@/components/dialog/DialogPrimary.vue'

const visible = ref(false)

const width = ref(600)

function toggleWidth() {
  if (width.value === 600) {
    width.value = 800
  } else {
    width.value = 600
  }
}
</script>

<template>
  <div class="h-full bg-[#13161e]" :style="{ backgroundImage: `url('${bg}')` }">
    <button class="appearance-none ring bg-red-200 px-3" @click="visible = true">打开弹框</button>
    <DialogPrimary title="标题" v-model:visible="visible">
      <div
        class="h-[800px] data-[width='600']:w-[600px] data-[width='800']:w-[800px] transition-[width]"
        :data-width="width"
      >
        <button
          class="bg-sky-500 rounded-md text-white ring px-3"
          type="button"
          @click="toggleWidth"
        >
          {{ width }}
        </button>
      </div>
    </DialogPrimary>
  </div>
</template>

<style scoped lang="scss"></style>
