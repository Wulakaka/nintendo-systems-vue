<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import NavigationItem from '@/views/navigation2/NavigationItem.vue'

defineComponent({
  name: 'GradientNav'
})

const names = ['导航1', '导航2', '导航3', '导航4']

const activeName = ref(names[0])
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex m-auto w-[600px] border-purple-600">
      <NavigationItem
        v-for="i in names"
        :name="i"
        :key="i"
        :active="activeName === i"
        @click="(name) => (activeName = name)"
      ></NavigationItem>
      <div class="border-l-[1px] border-b-[1px] grow border-inherit"></div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
