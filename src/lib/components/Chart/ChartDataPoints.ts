import {
  getAntPathLength,
  getLengthOfAllEdges,
  type City,
} from "../../algorithms/acoAlgorithms"

export function getChartXAxisValues(bestPathPerIteration: string[][]) {
  return bestPathPerIteration.map((currentIter, idx) => idx)
}

export function getChartYAxisValues(
  cities: City[],
  bestPathPerIteration: string[][]
) {
  const allEdgesLengths = getLengthOfAllEdges(cities)
  let yAxisValues = []
  for (const currentIterBestPath of bestPathPerIteration) {
    yAxisValues.push(getAntPathLength(currentIterBestPath, allEdgesLengths))
  }
  return yAxisValues
}
