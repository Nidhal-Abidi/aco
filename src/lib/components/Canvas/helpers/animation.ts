import type { City } from "../../../algorithms/acoAlgorithms"
import { deepCopyOfCitiesArray } from "../../../helpers/citiesDeepCopy"
import { displayCities } from "./canvasDrawing"

export function animate(
  ACOIterations: City[][],
  iter: number,
  canvasWidth: number,
  canvasHeight: number,
  ctx: CanvasRenderingContext2D,
  speed = 100
) {
  if (iter < ACOIterations.length) {
    // Get the new values of the next drawing

    ;(function f1(cities, iteration) {
      setTimeout(() => {
        console.log("Iter=", iteration)
        displayCities(cities, canvasWidth, canvasHeight, ctx)
      }, speed * iteration)
      requestAnimationFrame(() => {
        animate(ACOIterations, iter, canvasWidth, canvasHeight, ctx)
      })
    })(deepCopyOfCitiesArray(ACOIterations[iter]), iter)

    iter += 1
  }
}
