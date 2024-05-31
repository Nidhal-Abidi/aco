<script lang="ts">
  import { Chart } from "chart.js/auto"
  import { onMount } from "svelte"
  import { getChartXAxisValues, getChartYAxisValues } from "./ChartDataPoints"

  function addDataPoint(chart: Chart<"line", any[], any>, dataPoint: number) {
    const data = chart.data
    if (data.datasets.length > 0) {
      data.labels?.push(data.labels.length + 1)
      data.datasets[0].data.push(dataPoint)
      chart.update()
    }
  }

  export let globalBestPathPerIteration
  export let cities
  export let speed

  let chartCanvas: HTMLCanvasElement
  let ctx
  let chartValues: number[] = []
  let chartLabels: number[] = []

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
            label: "Global Shortest Distance",
            backgroundColor: "rgb(34, 139, 34)",
            borderColor: "rgb(34, 139, 34)",
            data: chartValues,
          },
        ],
      },
    })

    const startAnimationBtn = document.querySelector("#start-animation")!
    startAnimationBtn.addEventListener("click", () => {
      const yAxisValues = getChartYAxisValues(
        cities,
        globalBestPathPerIteration
      )
      console.log("From Global Chart:", yAxisValues.length)

      for (let i = 0; i < yAxisValues.length; i++) {
        setTimeout(() => {
          addDataPoint(chart, yAxisValues[i])
        }, 150 * i)
      }
    })
  })
</script>

<canvas bind:this={chartCanvas}></canvas>
