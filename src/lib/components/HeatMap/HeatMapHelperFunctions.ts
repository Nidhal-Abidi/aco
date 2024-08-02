import type { Chart } from "chart.js"
import { roundUpTo3Decimal, type City } from "../../algorithms/acoAlgorithms"

export type HeatMapDataPoint = {
  x: string
  y: string
  antCount: number
}

export function getHeatMapLabels(cities: City[]) {
  return cities.map((city) => city.name)
}

export function getHeatMapData(
  AcoCurrentIteration: City[],
  colonySize: number
) {
  let heatMapData: HeatMapDataPoint[] = []
  for (const city of AcoCurrentIteration) {
    // Pheromone = 0 for the same city
    heatMapData.push({ x: city.name, y: city.name, antCount: 0 })
    for (const neighbor in city.edgeAntFlow) {
      heatMapData.push({
        x: city.name,
        y: neighbor,
        antCount: roundUpTo3Decimal(
          city.edgeAntFlow[neighbor] / (colonySize * 2)
        ),
      })
    }
  }
  return heatMapData
}

export function updateHeatMap(
  AcoCurrentIteration: City[],
  chart: Chart<"matrix", HeatMapDataPoint[], string>,
  colonySize: number
) {
  const updatedHeatMapData = getHeatMapData(AcoCurrentIteration, colonySize)
  chart.data.datasets[0].data = updatedHeatMapData
  chart.update()
}
