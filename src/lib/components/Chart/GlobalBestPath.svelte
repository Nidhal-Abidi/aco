<script lang="ts">
  import { Chart } from "chart.js/auto"
  import { beforeUpdate, onMount } from "svelte"
  import { addDataPoint, getChartYAxisValues } from "./ChartDataPoints"
  import { playAntSound } from "../../helpers/playAntSound"
  import type { City } from "../../algorithms/acoAlgorithms"
  import { applyChartTheme, lineChartOptions } from "../../chartTheme"
  import { theme } from "../../theme"

  export let globalBestPathPerIteration: string[][]
  export let cities: City[]
  export let speed
  export let sound

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
            label: "Global Shortest Distance",
            backgroundColor: theme.amber,
            borderColor: theme.amber,
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
    display: block;
  }
</style>
