<script setup lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import * as d3 from 'd3'
import useD3 from '@/views/d3/useChart'
defineComponent({
  name: 'HierarchyView'
})

function chart() {
  const width = 1000
  const height = width

  const svg = d3
    .create('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('width', width)
    .attr('height', height)

  const data = {
    name: 'Eve',
    children: [
      { name: 'Cain' },
      { name: 'Seth', children: [{ name: 'Enos' }, { name: 'Noam' }] },
      { name: 'Abel' },
      { name: 'Awan', children: [{ name: 'Enoch' }] },
      { name: 'Azura' }
    ]
  }

  const root = d3.hierarchy(data).sum((d) => (d.children ? 1 : 0))

  const tree = d3.tree()
  console.log(tree(root))

  return svg.node()
}

const { container } = useD3(chart)
</script>

<template>
  <div ref="container"></div>
</template>

<style scoped lang="scss"></style>
