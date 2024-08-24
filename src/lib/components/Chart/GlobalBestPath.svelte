<script lang="ts">
  import { Chart } from "chart.js/auto"
  import { beforeUpdate, onMount } from "svelte"
  import { addDataPoint, getChartYAxisValues } from "./ChartDataPoints"
  import { playAntSound } from "../../helpers/playAntSound"
  import type { City } from "../../algorithms/acoAlgorithms"

  export let globalBestPathPerIteration: string[][]
  export let cities: City[]
  export let speed
  export let sound

  let chartCanvas: HTMLCanvasElement
  let chart: Chart<"line", number[], number>
  let ctx: CanvasRenderingContext2D

  function createNewChart() {
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

  beforeUpdate(() => {
    const yAxisValues = getChartYAxisValues(cities, globalBestPathPerIteration)
    if (chart != undefined) {
      chart.destroy()
      createNewChart()
    }
    if (globalBestPathPerIteration.length > 0) {
      for (let i = 0; i < yAxisValues.length; i++) {
        setTimeout(
          () => {
            addDataPoint(chart, yAxisValues[i])
            sound === "on" && playAntSound()
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
    max-height: 250px;
    display: block;
  }
</style>
