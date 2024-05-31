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

export function addDataPoint(
  chart: Chart<"line", any[], any>,
  dataPoint: number
) {
  const data = chart.data
  if (data.datasets.length > 0) {
    data.labels?.push(data.labels.length + 1)
    data.datasets[0].data.push(dataPoint)
    chart.update()
  }
}
