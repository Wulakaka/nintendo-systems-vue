<script setup lang="ts">
import { useCode } from '@/components/editor/compositions/useCode'
import TheSection from '@/components/editor/components/TheSection.vue'

const { fragments, getCode } = useCode()
getCode()

const sectionMap = new Map()
</script>
<template>
  <ol>
    <TheSection v-for="i in fragments" :data="i" :key="i.id"></TheSection>
  </ol>
</template>
<style scoped lang="scss"></style>
