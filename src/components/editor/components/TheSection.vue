<script setup lang="ts">
import type { Fragment } from '@/components/editor/types'
import { computed, ref } from 'vue'
import Code from '@/models/Code'
import TheLine from '@/components/editor/components/TheLine.vue'

const props = defineProps<{
  data: Fragment
}>()

const lines = computed(() => Code.splitToLines(props.data.code))
</script>
<template>
  <TheLine v-for="(i, index) in lines" :data="i" :key="index"></TheLine>
</template>
<style scoped lang="scss"></style>
