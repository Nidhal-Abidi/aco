import { startACOForTSP } from "./lib/algorithms/acoAlgorithms"
import { deepCopyOfCitiesArray } from "./lib/helpers/citiesDeepCopy"
import { initializePheromone } from "./lib/helpers/tspInitialPheromone"

self.onmessage = function (e) {
  try {
    const { cities, userControls } = e.data

    let updatedCities = deepCopyOfCitiesArray(cities)
    if (userControls.acoMode !== "max-min-as") {
      updatedCities = initializePheromone(
        updatedCities,
        Number(userControls.initialPheromone)
      )
    }

    const result = startACOForTSP(
      updatedCities,
      userControls.acoMode,
      Number(userControls.elitistWeight),
      Number(userControls.colonySize),
      Number(userControls.alpha),
      Number(userControls.beta),
      Number(userControls.rho),
      Number(userControls.nbrOfIterations),
      (progress) => {
        self.postMessage({ type: "progress", value: progress })
      }
    )

    self.postMessage({
      type: "result",
      updatedCities,
      ACOIterations: result.iterations,
      localBestPathPerIteration: result.localBestPathPerIteration,
      globalBestPathPerIteration: result.globalBestPathPerIteration,
    })
  } catch (error) {
    self.postMessage({
      type: "error",
      message: error instanceof Error ? error.message : "ACO worker failed",
    })
  }
}
