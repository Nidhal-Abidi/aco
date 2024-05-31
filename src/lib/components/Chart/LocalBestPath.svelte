<script lang="ts">
  import { Chart } from "chart.js/auto"
  import { beforeUpdate, onMount } from "svelte"
  import { addDataPoint, getChartYAxisValues } from "./ChartDataPoints"

  export let localBestPathPerIteration
  export let cities

  let chartCanvas: HTMLCanvasElement
  let chart: Chart<"line", number[], number>
  let ctx: CanvasRenderingContext2D
  let chartValues: number[] = []
  let chartLabels: number[] = []

  beforeUpdate(() => {
    if (localBestPathPerIteration.length > 0) {
      const yAxisValues = getChartYAxisValues(cities, localBestPathPerIteration)

      for (let i = 0; i < yAxisValues.length; i++) {
        setTimeout(() => {
          addDataPoint(chart, yAxisValues[i])
        }, 150 * i)
      }
    }
  })

  onMount(() => {
    ctx = chartCanvas.getContext("2d")!
    chart = new Chart(ctx, {
      type: "line",
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: "Local Shortest Distance (Per iteration)",
            backgroundColor: "rgb(0, 119, 190)",
            borderColor: "rgb(0, 119, 190)",
            data: chartValues,
            cubicInterpolationMode: "monotone",
          },
        ],
      },
    })
  })
</script>

<canvas bind:this={chartCanvas}></canvas>
