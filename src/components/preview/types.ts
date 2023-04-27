export interface PreviewScrollParams {
  value: number
  valueInPx: number
  valueInPxMax: number
  delta: number
  contentHeight: number
  viewportHeight: number
}

export interface SectionScrollParams {
  globalRate: number
  innerRate: number
  outerRate: number
}
