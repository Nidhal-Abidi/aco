import type { City } from "../algorithms/acoAlgorithms"

export function normalizeDistance(cities: City[]) {
  const [min, max] = getMaxAndMin(cities)
  for (const city of cities) {
    for (const neighborName in city.distanceTo) {
      const currentDistance = city.distanceTo[neighborName]
      city.distanceTo[neighborName] = getNormalizedDistance(
        currentDistance,
        min,
        max
      )
    }
  }
}

function getNormalizedDistance(
  distance: number,
  minDistance: number,
  maxDistance: number
) {
  return (distance - minDistance) / (maxDistance - minDistance)
}

function getMaxAndMin(cities: City[]) {
  let max = 0
  let min = 10000
  for (const city of cities) {
    for (const neighborName in city.distanceTo) {
      if (city.distanceTo[neighborName] < min) {
        min = city.distanceTo[neighborName]
      }
      if (city.distanceTo[neighborName] > max) {
        max = city.distanceTo[neighborName]
      }
    }
  }
  return [min, max]
}
