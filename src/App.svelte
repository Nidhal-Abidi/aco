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
  } from "./lib/helpers/citiesArrays"
  import { deepCopyOfCitiesArray } from "./lib/helpers/citiesDeepCopy"
  import PheromoneHeatMap from "./lib/components/HeatMap/PheromoneHeatMap.svelte"
  import CalculationOverlay from "./lib/components/CalculationOverlay/CalculationOverlay.svelte"
  import Worker from "./aco-worker?worker"
  import { onMount } from "svelte"
  import ExecutionTime from "./lib/components/ExecutionTime.svelte";

  let userControls = {
    nbrOfCities: "10",
    acoMode: "as",
    colonySize: 30,
    nbrOfIterations: 200,
    alpha: 3,
    beta: 1,
    rho: 0.1,
    initialPheromone: 1,
    sound: "on",
    speed: "150",
    elitistWeight: 2,
  }
  let isCalculating = false
  let progress = 0

  let ACOIterations: City[][] = []
  let antsChosenPaths: string[][][] = []
  let globalBestPathPerIteration: string[][] = []
  let localBestPathPerIteration: string[][] = []
  let timeSpent = 0
  let cities: City[] = deepCopyOfCitiesArray(cities10)

  async function updateUserControls(e: CustomEvent) {
    isCalculating = true
    progress = 0
    // Get the params chosen by the user for this algo run.
    userControls = JSON.parse(JSON.stringify(e.detail))

    switch (userControls.nbrOfCities) {
      case "5":
        cities = deepCopyOfCitiesArray(cities5)
        break
      case "7":
        cities = deepCopyOfCitiesArray(cities7)
        break
      case "10":
        cities = deepCopyOfCitiesArray(cities10)
        break
      case "15":
        cities = deepCopyOfCitiesArray(cities15)
        break
    }

    resetVisualization(e)
    // Start the web worker containing the ACO algo
    let {
      Worker_timeSpent,
      Worker_ACOIterations,
      Worker_antsChosenPaths,
      Worker_updatedCities,
      Worker_localBestPathPerIteration,
      Worker_globalBestPathPerIteration,
    } = await runACO(cities, userControls)

    ACOIterations = Worker_ACOIterations
    antsChosenPaths = Worker_antsChosenPaths
    cities = Worker_updatedCities
    localBestPathPerIteration = Worker_localBestPathPerIteration
    globalBestPathPerIteration = Worker_globalBestPathPerIteration
    timeSpent = Worker_timeSpent
    isCalculating = false
  }

  function resetVisualization(e: CustomEvent) {
    globalBestPathPerIteration = []
    localBestPathPerIteration = []
    ACOIterations = []
  }

  function runACO(
    cities: City[],
    userControls: {
      acoMode: string
      elitistWeight: number
      colonySize: number
      alpha: number
      beta: number
      rho: number
      nbrOfIterations: number
    }
  ): Promise<{
    Worker_timeSpent:number
    Worker_ACOIterations: City[][]
    Worker_antsChosenPaths: string[][][]
    Worker_updatedCities: City[]
    Worker_localBestPathPerIteration: string[][]
    Worker_globalBestPathPerIteration: string[][]
  }> {
    return new Promise((resolve) => {
      const worker = new Worker()
      const startTime = performance.now()

      worker.postMessage({ cities, userControls })

      worker.onmessage = (event) => {
        if (event.data.type === "progress") {
          progress = event.data.value
        } else if (event.data.type === "result") {
          const endTime = performance.now()
          const timeSpent = endTime - startTime
          resolve({
            Worker_timeSpent: timeSpent,
            Worker_ACOIterations: event.data.ACOIterations,
            Worker_antsChosenPaths: event.data.antsChosenPaths,
            Worker_updatedCities: event.data.updatedCities,
            Worker_localBestPathPerIteration:
              event.data.localBestPathPerIteration,
            Worker_globalBestPathPerIteration:
              event.data.globalBestPathPerIteration,
          })
        }
      }
    })
  }
  onMount(() => {
    console.log("Nidhal Labidi | Computer Science Masters student")
  })
</script>

<CalculationOverlay isVisible={isCalculating} {progress} />

<article class="aco-visualization">
  <header class="page-header">
    <div class="title-block">
      <p class="kicker">Traveling salesman problem</p>
      <h1>Ant Colony Optimization</h1>
    </div>
    <p class="author">Nidhal Labidi</p>
  </header>

  <section class="controls-panel">
    <UserControls
      on:startAnimation={async (e) => await updateUserControls(e)}
      on:resetAnimation={resetVisualization}
    />
    <div class="stat-slot">
      <ExecutionTime {timeSpent} />
    </div>
  </section>

  <main>
    <section class="panel cities-container">
      <h2>Travel map</h2>
      <div class="panel-body">
        <Canvas
          {cities}
          ACOIter={ACOIterations}
          {globalBestPathPerIteration}
          speed={userControls.speed}
        />
      </div>
    </section>
    <section class="panel heat-map-container">
      <h2>Pheromone heat map</h2>
      <div class="panel-body">
        <PheromoneHeatMap
          {cities}
          speed={userControls.speed}
          {ACOIterations}
          colonySize={userControls.colonySize}
        />
      </div>
    </section>
  </main>

  <footer>
    <section class="panel chart-container">
      <h2>Global best path</h2>
      <div class="panel-body chart-body">
        <GlobalBestPath
          {globalBestPathPerIteration}
          {cities}
          speed={userControls.speed}
          sound={userControls.sound}
        />
      </div>
    </section>
    <section class="panel chart-container">
      <h2>Local best path</h2>
      <div class="panel-body chart-body">
        <LocalBestPath
          {cities}
          {localBestPathPerIteration}
          speed={userControls.speed}
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

  .author {
    font-size: 0.9rem;
    color: var(--muted);
    white-space: nowrap;
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

  .panel-body {
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  .cities-container {
    flex: 6;
    min-width: 300px;
  }

  .heat-map-container {
    flex: 4;
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
      height: 150px;
    }
  }

  @media (max-width: 1024px) {
    main {
      flex-direction: column;
    }

    .cities-container,
    .heat-map-container {
      flex: 1;
      min-height: 300px;
    }
  }

  @media (max-width: 768px) {
    .aco-visualization {
      min-height: auto;
      height: auto;
      overflow: visible;
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
  }
</style>
