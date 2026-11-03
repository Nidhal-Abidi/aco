export type Playback = {
  start: (
    length: number,
    speedMs: number,
    onFrame: (index: number) => void
  ) => void
  setSpeed: (speedMs: number) => void
  stop: () => void
}

export function createPlayback(): Playback {
  let timer: ReturnType<typeof setTimeout> | undefined
  let index = -1
  let length = 0
  let speed = 50
  let onFrame: (index: number) => void = () => {}
  let running = false

  function clearTimer() {
    if (timer !== undefined) {
      clearTimeout(timer)
      timer = undefined
    }
  }

  function schedule() {
    clearTimer()
    if (!running || index >= length - 1) {
      running = false
      return
    }
    timer = setTimeout(() => {
      index += 1
      onFrame(index)
      schedule()
    }, speed)
  }

  return {
    start(nextLength, speedMs, frame) {
      clearTimer()
      length = nextLength
      speed = speedMs
      onFrame = frame
      if (length <= 0) {
        running = false
        index = -1
        return
      }
      running = true
      index = 0
      onFrame(0)
      schedule()
    },
    setSpeed(speedMs) {
      speed = speedMs
      if (!running) return
      clearTimer()
      schedule()
    },
    stop() {
      running = false
      clearTimer()
    },
  }
}
