<script setup lang="ts">
import { Fragment } from '@/components/editor/types'

defineProps<{
  data: Fragment
}>()
</script>
<template>
  <span class="frag" :class="data.id">{{ data.code }}</span>
</template>
<style scoped lang="scss">
.frag {
}
</style>
