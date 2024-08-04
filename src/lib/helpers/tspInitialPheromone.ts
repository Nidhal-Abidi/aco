import { type City } from "../algorithms/acoAlgorithms"
export function initializePheromone(cities: City[], initialVal: number) {
  return cities.map((city) => {
    const newPheromoneTo = Object.keys(city.pheromoneTo).reduce(
      (acc: Record<string, number>, key: string) => {
        acc[key] = initialVal
        return acc
      },
      {}
    )
    return { ...city, pheromoneTo: newPheromoneTo }
  })
}
