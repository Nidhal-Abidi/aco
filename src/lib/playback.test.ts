import { afterEach, describe, expect, it, vi } from "vitest"
import { createPlayback } from "./playback"

describe("createPlayback", () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it("steps one frame at a time and stops when reset", () => {
    vi.useFakeTimers()
    const frames: number[] = []
    const playback = createPlayback()

    playback.start(4, 100, (index) => frames.push(index))
    expect(frames).toEqual([0])

    vi.advanceTimersByTime(100)
    expect(frames).toEqual([0, 1])

    playback.stop()
    vi.advanceTimersByTime(500)
    expect(frames).toEqual([0, 1])
  })

  it("keeps the current frame when the speed changes", () => {
    vi.useFakeTimers()
    const frames: number[] = []
    const playback = createPlayback()

    playback.start(4, 100, (index) => frames.push(index))
    playback.setSpeed(40)
    vi.advanceTimersByTime(40)

    expect(frames).toEqual([0, 1])
  })
})