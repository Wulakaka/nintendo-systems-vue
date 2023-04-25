interface Point {
  x: number
  y: number
}

export default class Source {
  x: number
  y: number
  r = 0
  edge = 10
  constructor(x: number, y: number, edge = 10) {
    this.x = x
    this.y = y
    this.edge = edge
    this.update()
  }

  update() {
    if (this.r <= this.edge) {
      this.r += 0.5
      requestAnimationFrame(() => this.update())
    }
  }

  get isUseless() {
    return this.r >= this.edge
  }

  isPointInEdge(x: number, y: number) {
    const min = Math.pow(this.r - 1, 2)
    const max = Math.pow(this.r, 2)
    const distance = Math.pow(x, 2) + Math.pow(y, 2)
    return min <= distance && distance <= max
  }

  getRange() {
    const a = Math.pow(2, 0.5)
    const leftTop = { x: Math.floor(this.r / a), y: 0 }
    const rightBottom = { x: Math.ceil(this.r), y: Math.ceil(this.r / a) }
    return {
      leftTop,
      rightBottom
    }
  }

  getPointsInRange(p1: Point, p2: Point) {
    const arr = []
    const minX = Math.min(p1.x, p2.x)
    const maxX = Math.max(p1.x, p2.x)
    const minY = Math.min(p1.y, p2.y)
    const maxY = Math.max(p1.y, p2.y)
    for (let i = minX; i <= maxX; i++) {
      for (let j = minY; j <= maxY; j++) {
        if (this.isPointInEdge(i, j)) {
          arr.push(`${i + this.x},${j + this.y}`)
        }
      }
    }
    return arr
  }

  getPoints() {
    const arr = []
    const { leftTop, rightBottom } = this.getRange()
    arr.push(...this.getPointsInRange(leftTop, rightBottom))
    arr.push(
      ...this.getPointsInRange(
        { x: leftTop.y, y: leftTop.x },
        { x: rightBottom.y, y: rightBottom.x }
      )
    )
    arr.push(
      ...this.getPointsInRange(
        { x: -leftTop.x, y: leftTop.y },
        { x: -rightBottom.x, y: rightBottom.y }
      )
    )
    arr.push(
      ...this.getPointsInRange(
        { x: -leftTop.y, y: leftTop.x },
        { x: -rightBottom.y, y: rightBottom.x }
      )
    )
    arr.push(
      ...this.getPointsInRange(
        { x: leftTop.x, y: -leftTop.y },
        { x: rightBottom.x, y: -rightBottom.y }
      )
    )
    arr.push(
      ...this.getPointsInRange(
        { x: leftTop.y, y: -leftTop.x },
        { x: rightBottom.y, y: -rightBottom.x }
      )
    )
    arr.push(
      ...this.getPointsInRange(
        { x: -leftTop.x, y: -leftTop.y },
        { x: -rightBottom.x, y: -rightBottom.y }
      )
    )
    arr.push(
      ...this.getPointsInRange(
        { x: -leftTop.y, y: -leftTop.x },
        { x: -rightBottom.y, y: -rightBottom.x }
      )
    )

    return arr
  }
}
