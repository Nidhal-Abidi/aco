<script lang="ts">
  import { Chart } from "chart.js/auto"
  import { beforeUpdate, onMount } from "svelte"
  import { addDataPoint, getChartYAxisValues } from "./ChartDataPoints"
  import { playNotes } from "../../helpers/playNotes"

  export let globalBestPathPerIteration
  export let cities
  export let speed
  export let sound

  let chartCanvas: HTMLCanvasElement
  let chart: Chart<"line", number[], number>
  let ctx: CanvasRenderingContext2D
  let chartValues: number[] = []
  let chartLabels: number[] = []

  beforeUpdate(() => {
    if (globalBestPathPerIteration.length > 0) {
      const yAxisValues = getChartYAxisValues(
        cities,
        globalBestPathPerIteration
      )

      for (let i = 0; i < yAxisValues.length; i++) {
        setTimeout(
          () => {
            addDataPoint(chart, yAxisValues[i])
            sound === "on" && playNotes((parseInt(speed) / 10) * i, "square")
          },
          parseInt(speed) * i
        )
      }
    } else {
      if (chart != undefined) {
        chart.destroy()
        chart = new Chart(ctx, {
          type: "line",
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
          data: {
            labels: [],
            datasets: [
              {
                label: "Global Shortest Distance",
                backgroundColor: "rgb(34, 139, 34)",
                borderColor: "rgb(34, 139, 34)",
                data: [],
              },
            ],
          },
        })
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
            label: "Global Shortest Distance",
            backgroundColor: "rgb(34, 139, 34)",
            borderColor: "rgb(34, 139, 34)",
            data: chartValues,
          },
        ],
      },
    })
  })
</script>

<canvas bind:this={chartCanvas}></canvas>
