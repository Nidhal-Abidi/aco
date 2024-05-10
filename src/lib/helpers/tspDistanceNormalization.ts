import type { City } from "../algorithms/acoAlgorithms"
import { deepCopyOfCitiesArray } from "./citiesDeepCopy"

export function minMaxDistanceNormalization(cities: City[]) {
  const [min, max] = getMaxAndMin(cities)
  for (const city of cities) {
    for (const neighborName in city.distanceTo) {
      const currentDistance = city.distanceTo[neighborName]
      city.distanceTo[neighborName] = getMinMaxNormalizedDistance(
        currentDistance,
        min,
        max
      )
    }
  }
}

function getMinMaxNormalizedDistance(
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

export function decimalDistanceNormalization(cities: City[]) {
  const [min, max] = getMaxAndMin(cities)
  for (const city of cities) {
    for (const neighborName in city.distanceTo) {
      const currentDistance = city.distanceTo[neighborName]
      city.distanceTo[neighborName] = getDecimalNormalizedDistance(
        currentDistance,
        max
      )
    }
  }
}

function getDecimalNormalizedDistance(distance: number, maxDistance: number) {
  return distance / maxDistance
}

export function ZScoreDistanceNormalization(cities: City[]) {
  const allEdgesLengths = getAllEdgesLengths(cities)
  const mean = getMean(allEdgesLengths)
  const stdDeviation = getStandardDeviation(mean, allEdgesLengths)
  let minNormalizedDistance = 0

  for (const city of cities) {
    for (const neighborName in city.distanceTo) {
      const currentDistance = city.distanceTo[neighborName]
      const normalizedDistance = getZScoreNormalizedDistance(
        currentDistance,
        mean,
        stdDeviation
      )
      if (normalizedDistance < minNormalizedDistance) {
        minNormalizedDistance = normalizedDistance
      }
      city.distanceTo[neighborName] = normalizedDistance
    }
  }
  // Shift all the values so that they all become positive
  for (const city of cities) {
    for (const neighborName in city.distanceTo) {
      city.distanceTo[neighborName] -= minNormalizedDistance
    }
  }
}

function getZScoreNormalizedDistance(
  distance: number,
  mean: number,
  stdDeviation: number
): number {
  return (distance - mean) / stdDeviation
}

function getMean(allEdgesLengths: number[]) {
  const sum = allEdgesLengths.reduce((partialSum, a) => partialSum + a, 0)
  return sum / allEdgesLengths.length
}

function getStandardDeviation(mean: number, allEdgesLengths: number[]) {
  let variation = 0
  for (let edgeLength of allEdgesLengths) {
    variation += (edgeLength - mean) ** 2
  }
  return (variation / allEdgesLengths.length) ** 0.5
}

function getAllEdgesLengths(cities: City[]): number[] {
  let rslt: number[] = []
  let remainingCities = deepCopyOfCitiesArray(cities)
  while (remainingCities.length > 1) {
    let currentCity = remainingCities[0]
    for (let i = 1; i < remainingCities.length; i++) {
      const neighborName = remainingCities[i].name
      rslt.push(currentCity.distanceTo[neighborName])
    }
    remainingCities.shift()
  }
  return rslt
}
