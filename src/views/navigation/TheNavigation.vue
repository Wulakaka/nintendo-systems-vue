<script setup lang="ts">
import NavRound from '@/views/navigation/NavRound.vue'
import NavigationItem from '@/views/navigation/NavigationItem.vue'
import NavRoundInner from '@/views/navigation/NavRoundInner.vue'
</script>
<template>
  <div class="flex">
    <NavRound></NavRound>
    <NavRoundInner></NavRoundInner>
  </div>
  <div class="flex">
    <NavigationItem></NavigationItem>
    <NavigationItem></NavigationItem>
    <NavigationItem></NavigationItem>
  </div>
</template>
<style scoped></style>
