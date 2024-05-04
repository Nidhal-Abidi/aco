import { type City } from "../algorithms/acoAlgorithms"
export function initializePheromone(cities: City[], initialVal: number) {
  cities.forEach((city) => {
    for (let neighbor in city.pheromoneTo) {
      city.pheromoneTo[neighbor] = initialVal
    }
  })
}
