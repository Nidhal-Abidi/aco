<script lang="ts">
  import { Chart } from "chart.js/auto"
  import { onDestroy, onMount } from "svelte"
  import { getChartYAxisValues, setChartSeries } from "./ChartDataPoints"
  import { applyChartTheme, lineChartOptions } from "../../chartTheme"
  import { theme } from "../../theme"
  import type { City } from "../../algorithms/acoAlgorithms"

  export let localBestPathPerIteration: string[][]
  export let cities: City[]
  export let frame = -1

  let chartCanvas: HTMLCanvasElement
  let chart: Chart<"line", number[], number> | undefined

  function createNewChart(ctx: CanvasRenderingContext2D) {
    applyChartTheme()
    chart = new Chart(ctx, {
      type: "line",
      options: lineChartOptions(),
      data: {
        labels: [],
        datasets: [
          {
            label: "Local best path",
            backgroundColor: theme.accent,
            borderColor: theme.accent,
            data: [],
            cubicInterpolationMode: "monotone",
          },
        ],
      },
    })
  }

  $: yValues = getChartYAxisValues(cities, localBestPathPerIteration)

  $: if (chart) {
    const visible = frame < 0 ? [] : yValues.slice(0, frame + 1)
    setChartSeries(chart, visible)
  }

  onMount(() => {
    const ctx = chartCanvas.getContext("2d")
    if (ctx) createNewChart(ctx)
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
