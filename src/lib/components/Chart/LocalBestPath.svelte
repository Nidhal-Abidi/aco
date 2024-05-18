<script lang="ts">
  import { Chart } from "chart.js/auto"
  import { onMount } from "svelte"
  import { getChartXAxisValues, getChartYAxisValues } from "./ChartDataPoints"

  export let localBestPathPerIteration
  export let cities

  let chartCanvas: HTMLCanvasElement
  let ctx
  let chartValues = getChartYAxisValues(cities, localBestPathPerIteration)
  let chartLabels = getChartXAxisValues(localBestPathPerIteration)

  onMount(() => {
    ctx = chartCanvas.getContext("2d")!
    let chart = new Chart(ctx, {
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
