<script lang="ts">
  import { Chart, type ScriptableContext } from "chart.js/auto"
  import { onDestroy, onMount } from "svelte"
  import { MatrixController, MatrixElement } from "chartjs-chart-matrix"
  import type { City } from "../../algorithms/acoAlgorithms"
  import {
    getHeatMapData,
    getHeatMapLabels,
    updateHeatMap,
    type HeatMapDataPoint,
  } from "./HeatMapHelperFunctions"
  import { applyChartTheme } from "../../chartTheme"
  import { heatCellColor, theme } from "../../theme"

  export let cities: City[]
  export let ACOIterations: City[][]
  export let colonySize: number
  export let frame = -1

  let chartCanvas: HTMLCanvasElement
  let chart: Chart<"matrix", HeatMapDataPoint[], string> | undefined
  let ctx: CanvasRenderingContext2D | undefined
  let labelKey = ""

  function createNewChart(iterationCities: City[]) {
    if (!ctx) return
    applyChartTheme()
    const chartLabels = getHeatMapLabels(iterationCities)
    labelKey = chartLabels.join("|")
    const chartValues = getHeatMapData(iterationCities, colonySize)
    chart = new Chart(ctx, {
      type: "matrix",
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        layout: {
          padding: {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          },
        },
        scales: {
          x: {
            type: "category",
            labels: chartLabels,
            ticks: {
              display: true,
              color: theme.muted,
            },
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
          },
          y: {
            type: "category",
            labels: chartLabels,
            offset: true,
            ticks: {
              display: true,
              color: theme.muted,
            },
            grid: {
              display: false,
            },
            border: {
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
                  `Edge ant flow (${value.x}, ${value.y}) = ${value.antCount}`,
                ]
              },
            },
          },
        },
      },
      data: {
        datasets: [
          {
            label: "Edge ant flow",
            data: chartValues,
            backgroundColor(context: ScriptableContext<"matrix">) {
              const value = context.raw as HeatMapDataPoint
              return heatCellColor(value.antCount)
            },
            borderColor: theme.border,
            borderWidth: 1,
            width: ({ chart }: { chart: Chart }) =>
              (chart.chartArea || {}).width / chartLabels.length - 1,
            height: ({ chart }: { chart: Chart }) =>
              (chart.chartArea || {}).height / chartLabels.length - 1,
          },
        ],
      },
    })
  }

  function draw(iterationCities: City[], ants: number) {
    if (!ctx) return
    const nextKey = getHeatMapLabels(iterationCities).join("|")
    if (!chart || nextKey !== labelKey) {
      chart?.destroy()
      createNewChart(iterationCities)
      return
    }
    updateHeatMap(iterationCities, chart, ants)
  }

  $: draw(
    frame >= 0 && ACOIterations[frame] ? ACOIterations[frame] : cities,
    colonySize
  )

  onMount(() => {
    Chart.register(MatrixController, MatrixElement)
    ctx = chartCanvas.getContext("2d") ?? undefined
    draw(cities, colonySize)
  })

  onDestroy(() => chart?.destroy())
</script>

<canvas bind:this={chartCanvas}></canvas>

<style>
  canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
