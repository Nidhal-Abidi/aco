import { describe, expect, it, vi } from "vitest"
import { completeAcoRun, type AcoWorkerLike } from "./acoRun"

function fakeWorker() {
  const terminate = vi.fn()
  const worker: AcoWorkerLike = {
    terminate: () => {
      terminate()
    },
    onmessage: null,
    onerror: null,
  }
  return { worker, terminate }
}

describe("completeAcoRun", () => {
  it("rejects and stops the worker when the worker reports an error", async () => {
    const { worker, terminate } = fakeWorker()
    const promise = completeAcoRun(worker, () => {})

    worker.onerror?.({ message: "boom" })

    await expect(promise).rejects.toThrow("boom")
    expect(terminate).toHaveBeenCalledOnce()
  })

  it("rejects when the worker posts an error result", async () => {
    const { worker, terminate } = fakeWorker()
    const promise = completeAcoRun(worker, () => {})

    worker.onmessage?.({ data: { type: "error", message: "bad tour" } })

    await expect(promise).rejects.toThrow("bad tour")
    expect(terminate).toHaveBeenCalledOnce()
  })

  it("resolves a finished run and reports 100", async () => {
    const { worker, terminate } = fakeWorker()
    const progress: number[] = []
    const promise = completeAcoRun(worker, (value) => progress.push(value))
    const payload = {
      type: "result" as const,
      updatedCities: [],
      ACOIterations: [],
      localBestPathPerIteration: [],
      globalBestPathPerIteration: [],
    }

    worker.onmessage?.({ data: payload })

    await expect(promise).resolves.toMatchObject({
      ACOIterations: [],
      localBestPathPerIteration: [],
    })
    expect(progress).toEqual([100])
    expect(terminate).toHaveBeenCalledOnce()
  })
})
