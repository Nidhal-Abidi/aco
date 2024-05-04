<script lang="ts">
  import { onMount } from "svelte"
  import type { City } from "../../algorithms/acoAlgorithms"
  import { animate } from "./helpers/animation"
  import { displayCities } from "./helpers/canvasDrawing"

  export let cities
  export let ACOIter
  let canvas: HTMLCanvasElement

  onMount(() => {
    const ctx = canvas.getContext("2d")!
    // You can set the width & height to whatever value you want later.
    canvas.width = 750
    canvas.height = 850
    const btn = document.querySelector("button")!

    displayCities(cities, canvas.width, canvas.height, ctx)

    btn.addEventListener("click", () => {
      //let iter = 0
      animate(ACOIter, 0, canvas.width, canvas.height, ctx)
    })
  })
</script>

<button>Start Animation</button>
<canvas id="canvas" bind:this={canvas}></canvas>

<style>
  #canvas {
    position: relative;
    background-color: #242526;
    height: 100%;
    left: 0;
    top: 2rem;
  }
</style>
