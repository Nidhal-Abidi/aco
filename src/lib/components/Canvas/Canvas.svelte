<script lang="ts">
  import { onMount } from "svelte"
  import { displayCities } from "./helpers/canvasDrawing"
  import { convertPathToEdges } from "./helpers/bestAntPaths"
  import type { City } from "../../algorithms/acoAlgorithms"

  export let cities: City[]
  export let ACOIter: City[][]
  export let globalBestPathPerIteration: string[][]
  export let frame = -1

  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D | undefined
  let viewWidth = 0
  let viewHeight = 0

  function paint() {
    if (!ctx || viewWidth < 1 || viewHeight < 1) return
    if (frame >= 0 && ACOIter[frame]) {
      const path = globalBestPathPerIteration[frame] ?? []
      displayCities(
        ACOIter[frame],
        convertPathToEdges(path),
        viewWidth,
        viewHeight,
        ctx
      )
      return
    }
    displayCities(cities, [], viewWidth, viewHeight, ctx)
  }

  function resizeCanvas() {
    const containerDiv = canvas?.parentElement
    if (!containerDiv || !canvas || !ctx) return
    const rect = containerDiv.getBoundingClientRect()
    viewWidth = rect.width
    viewHeight = rect.height
    const dpr = window.devicePixelRatio || 1
    canvas.width = Math.max(1, Math.round(viewWidth * dpr))
    canvas.height = Math.max(1, Math.round(viewHeight * dpr))
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    paint()
  }

  $: frame, cities, ACOIter, globalBestPathPerIteration, paint()

  onMount(() => {
    ctx = canvas.getContext("2d") ?? undefined
    const container = canvas.parentElement
    const observer = new ResizeObserver(() => resizeCanvas())
    if (container) observer.observe(container)
    resizeCanvas()
    document.fonts?.ready.then(() => paint())
    return () => observer.disconnect()
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
