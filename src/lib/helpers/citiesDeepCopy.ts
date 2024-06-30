import type { City } from "../algorithms/acoAlgorithms"

export function deepCopyOfCitiesArray(citiesArr: City[]) {
  let res = []
  for (let i = 0; i < citiesArr.length; i++) {
    const city = citiesArr[i]
    let copiedCity = {
      x: city.x,
      y: city.y,
      name: city.name,
      isVisited: city.isVisited,
      distanceTo: JSON.parse(JSON.stringify(city.distanceTo)),
      pheromoneTo: JSON.parse(JSON.stringify(city.pheromoneTo)),
      lineWidthTo: JSON.parse(JSON.stringify(city.lineWidthTo)),
      edgeAntFlow: JSON.parse(JSON.stringify(city.edgeAntFlow)),
    }
    res.push(copiedCity)
  }
  return res
}
