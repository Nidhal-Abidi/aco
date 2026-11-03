<script lang="ts">
  import { Chart } from "chart.js/auto"
  import { onDestroy, onMount } from "svelte"
  import { getChartYAxisValues, setChartSeries } from "./ChartDataPoints"
  import { playAntSound } from "../../helpers/playAntSound"
  import type { City } from "../../algorithms/acoAlgorithms"
  import { applyChartTheme, lineChartOptions } from "../../chartTheme"
  import { theme } from "../../theme"

  export let globalBestPathPerIteration: string[][]
  export let cities: City[]
  export let sound: string
  export let frame = -1

  let chartCanvas: HTMLCanvasElement
  let chart: Chart<"line", number[], number> | undefined
  let soundedFrame = -1

  function createNewChart(ctx: CanvasRenderingContext2D) {
    applyChartTheme()
    chart = new Chart(ctx, {
      type: "line",
      options: lineChartOptions(),
      data: {
        labels: [],
        datasets: [
          {
            label: "Global best path",
            backgroundColor: theme.amber,
            borderColor: theme.amber,
            data: [],
          },
        ],
      },
    })
  }

  $: yValues = getChartYAxisValues(cities, globalBestPathPerIteration)

  $: if (chart) {
    const visible = frame < 0 ? [] : yValues.slice(0, frame + 1)
    setChartSeries(chart, visible)
  }

  $: if (frame !== soundedFrame) {
    const current = frame
    if (
      sound === "on" &&
      current > soundedFrame &&
      current > 0 &&
      yValues[current] < yValues[current - 1]
    ) {
      playAntSound()
    }
    soundedFrame = current
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
