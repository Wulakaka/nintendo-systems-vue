<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Source from '@/components/ripple/Source'
import * as d3 from 'd3'

const view = ref()

const count = 100

const containerSize = 1000

const itemSize = containerSize / count

// const speed = 0.005 * count
const speed = 0.2

let sources: Source[] = []
let reqId: number

class Item {
  x: number
  y: number
  id: string
  size: number
  t: number
  posX: number
  posY: number
  constructor({ x, y, id, t }: { x: number; y: number; id: string; t: number }, size = 10) {
    this.x = x
    this.y = y
    this.id = id
    this.size = size
    this.t = t

    this.posX = x * size + size / 2
    this.posY = y * size + size / 2
  }

  render(ctx: CanvasRenderingContext2D) {
    this.t = 0
    this.update(1, ctx)
  }

  update(t: number, ctx: CanvasRenderingContext2D) {
    if (t === this.t) return

    const scale = getScale(t)
    const size = this.size * scale
    ctx.clearRect(this.posX - this.size / 2, this.posY - this.size / 2, this.size, this.size)
    this.draw(t, ctx, size)
    // drawHeart(ctx, size, { x: this.posX, y: this.posY })
    this.t = t
  }

  draw(t: number, ctx: CanvasRenderingContext2D, size: number) {
    ctx.fillStyle = getColor(t)
    ctx.fillRect(this.posX - size / 2, this.posY - size / 2, size, size)
  }
}

const items = getItems(count)

onMounted(() => {
  render()
})

function render() {
  const canvas = view.value
  const ctx = canvas.getContext('2d')
  items.forEach((i) => {
    i.render(ctx)
  })
}

function getItems(count: number): Item[] {
  return new Array(Math.pow(count, 2)).fill(null).map((_, index) => {
    const x = index % count
    const y = Math.floor(index / count)
    return new Item(
      {
        id: `${x},${y}`,
        x,
        y,
        t: 1
      },
      itemSize
    )
  })
}

function handleClick(e: PointerEvent) {
  const canvas = view.value
  const ctx = canvas.getContext('2d')

  const width = canvas.offsetWidth / count
  const height = canvas.offsetHeight / count
  const x = Math.floor(e.offsetX / width)
  const y = Math.floor(e.offsetY / height)

  sources.push(new Source(x, y, Math.round(count * 2), speed))

  cancelAnimationFrame(reqId)
  reqId = requestAnimationFrame(() => update(ctx))
}

function update(ctx: CanvasRenderingContext2D) {
  sources = sources.filter((s) => !s.isUseless)
  if (!sources.length) {
    return
  }
  const idSet = sources.reduce((set, s) => {
    s.getPoints().forEach((i) => {
      set.add(i)
    })
    return set
  }, new Set())
  items.forEach((i) => {
    let t = i.t
    if (t < 1) {
      t += 0.01
    }
    if (1e-5 > 1 - t) t = 1
    if (idSet.has(i.id)) {
      t = 0
    }
    i.update(t, ctx)
  })

  reqId = requestAnimationFrame(() => update(ctx))
}

function getColor(t: number) {
  return d3.interpolateHslLong('#e02ad7', '#584aff')(t)
  // return d3.interpolateHslLong('gray', 'aliceblue')(t)
}

function getScale(t: number) {
  return Math.sin(t * 2 * Math.PI) * 0.4 + 0.6
}
</script>
<template>
  <canvas
    ref="view"
    class="ripple-canvas"
    @click="handleClick"
    :width="containerSize"
    :height="containerSize"
  ></canvas>
</template>
<style scoped lang="scss">
.ripple-canvas {
  width: 1000px;
  height: 1000px;
}
</style>
