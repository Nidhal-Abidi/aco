import type { City } from "../../../algorithms/acoAlgorithms"
import { deepCopyOfCitiesArray } from "../../../helpers/citiesDeepCopy"
import { displayCities } from "./canvasDrawing"

export function animate(
  ACOIterations: City[][],
  globalBestPathsPerIteration: string[][],
  iter: number,
  canvasWidth: number,
  canvasHeight: number,
  ctx: CanvasRenderingContext2D,
  speed = 50
) {
  ;(function f1(cities, iteration) {
    if (iter < ACOIterations.length) {
      // Get the new values of the next drawing
      setTimeout(() => {
        displayCities(
          cities,
          globalBestPathsPerIteration[iter],
          canvasWidth,
          canvasHeight,
          ctx
        )
      }, speed * iteration)

      requestAnimationFrame(() => {
        animate(
          ACOIterations,
          globalBestPathsPerIteration,
          iter + 1,
          canvasWidth,
          canvasHeight,
          ctx
        )
      })
    }
  })(deepCopyOfCitiesArray(ACOIterations[iter]), iter)
}
