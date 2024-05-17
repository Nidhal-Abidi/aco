<script lang="ts">
  import { Chart } from "chart.js/auto"
  import { onMount } from "svelte"
  import { getChartXAxisValues, getChartYAxisValues } from "./ChartDataPoints"

  export let globalBestPathPerIteration
  export let cities

  let chartCanvas: HTMLCanvasElement
  let ctx
  let chartValues = getChartYAxisValues(cities, globalBestPathPerIteration)
  let chartLabels = getChartXAxisValues(globalBestPathPerIteration)

  onMount(() => {
    ctx = chartCanvas.getContext("2d")!
    let chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: "Global Shortest Distance",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: chartValues,
          },
        ],
      },
    })
  })
</script>

<canvas bind:this={chartCanvas}></canvas>
