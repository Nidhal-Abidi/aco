<script lang="ts">
  import { afterUpdate, beforeUpdate, onMount } from "svelte"
  import { animate } from "./helpers/animation"
  import { displayCities } from "./helpers/canvasDrawing"
  import { convertPathToEdges } from "./helpers/bestAntPaths"
  import type { City } from "../../algorithms/acoAlgorithms"

  export let cities: City[]
  export let ACOIter: City[][]
  export let globalBestPathPerIteration: string[][]
  export let speed: string

  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D
  let globalBestPathPerIterationConverted: string[][] = []

  const ORIGINAL_WIDTH = 650
  const ORIGINAL_HEIGHT = 530
  let scale = 1

  function resizeCanvas() {
    let containerDiv = canvas.parentElement
    if (containerDiv && canvas) {
      console.log("RESCALING!!!")
      const rect = containerDiv.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      scale = Math.min(
        canvas.width / ORIGINAL_WIDTH,
        canvas.height / ORIGINAL_HEIGHT
      )

      if (ctx) {
        ctx.setTransform(scale, 0, 0, scale, 0, 0)
        redraw()
      }
    }
  }

  function redraw() {
    if (globalBestPathPerIterationConverted.length > 0) {
      animate(
        ACOIter,
        globalBestPathPerIterationConverted,
        0,
        ORIGINAL_WIDTH,
        ORIGINAL_HEIGHT,
        ctx,
        parseInt(speed)
      )
    } else {
      displayCities(cities, [], ORIGINAL_WIDTH, ORIGINAL_HEIGHT, ctx)
    }
  }

  beforeUpdate(() => {
    globalBestPathPerIterationConverted =
      globalBestPathPerIteration.map(convertPathToEdges)
  })

  onMount(() => {
    ctx = canvas.getContext("2d")!
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    return () => window.removeEventListener("resize", resizeCanvas)
  })

  afterUpdate(() => {
    redraw()
  })
</script>

<canvas id="canvas" bind:this={canvas}></canvas>

<style>
  canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
