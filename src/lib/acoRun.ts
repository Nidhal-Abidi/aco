import type { City } from "./algorithms/acoAlgorithms"

export type AcoWorkerResult = {
  updatedCities: City[]
  ACOIterations: City[][]
  localBestPathPerIteration: string[][]
  globalBestPathPerIteration: string[][]
}

type AcoWorkerMessage =
  | { type: "progress"; value: number }
  | ({ type: "result" } & AcoWorkerResult)
  | { type: "error"; message?: string }

export type AcoWorkerLike = {
  terminate: () => void
  onmessage: ((event: { data: AcoWorkerMessage }) => void) | null
  onerror: ((event: { message?: string }) => void) | null
}

export function completeAcoRun(
  worker: AcoWorkerLike,
  onProgress: (value: number) => void
): Promise<AcoWorkerResult> {
  return new Promise((resolve, reject) => {
    worker.onmessage = (event) => {
      const data = event.data
      if (data?.type === "progress") {
        onProgress(data.value)
        return
      }
      if (data?.type === "result") {
        worker.terminate()
        onProgress(100)
        resolve({
          updatedCities: data.updatedCities,
          ACOIterations: data.ACOIterations,
          localBestPathPerIteration: data.localBestPathPerIteration,
          globalBestPathPerIteration: data.globalBestPathPerIteration,
        })
        return
      }
      if (data?.type === "error") {
        worker.terminate()
        reject(new Error(data.message || "ACO worker failed"))
      }
    }
    worker.onerror = (event) => {
      worker.terminate()
      reject(new Error(event.message || "ACO worker failed"))
    }
  })
}
