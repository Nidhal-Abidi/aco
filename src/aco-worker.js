import { startACOForTSP } from "./lib/algorithms/acoAlgorithms"
import {
  extractGlobalBestPathPerIteration,
  extractLocalBestPathPerIteration,
} from "./lib/components/Canvas/helpers/bestAntPaths"
import { initializePheromone } from "./lib/helpers/tspInitialPheromone"

self.onmessage = function (e) {
  const { cities, userControls } = e.data

  // Initialize pheromone
  const updatedCities = initializePheromone(
    cities,
    Number(userControls.initialPheromone)
  )

  const [ACOIterations, antsChosenPaths] = startACOForTSP(
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

  let globalBestPathPerIteration = extractGlobalBestPathPerIteration(
    updatedCities,
    antsChosenPaths
  )
  let localBestPathPerIteration = extractLocalBestPathPerIteration(
    updatedCities,
    antsChosenPaths
  )

  // Send the final result
  self.postMessage({
    type: "result",
    updatedCities,
    ACOIterations,
    antsChosenPaths,
    localBestPathPerIteration,
    globalBestPathPerIteration,
  })
}
