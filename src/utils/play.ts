export default function play(fn: (t: number) => void, interval = 1e-3) {
  let t = 0
  fn(t)
  const step = () => {
    t += interval
    fn(t)
    if (t < 1) {
      requestAnimationFrame(step)
    }
  }
  step()
}
