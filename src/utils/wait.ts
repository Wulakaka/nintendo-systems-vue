export default function wait(duration: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, duration)
  })
}
