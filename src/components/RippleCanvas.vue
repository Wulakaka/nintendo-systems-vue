<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Layer, Sprite, Scene } from 'spritejs'
import Source from '@/components/ripple/Source'

const view = ref()

const count = 100

let sources: Source[] = []
let reqId: number

class Item {
  x: number
  y: number
  id: string
  size: number
  el: Sprite
  _t: number
  constructor({ x, y, id, t }: { x: number; y: number; id: string; t: number }, size = 10) {
    this.x = x
    this.y = y
    this.id = id
    this.size = size
    this._t = t

    const posX = x * size + size / 2
    const posY = y * size + size / 2

    this.el = new Sprite({
      anchor: [0.5, 0.5],
      size: [size, size],
      pos: [posX, posY],
      bgcolor: 'gray'
    })

    this.el.addEventListener('click', () => {
      handleClick({ x, y })
    })
  }

  render(layer: Layer) {
    layer.append(this.el)
  }

  set t(val: number) {
    this._t = val
    this.update(val)
  }

  get t() {
    return this._t
  }

  update(t: number) {
    const scale = 0.3 + Math.abs(t - 0.3)
    this.el.attr({
      size: [this.size * scale, this.size * scale]
    })
  }
}

const items = getItems(count)

function handleClick({ x, y }: { x: number; y: number }) {
  sources.push(new Source(x, y, Math.round(count * Math.pow(2, 0.5)), 0.2))

  cancelAnimationFrame(reqId)
  reqId = requestAnimationFrame(update)
}

function update() {
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
    if (i.t) {
      i.t -= 0.1
    }
    if (1e-5 > i.t) i.t = 0
    if (idSet.has(i.id)) {
      i.t = 1
    }
  })

  reqId = requestAnimationFrame(update)
}

onMounted(() => {
  render()
})

function render() {
  const container = view.value

  const scene = new Scene({
    container,
    width: 400,
    height: 400
  })

  const layer = scene.layer()

  items.forEach((i) => {
    i.render(layer)
  })

  // const box = new Sprite({
  //   anchor: [0.5, 0.5],
  //   size: [150, 150],
  //   pos: [100, 100],
  //   bgcolor: 'black'
  // })
  // layer.append(box)
}

function getItems(count: number): Item[] {
  return new Array(Math.pow(count, 2)).fill(null).map((_, index) => {
    const x = index % count
    const y = Math.floor(index / count)
    return new Item({
      id: `${x},${y}`,
      x,
      y,
      t: 0
    })
  })
}
</script>
<template>
  <div ref="view" class="ripple-canvas"></div>
</template>
<style scoped lang="scss">
.ripple-canvas {
  width: 800px;
  height: 800px;
}
</style>
