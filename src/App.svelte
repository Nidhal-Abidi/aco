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
    Worker_ACOIterations: City[][]
    Worker_antsChosenPaths: string[][][]
    Worker_updatedCities: City[]
    Worker_localBestPathPerIteration: string[][]
    Worker_globalBestPathPerIteration: string[][]
  }> {
    return new Promise((resolve) => {
      const worker = new Worker()

      worker.postMessage({ cities, userControls })

      worker.onmessage = (event) => {
        if (event.data.type === "progress") {
          progress = event.data.value
        } else if (event.data.type === "result") {
          resolve({
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

<header>
  <UserControls
    on:startAnimation={async (e) => await updateUserControls(e)}
    on:resetAnimation={resetVisualization}
  />
</header>

<main>
  <div class="cities-container">
    <Canvas
      {cities}
      ACOIter={ACOIterations}
      {globalBestPathPerIteration}
      speed={userControls.speed}
    />
  </div>
  <div class="heat-map-container">
    <PheromoneHeatMap
      {cities}
      speed={userControls.speed}
      {ACOIterations}
      colonySize={userControls.colonySize}
    />
  </div>
</main>

<footer>
  <div class="chart-container">
    <GlobalBestPath
      {globalBestPathPerIteration}
      {cities}
      speed={userControls.speed}
      sound={userControls.sound}
    />
  </div>
  <div class="chart-container">
    <LocalBestPath
      {cities}
      {localBestPathPerIteration}
      speed={userControls.speed}
    />
  </div>
</footer>

<style>
  header,
  main,
  footer {
    background-color: #fff8e7;
  }
  main {
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;
  }
  .cities-container {
    flex: 0 1 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 300px;
  }
  .heat-map-container {
    flex: 0 1 40%; /* 40% width on larger screens */
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 200px;
    min-height: 300px;
    height: calc(100vh - 200px);
  }
  footer {
    display: flex;
    flex-direction: column;
  }
  .chart-container {
    width: 100%; /* Each chart takes 100% width */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 768px) {
    main {
      flex-direction: column;
    }

    .cities-container,
    .heat-map-container {
      flex: 1 1 100%; /* Take full width on small screens */
    }

    .heat-map-container {
      min-height: 300px; /* Ensure enough height */
      height: calc(50vh - 100px); /* Adjust height on smaller screens */
    }
  }
</style>
