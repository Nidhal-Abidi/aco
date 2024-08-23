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

  const originalWidth = 650
  const originalHeight = 530

  // Calculate scaling and translation to center content
  function calculateTransform(canvas) {
    const scaleX = canvas.width / originalWidth
    const scaleY = canvas.height / originalHeight
    const scale = Math.min(scaleX, scaleY)

    const offsetX = (canvas.width - originalWidth * scale) / 2
    const offsetY = (canvas.height - originalHeight * scale) / 2

    return { scale, offsetX, offsetY }
  }

  beforeUpdate(() => {
    globalBestPathPerIterationConverted =
      globalBestPathPerIteration.map(convertPathToEdges)

    //const { scale, offsetX, offsetY } = calculateTransform(canvas)

    /* ctx.save()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.translate(offsetX, offsetY)
    ctx.scale(scale, scale)
 */
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
        displayCities(cities, [], canvas.width, canvas.height, ctx)
      }
    }
  })

  onMount(() => {
    ctx = canvas.getContext("2d")!
    // You can set the width & height to whatever value you want later.
    /* canvas.width = 650
    canvas.height = 530 */

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      const devicePixelRatio = window.devicePixelRatio || 1

      const width = parent!.clientWidth
      const height = parent!.clientHeight

      canvas.width = width * devicePixelRatio
      canvas.height = height * devicePixelRatio

      // Set CSS width and height to match the container size
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      // Scale the drawing context to match the pixel ratio
      const ctx = canvas.getContext("2d")
      ctx!.scale(devicePixelRatio, devicePixelRatio)

      // Display all the cities before any animation
      displayCities(cities, [], canvas.width, canvas.height, ctx)
    }

    resizeCanvas() // Initial resize
    window.addEventListener("resize", resizeCanvas) // Resize on window resize

    return () => window.removeEventListener("resize", resizeCanvas)
  })
</script>

<canvas id="canvas" bind:this={canvas}></canvas>

<style>
  #canvas {
    background-color: #fff8e7;
    width: 100%;
    height: 100%;
    min-width: 300px;
    min-height: 300px;
  }
</style>
