<script setup lang="ts">
import { ref } from 'vue'
import bg from '@/assets/bg.png'
import DialogPrimary from '@/components/dialog/DialogPrimary.vue'

const visible = ref(false)
</script>

<template>
  <div class="h-full bg-[#13161e]" :style="{ backgroundImage: `url('${bg}')` }">
    <button class="appearance-none ring bg-red-200 px-3" @click="visible = true">打开弹框</button>
    <DialogPrimary title="标题" v-model:visible="visible">
      <div class="w-[800px] h-[800px]"></div>
    </DialogPrimary>
  </div>
</template>

<style scoped lang="scss"></style>
