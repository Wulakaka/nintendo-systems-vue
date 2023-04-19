export interface Fragment {
  id: string
  code: string
}
export type Line = string

export declare namespace Line {
  interface Option {
    class: string[]
    href?: string
  }
  type TagName = string
}
