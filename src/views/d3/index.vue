<script setup lang="ts">
import { defineComponent } from 'vue'

defineComponent({
  name: 'D3View'
})
</script>

<template>
  <div class="flex">
    <div class="flex flex-col">
      <router-link to="/d3/axis">Axis</router-link>
      <router-link to="/d3/hierarchies">Hierarchies</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss"></style>
