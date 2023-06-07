import Stack from '@/views/paint/Stack'

export default class Paint {
  imageDataStack = new Stack<ImageData>()
  cover: { x: number; y: number; width: number; height: number } | null = null
  canvas?: HTMLCanvasElement
  ctx?: CanvasRenderingContext2D

  set el(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true })!
  }

  store() {
    if (!this.canvas) return
    if (!this.ctx) return
    // const dataURL = this.canvas.toDataURL()
    // this.imageDataStack.push(dataURL)
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
    this.imageDataStack.push(imageData)
  }

  private setSize(img: HTMLImageElement) {
    if (!this.canvas) return
    if (!this.ctx) return

    this.canvas.width = img.width
    this.canvas.height = img.height
  }

  setBackground(img: HTMLImageElement) {
    if (!this.canvas) return
    if (!this.ctx) return

    this.setSize(img)
    this.ctx.drawImage(img, 0, 0)
    this.store()
  }

  revoke() {
    if (!this.canvas) return
    if (!this.ctx) return

    this.imageDataStack.pop()
    const imageData = this.imageDataStack.last
    if (imageData) {
      this.ctx.putImageData(imageData, 0, 0)
    }
  }

  // drawImg(
  //   img: HTMLImageElement,
  //   sx = 0,
  //   sy = 0,
  //   sWidth = img.width,
  //   sHeight = img.height,
  //   dx = 0,
  //   dy = 0,
  //   dWidth = img.width,
  //   dHeight = img.height
  // ) {
  //   this.ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  // }

  drawCircle(x: number, y: number, radiusX: number, radiusY: number, lineWidth = 4) {
    if (!this.canvas) return
    if (!this.ctx) return

    this.ctx.save()
    const imgData = this.imageDataStack.last
    const lastCover = this.cover
    if (imgData && lastCover) {
      this.ctx.putImageData(
        imgData,
        0,
        0,
        lastCover.x,
        lastCover.y,
        lastCover.width,
        lastCover.height
      )
    }

    this.ctx.beginPath()
    this.ctx.lineWidth = lineWidth
    this.ctx.strokeStyle = 'green'
    this.ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2, false)
    this.ctx.stroke()
    this.ctx.closePath()
    this.ctx.restore()
    this.cover = {
      x: x - radiusX - lineWidth / 2,
      y: y - radiusY - lineWidth / 2,
      width: radiusX * 2 + lineWidth,
      height: radiusY * 2 + lineWidth
    }
  }
}
