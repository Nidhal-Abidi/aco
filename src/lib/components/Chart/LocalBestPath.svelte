<script lang="ts">
  import { Chart } from "chart.js/auto"
  import { beforeUpdate, onMount } from "svelte"
  import { addDataPoint, getChartYAxisValues } from "./ChartDataPoints"
  import { applyChartTheme, lineChartOptions } from "../../chartTheme"
  import { theme } from "../../theme"

  export let localBestPathPerIteration
  export let cities
  export let speed

  let chartCanvas: HTMLCanvasElement
  let chart: Chart<"line", number[], number>
  let ctx: CanvasRenderingContext2D

  function createNewChart() {
    applyChartTheme()
    chart = new Chart(ctx, {
      type: "line",
      options: lineChartOptions(),
      data: {
        labels: [],
        datasets: [
          {
            label: "Local Shortest Distance (Per iteration)",
            backgroundColor: theme.accent,
            borderColor: theme.accent,
            data: [],
            cubicInterpolationMode: "monotone",
          },
        ],
      },
    })
  }

  beforeUpdate(() => {
    if (chart != undefined) {
      chart.destroy()
      createNewChart()
    }
    if (localBestPathPerIteration.length > 0) {
      const yAxisValues = getChartYAxisValues(cities, localBestPathPerIteration)

      for (let i = 0; i < yAxisValues.length; i++) {
        setTimeout(
          () => {
            addDataPoint(chart, yAxisValues[i])
          },
          parseInt(speed) * i
        )
      }
    }
  })

  onMount(() => {
    ctx = chartCanvas.getContext("2d")!
    createNewChart()
  })
</script>

<canvas bind:this={chartCanvas}></canvas>

<style>
  canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
