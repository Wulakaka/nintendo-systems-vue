type P = () => Promise<unknown>
export default function chain(...args: P[]) {
  return new Promise((resolve) => {
    const length = args.length
    if (length) {
      let p = args[0]()
      for (let m = 1; m < length; ++m) {
        p = p.then(args[m])
      }
      p.then(resolve)
    } else {
      resolve(void 0)
    }
  })
}
