<script lang="ts">
  import { type City } from "./lib/algorithms/acoAlgorithms"
  import Canvas from "./lib/components/Canvas/Canvas.svelte"
  import GlobalBestPath from "./lib/components/Chart/GlobalBestPath.svelte"
  import LocalBestPath from "./lib/components/Chart/LocalBestPath.svelte"
  import UserControls from "./lib/components/UserControls.svelte"
  import {
    cities5,
    cities7,
    cities10,
    cities15,
    cities20,
  } from "./lib/helpers/citiesArrays"
  import { deepCopyOfCitiesArray } from "./lib/helpers/citiesDeepCopy"
  import { unlockAntSound } from "./lib/helpers/playAntSound"
  import PheromoneHeatMap from "./lib/components/HeatMap/PheromoneHeatMap.svelte"
  import CalculationOverlay from "./lib/components/CalculationOverlay/CalculationOverlay.svelte"
  import Worker from "./aco-worker?worker"
  import { onDestroy, onMount, tick } from "svelte"
  import ExecutionTime from "./lib/components/ExecutionTime.svelte"
  import { completeAcoRun, type AcoWorkerLike } from "./lib/acoRun"
  import { createPlayback } from "./lib/playback"
  import { defaultControls, type AcoControls } from "./lib/defaultControls"

  let userControls: AcoControls = { ...defaultControls }
  let isCalculating = false
  let progress = 0
  let runError = ""
  let frame = -1
  let runToken = 0

  let ACOIterations: City[][] = []
  let globalBestPathPerIteration: string[][] = []
  let localBestPathPerIteration: string[][] = []
  let timeSpent = 0
  let cities: City[] = deepCopyOfCitiesArray(cities10)
  let travelMap: HTMLElement | undefined
  let activeWorker: Worker | undefined
  let speed = defaultControls.speed
  const playback = createPlayback()

  $: playback.setSpeed(Number(speed))

  function citiesForCount(count: string) {
    switch (count) {
      case "5":
        return deepCopyOfCitiesArray(cities5)
      case "7":
        return deepCopyOfCitiesArray(cities7)
      case "10":
        return deepCopyOfCitiesArray(cities10)
      case "15":
        return deepCopyOfCitiesArray(cities15)
      case "20":
        return deepCopyOfCitiesArray(cities20)
      default:
        throw new Error(`Unknown city count: ${count}`)
    }
  }

  function revealTravelMap() {
    if (!window.matchMedia("(max-width: 768px)").matches) return
    travelMap?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  function clearRunVisuals() {
    playback.stop()
    frame = -1
    ACOIterations = []
    globalBestPathPerIteration = []
    localBestPathPerIteration = []
    timeSpent = 0
  }

  async function updateUserControls(e: CustomEvent<AcoControls>) {
    unlockAntSound()
    if (isCalculating) return
    const token = ++runToken
    isCalculating = true
    runError = ""
    progress = 0
    userControls = { ...e.detail }
    cities = citiesForCount(userControls.nbrOfCities)
    clearRunVisuals()

    try {
      const result = await runACO(cities, userControls)
      if (token !== runToken) return
      progress = 100
      await tick()
      if (token !== runToken) return
      ACOIterations = result.ACOIterations
      cities = result.updatedCities
      localBestPathPerIteration = result.localBestPathPerIteration
      globalBestPathPerIteration = result.globalBestPathPerIteration
      timeSpent = result.timeSpent
      playback.start(ACOIterations.length, Number(userControls.speed), (index) => {
        frame = index
      })
      revealTravelMap()
    } catch (error) {
      if (token !== runToken) return
      runError = error instanceof Error ? error.message : "The run failed."
    } finally {
      if (token === runToken) isCalculating = false
    }
  }

  function resetVisualization(e: CustomEvent<{ nbrOfCities: string }>) {
    runToken += 1
    activeWorker?.terminate()
    isCalculating = false
    progress = 0
    runError = ""
    cities = citiesForCount(e.detail.nbrOfCities)
    clearRunVisuals()
  }

  function runACO(nextCities: City[], controls: AcoControls) {
    activeWorker?.terminate()
    const worker = new Worker()
    activeWorker = worker
    const startedAt = performance.now()
    worker.postMessage({ cities: nextCities, userControls: controls })
    return completeAcoRun(worker as unknown as AcoWorkerLike, (value) => {
      progress = value
    }).then((result) => ({
      ...result,
      timeSpent: performance.now() - startedAt,
    }))
  }

  onMount(() => {
    console.log("Nidhal Labidi | Computer Science Masters student")
  })

  onDestroy(() => {
    runToken += 1
    playback.stop()
    activeWorker?.terminate()
  })
</script>

<CalculationOverlay isVisible={isCalculating} {progress} />

<article class="aco-visualization">
  <header class="page-header">
    <div class="title-block">
      <p class="kicker">Traveling salesman problem</p>
      <h1>Ant Colony Optimization</h1>
      <p class="lead">
        Ants build a closed path through every city. Path length adds the edge
        distances, including the return edge. A shorter path receives more
        pheromone, so later ants are more likely to follow it.
      </p>
    </div>
    <p class="author">Nidhal Labidi</p>
  </header>

  <section class="controls-panel">
    <UserControls
      isRunning={isCalculating}
      on:startAnimation={updateUserControls}
      on:resetAnimation={resetVisualization}
      bind:speed
    />
    <div class="stat-slot">
      <ExecutionTime {timeSpent} />
    </div>
  </section>

  {#if runError}
    <p class="run-error" role="alert">{runError}</p>
  {/if}

  <main>
    <section class="panel heat-map-container">
      <h2>Edge ant flow</h2>
      <p class="panel-note">
        Each cell is the fraction of the colony that crossed that edge in the
        current iteration.
      </p>
      <div class="panel-body">
        <PheromoneHeatMap
          {cities}
          {ACOIterations}
          colonySize={Number(userControls.colonySize)}
          {frame}
        />
      </div>
    </section>
    <section class="panel cities-container" bind:this={travelMap}>
      <h2>Cities</h2>
      <p class="panel-note">
        Edge distance is the straight-line length in this square: the side is
        1, distances are rounded to 0.1, and the layouts are fixed. Thickness
        is how many ants used that edge this iteration. The highlight is the
        global best path.
      </p>
      <div class="panel-body">
        <Canvas
          {cities}
          ACOIter={ACOIterations}
          {globalBestPathPerIteration}
          {frame}
        />
      </div>
    </section>
  </main>

  <footer>
    <section class="panel chart-container">
      <h2>Global best path</h2>
      <p class="panel-note">
        Path length of the global best path after each iteration, in the same
        units as the square.
      </p>
      <div class="panel-body chart-body">
        <GlobalBestPath
          {globalBestPathPerIteration}
          {cities}
          sound={userControls.sound}
          {frame}
        />
      </div>
    </section>
    <section class="panel chart-container">
      <h2>Local best path</h2>
      <p class="panel-note">
        Path length of the shortest path in that iteration. It can rise when a
        later iteration is worse.
      </p>
      <div class="panel-body chart-body">
        <LocalBestPath
          {cities}
          {localBestPathPerIteration}
          {frame}
        />
      </div>
    </section>
  </footer>
</article>

<style>
  .aco-visualization {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    min-height: 100vh;
    padding: 1rem 1.25rem 1.25rem;
    background: var(--bg);
    color: var(--text);
    overflow-x: clip;
  }

  .page-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;
  }

  .kicker {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--accent);
  }

  h1 {
    font-size: 1.5rem;
    font-weight: 650;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }

  .lead {
    max-width: 42rem;
    margin-top: 0.35rem;
    font-size: 0.95rem;
    line-height: 1.4;
    color: var(--text);
  }

  .author {
    font-size: 0.9rem;
    color: var(--muted);
    white-space: nowrap;
  }

  .run-error {
    margin: 0;
    color: #9f1239;
    font-size: 0.95rem;
    font-weight: 600;
  }

  .controls-panel {
    display: flex;
    align-items: stretch;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
  }

  .controls-panel :global(form) {
    flex: 1;
    min-width: 0;
  }

  .stat-slot {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    border-left: 1px solid var(--border);
  }

  main {
    flex: 1 1 auto;
    display: flex;
    gap: 0.75rem;
    min-height: 40vh;
  }

  .panel {
    display: flex;
    flex-direction: column;
    min-width: 0;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
  }

  h2 {
    padding: 0.7rem 0.9rem 0;
    font-size: 0.75rem;
    font-weight: 650;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .panel-note {
    margin: 0;
    padding: 0.25rem 0.9rem 0;
    font-size: 0.8rem;
    font-weight: 500;
    line-height: 1.35;
    letter-spacing: 0;
    text-transform: none;
    color: var(--muted);
  }

  .panel-body {
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  .cities-container {
    flex: 5;
    min-width: 300px;
  }

  .heat-map-container {
    flex: 5;
    min-width: 200px;
  }

  footer {
    flex: 0 0 auto;
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .chart-container {
    flex: 1 1 100%;
    min-height: 220px;
  }

  .chart-body {
    flex: none;
    height: 200px;
  }

  @media (min-width: 1025px) {
    .aco-visualization {
      height: 100vh;
      overflow: hidden;
    }

    main {
      flex: 1 1 0;
      min-height: 0;
    }

    .cities-container,
    .heat-map-container {
      min-height: 0;
    }

    .chart-container {
      flex: 1 1 calc(50% - 0.375rem);
      min-height: 0;
    }

    .chart-body {
      height: 112px;
    }
  }

  @media (max-width: 1024px) {
    main {
      flex-direction: column;
    }

    .cities-container,
    .heat-map-container {
      flex: 1;
    }

    .heat-map-container {
      min-height: 300px;
    }

    .cities-container {
      min-height: 420px;
    }
  }

  @media (max-width: 768px) {
    .aco-visualization {
      min-height: auto;
      height: auto;
      overflow-x: clip;
      padding: 0.75rem;
    }

    .page-header {
      align-items: flex-start;
      flex-direction: column;
      gap: 0.25rem;
    }

    .controls-panel {
      flex-direction: column;
    }

    .stat-slot {
      border-left: none;
      border-top: 1px solid var(--border);
    }

    main {
      flex-direction: column;
    }

    .cities-container,
    .heat-map-container {
      min-width: 0;
      min-height: 50vh;
    }

    .cities-container {
      min-height: 70dvh;
    }
  }
</style>
