import Stack from '@/views/paint/Stack'

export default class Paint {
  // 存储操作的栈
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

  // 恢复上一次绘制过的图像区域
  private repairCover() {
    if (!this.ctx) return
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
  }

  drawEllipse(x: number, y: number, radiusX: number, radiusY: number, lineWidth = 4) {
    if (!this.canvas) return
    if (!this.ctx) return

    this.ctx.save()
    this.repairCover()

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

  // 绘制矩形
  drawRect(x: number, y: number, width: number, height: number, lineWidth = 4, color = 'red') {
    if (!this.canvas) return
    if (!this.ctx) return

    this.ctx.save()
    this.repairCover()

    this.ctx.beginPath()
    this.ctx.lineWidth = lineWidth
    this.ctx.strokeStyle = color
    this.ctx.rect(x, y, width, height)
    this.ctx.stroke()
    this.ctx.closePath()
    this.ctx.restore()
    this.cover = {
      x: x - lineWidth / 2,
      y: y - lineWidth / 2,
      width: width + lineWidth,
      height: height + lineWidth
    }
  }

  // 绘制箭头
  drawArrow(startX: number, startY: number, endX: number, endY: number, size = 20, color = 'red') {
    if (!this.canvas) return
    if (!this.ctx) return

    const theta = Math.atan2(endY - startY, endX - startX)

    this.ctx.save()
    this.repairCover()

    this.ctx.beginPath()
    this.ctx.moveTo(startX, startY)

    this.ctx.translate(endX, endY)
    this.ctx.rotate(theta)

    const drawHead = (size: number) => {
      const angle = Math.PI - Math.PI / 8
      const x1 = size * Math.cos(angle)
      const y1 = size * Math.sin(angle)

      const angle2 = Math.PI / 8
      const x2 = x1 + y1 * Math.tan(angle2)
      const y2 = 0

      const x3 = x1
      const y3 = -y1

      const x4 = (x1 + x2) / 2
      const y4 = (y1 + y2) / 2

      const x5 = x4
      const y5 = -y4

      // 4-->1-->(0,0)-->3-->5
      this.ctx?.lineTo(x4, y4)
      this.ctx?.lineTo(x1, y1)
      this.ctx?.lineTo(0, 0)
      this.ctx?.lineTo(x3, y3)
      this.ctx?.lineTo(x5, y5)
      this.ctx?.closePath()
    }
    drawHead(size)
    this.ctx.fillStyle = color
    this.ctx.fill()
    this.ctx.restore()
    const minX = Math.min(startX, endX)
    const maxX = Math.max(startX, endX)
    const minY = Math.min(startY, endY)
    const maxY = Math.max(startY, endY)

    this.cover = {
      x: minX - size,
      y: minY - size,
      width: maxX - minX + size * 2,
      height: maxY - minY + size * 2
    }
  }

  fillText(text: string, size: number, x: number, y: number, color: string) {
    if (!this.canvas) return
    if (!this.ctx) return
    this.ctx.save()

    this.ctx.fillStyle = color
    this.ctx.textBaseline = 'top'
    this.ctx.font = `${size}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`

    // 手动调整了高度，可能不同的size需要调整的不一样
    y = y - size / 2 + 1
    this.ctx.fillText(text, x, y)

    const t = this.ctx.measureText(text)
    this.cover = {
      x,
      y,
      width: t.width,
      height: size
    }
    this.ctx.restore()
    this.store()
  }
}
