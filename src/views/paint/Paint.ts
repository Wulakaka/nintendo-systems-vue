import Stack from '@/views/paint/Stack'

export default class Paint {
  // 存储操作的栈
  private imageDataStack = new Stack<{ width: number; height: number; imageData: ImageData }>()
  private cover: { x: number; y: number; width: number; height: number } | null = null
  private canvas?: HTMLCanvasElement
  private ctx?: CanvasRenderingContext2D
  private scale = 1

  set el(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true })!
  }

  // 保存状态
  store() {
    if (!this.canvas) return
    if (!this.ctx) return
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
    this.imageDataStack.push({
      imageData: imageData,
      width: this.canvas.width,
      height: this.canvas.height
    })
  }

  private setSize(width: number, height: number) {
    if (!this.canvas) return
    if (!this.ctx) return

    this.canvas.width = width
    this.canvas.height = height
    // 获取缩放比例
    this.scale = this.canvas.clientWidth / (this.canvas.width || 1)
  }
  // 修正单位
  private correctUnit(n: number) {
    return (n / this.scale) | 0
  }

  // 设置背景图
  setBackground(el: HTMLImageElement | HTMLVideoElement) {
    if (!this.canvas) return
    if (!this.ctx) return

    if (el instanceof HTMLVideoElement) {
      this.setSize(el.videoWidth, el.videoHeight)
    } else {
      this.setSize(el.width, el.height)
    }
    this.ctx.drawImage(el, 0, 0)
    this.store()
  }

  // 撤销
  revoke() {
    if (!this.canvas) return
    if (!this.ctx) return

    this.imageDataStack.pop()
    const lastData = this.imageDataStack.last
    if (lastData) {
      const { imageData, width, height } = lastData
      this.setSize(width, height)
      this.ctx.putImageData(imageData, 0, 0)
    }
  }

  // 恢复上一次绘制过的图像区域
  private repairCover() {
    if (!this.ctx) return
    const imgData = this.imageDataStack.last.imageData
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
  // 绘制椭圆
  drawEllipse(
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    lineWidth = 4,
    color = 'red'
  ) {
    if (!this.canvas) return
    if (!this.ctx) return

    // 变换比例
    x = this.correctUnit(x)
    y = this.correctUnit(y)
    radiusX = this.correctUnit(radiusX)
    radiusY = this.correctUnit(radiusY)
    lineWidth = this.correctUnit(lineWidth)

    this.ctx.save()
    this.repairCover()

    this.ctx.beginPath()
    this.ctx.lineWidth = lineWidth
    this.ctx.strokeStyle = color
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

    // 变换比例
    x = this.correctUnit(x)
    y = this.correctUnit(y)
    width = this.correctUnit(width)
    height = this.correctUnit(height)
    lineWidth = this.correctUnit(lineWidth)

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

    // 变换比例
    startX = this.correctUnit(startX)
    startY = this.correctUnit(startY)
    endX = this.correctUnit(endX)
    endY = this.correctUnit(endY)
    size = this.correctUnit(size)

    // 角度
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

  // 填充文本
  fillText(text: string, size: number, x: number, y: number, color: string) {
    if (!this.canvas) return
    if (!this.ctx) return

    // 变换比例
    x = this.correctUnit(x)
    y = this.correctUnit(y)
    size = this.correctUnit(size)

    this.ctx.save()
    this.ctx.fillStyle = color
    this.ctx.textBaseline = 'top'
    this.ctx.font = `${size}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`

    // 手动调整了高度，可能不同的size需要调整的不一样
    y = y - size / 2 + 2
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

  // 水平翻转
  private flipHorizontal() {
    if (!this.canvas) return
    if (!this.ctx) return
    const canvas = this.canvas
    // 获取imageData
    const imageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    // 遍历ImageData的像素数据，将每一行的像素进行水平翻转
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width / 2; x++) {
        const index1 = (y * canvas.width + x) * 4
        const index2 = (y * canvas.width + (canvas.width - x - 1)) * 4

        for (let i = 0; i < 4; i++) {
          const temp = data[index1 + i]
          data[index1 + i] = data[index2 + i]
          data[index2 + i] = temp
        }
      }
    }

    // 将翻转后的ImageData绘制回canvas上
    this.ctx.putImageData(imageData, 0, 0)
  }

  // 垂直翻转
  private flipVertical() {
    if (!this.canvas) return
    if (!this.ctx) return
    const canvas = this.canvas
    // 获取imageData
    const imageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    // 遍历 ImageData 的像素数据，并垂直翻转每一列像素
    for (let x = 0; x < canvas.width; x++) {
      for (let y = 0; y < canvas.height / 2; y++) {
        const index1 = (y * canvas.width + x) * 4
        const index2 = ((canvas.height - y - 1) * canvas.width + x) * 4

        for (let i = 0; i < 4; i++) {
          const temp = data[index1 + i]
          data[index1 + i] = data[index2 + i]
          data[index2 + i] = temp
        }
      }
    }

    // 将翻转后的ImageData绘制回canvas上
    this.ctx.putImageData(imageData, 0, 0)
  }

  // 翻转
  flip(type: 'v' | 'h') {
    switch (type) {
      case 'h':
        this.flipHorizontal()
        break
      case 'v':
        this.flipVertical()
        break
      default:
    }
    this.store()
  }

  // 裁剪
  crop(x: number, y: number, width: number, height: number) {
    if (!width || !height) return
    x = this.correctUnit(x)
    y = this.correctUnit(y)
    width = this.correctUnit(width)
    height = this.correctUnit(height)

    if (!this.canvas) return
    if (!this.ctx) return
    const canvas = this.canvas
    // 获取imageData
    const imageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height)

    this.ctx.save()
    this.ctx.clearRect(0, 0, canvas.width, canvas.height)
    // 重设尺寸
    this.setSize(width, height)
    this.ctx.putImageData(imageData, -x, -y, x, y, width, height)
    this.ctx.restore()
    this.store()
  }

  // 获取图像
  get dataURL() {
    return this.canvas?.toDataURL()
  }

  // 获取Blob对象
  toBlob(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      try {
        if (!this.canvas) {
          reject(new Error('无canvas对象'))
          return
        }
        this.canvas.toBlob((blob) => {
          if (blob) resolve(blob)
          else reject(new Error('toBlob返回为' + blob))
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  onStackChange(fn: (size: number) => void) {
    this.imageDataStack.onSizeChange(fn)
  }
}
