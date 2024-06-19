<script lang="ts">
  import { beforeUpdate, onMount } from "svelte"
  import { animate } from "./helpers/animation"
  import { displayCities } from "./helpers/canvasDrawing"
  import { convertPathToEdges } from "./helpers/bestAntPaths"

  export let cities
  export let ACOIter
  export let globalBestPathPerIteration: string[][]
  export let speed

  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D
  let globalBestPathPerIterationConverted = []

  beforeUpdate(() => {
    globalBestPathPerIterationConverted =
      globalBestPathPerIteration.map(convertPathToEdges)

    if (globalBestPathPerIterationConverted.length > 0) {
      animate(
        ACOIter,
        globalBestPathPerIterationConverted,
        0,
        canvas.width,
        canvas.height,
        ctx,
        parseInt(speed)
      )
    } else {
      if (ctx != undefined) {
        displayCities(cities, [], 650, 530, ctx)
      }
    }
  })

  onMount(() => {
    ctx = canvas.getContext("2d")!
    // You can set the width & height to whatever value you want later.
    canvas.width = 650
    canvas.height = 530

    // Display all the cities before any animation
    displayCities(cities, [], canvas.width, canvas.height, ctx)
  })
</script>

<canvas id="canvas" bind:this={canvas}></canvas>

<style>
  #canvas {
    background-color: #1a1818;
    position: relative;
    left: 0;
  }
</style>
