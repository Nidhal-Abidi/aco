import type { City } from "../algorithms/acoAlgorithms"

export function deepCopyOfCitiesArray(citiesArr: City[] | undefined): City[] {
  if (citiesArr == undefined) return []
  return citiesArr.map((city) => ({
    x: city.x,
    y: city.y,
    name: city.name,
    isVisited: city.isVisited,
    distanceTo: { ...city.distanceTo },
    pheromoneTo: { ...city.pheromoneTo },
    lineWidthTo: { ...city.lineWidthTo },
    edgeAntFlow: { ...(city.edgeAntFlow ?? {}) },
  }))
}
