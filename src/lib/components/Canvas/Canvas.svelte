<script lang="ts">
  import { onMount } from "svelte"
  import { animate } from "./helpers/animation"
  import { displayCities } from "./helpers/canvasDrawing"
  import { convertPathToEdges } from "./helpers/bestAntPaths"

  export let cities
  export let ACOIter
  let canvas: HTMLCanvasElement
  export let globalBestPathPerIteration: string[][]

  let globalBestPathPerIterationConverted =
    globalBestPathPerIteration.map(convertPathToEdges)

  onMount(() => {
    const ctx = canvas.getContext("2d")!
    // You can set the width & height to whatever value you want later.
    canvas.width = 650
    canvas.height = 530
    const btn = document.querySelector("#start-animation")!

    // Display all the cities before any animation
    displayCities(cities, [], canvas.width, canvas.height, ctx)

    btn.addEventListener("click", () => {
      animate(
        ACOIter,
        globalBestPathPerIterationConverted,
        0,
        canvas.width,
        canvas.height,
        ctx
      )
    })
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
