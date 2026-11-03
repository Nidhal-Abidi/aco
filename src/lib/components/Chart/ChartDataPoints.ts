import type { Chart } from "chart.js"
import {
  getAntPathLength,
  getLengthOfAllEdges,
  type City,
} from "../../algorithms/acoAlgorithms"

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

export function setChartSeries(
  chart: Chart<"line", number[], number>,
  values: number[]
) {
  chart.data.labels = values.map((_, index) => index + 1)
  chart.data.datasets[0].data = values
  chart.update("none")
}
