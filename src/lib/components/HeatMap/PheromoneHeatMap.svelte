<script lang="ts">
  import { Chart, type ScriptableContext } from "chart.js/auto"
  import { beforeUpdate, onMount } from "svelte"
  import { MatrixController, MatrixElement } from "chartjs-chart-matrix"
  import type { City } from "../../algorithms/acoAlgorithms"
  import {
    getHeatMapData,
    getHeatMapLabels,
    updateHeatMap,
    type HeatMapDataPoint,
  } from "./HeatMapHelperFunctions"

  export let speed: string
  export let cities: City[]
  export let ACOIterations: City[][]
  export let colonySize: number

  let chartCanvas: HTMLCanvasElement
  let chart: Chart<"matrix", HeatMapDataPoint[], string>
  let ctx: CanvasRenderingContext2D
  let chartValues: HeatMapDataPoint[] = getHeatMapData(cities, colonySize)
  let chartLabels: string[] = getHeatMapLabels(cities)

  const data = {
    datasets: [
      {
        label: "Percentage of ants crossing each edge",
        data: chartValues,
        backgroundColor(context: ScriptableContext<"matrix">) {
          const value = context.raw as HeatMapDataPoint
          const alpha = value.antCount
          return `rgba(3, 4, 94, ${alpha})`
        },
        borderColor: "rgba(3, 4, 94, 0.2)",
        borderWidth: 1,
        width: ({ chart }: { chart: Chart }) =>
          (chart.chartArea || {}).width / chartLabels.length - 1,
        height: ({ chart }: { chart: Chart }) =>
          (chart.chartArea || {}).height / chartLabels.length - 1,
      },
    ],
  }

  beforeUpdate(() => {
    if (ACOIterations.length === 0) {
      console.log("Reset the chart")
    } else {
      for (let iter = 0; iter < ACOIterations.length; iter++) {
        setTimeout(
          () => {
            updateHeatMap(ACOIterations[iter], chart, colonySize)
          },
          parseInt(speed) * iter
        )
      }
    }
  })

  onMount(() => {
    Chart.register(MatrixController, MatrixElement)
    ctx = chartCanvas.getContext("2d")!
    chart = new Chart(ctx, {
      type: "matrix",
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: "category",
            labels: chartLabels,
            ticks: {
              display: true,
            },
            grid: {
              display: false,
            },
          },
          y: {
            type: "category",
            labels: chartLabels,
            offset: true,
            ticks: {
              display: true,
            },
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              title() {
                return ""
              },
              label(context) {
                const value = context.raw as HeatMapDataPoint
                return [
                  `AntFlowRate(${value.x + ", " + value.y}) = ${value.antCount}`,
                ]
              },
            },
          },
        },
      },
      data,
    })
  })
</script>

<canvas bind:this={chartCanvas}></canvas>

<style>
  canvas {
    height: 90%;
    width: 90%;
  }
</style>
