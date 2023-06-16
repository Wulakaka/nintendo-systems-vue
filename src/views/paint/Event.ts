const eventTarget = new EventTarget()
const stackChange = new CustomEvent('stackChange')

export function dispatch() {
  eventTarget.dispatchEvent(stackChange)
}

export function addListener(fn: () => void) {
  eventTarget.addEventListener('stackChange', fn)
}
