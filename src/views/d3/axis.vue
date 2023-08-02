<script setup lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import * as d3 from 'd3'
defineComponent({
  name: 'D3Axis'
})

const el = ref()

onMounted(() => {
  render()
})

function render() {
  const svg = d3.select(el.value)

  console.log(svg)

  const scale = d3.scaleLinear([0, 1000])

  const axis = d3.axisTop(scale)
  axis.ticks(20, 's')

  svg.append('g').attr('transform', 'translate(0, 50)').call(d3.axisTop(scale))
}
</script>

<template>
  <svg ref="el" viewBox="0 0 1000 1000" width="800" height="800"></svg>
</template>

<style scoped lang="scss"></style>
