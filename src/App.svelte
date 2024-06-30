<script lang="ts">
  import { AS, type City } from "./lib/algorithms/acoAlgorithms"
  import Canvas from "./lib/components/Canvas/Canvas.svelte"
  import {
    extractGlobalBestPathPerIteration,
    extractLocalBestPathPerIteration,
  } from "./lib/components/Canvas/helpers/bestAntPaths"
  import GlobalBestPath from "./lib/components/Chart/GlobalBestPath.svelte"
  import LocalBestPath from "./lib/components/Chart/LocalBestPath.svelte"
  import UserControls from "./lib/components/UserControls.svelte"
  import { initializePheromone } from "./lib/helpers/tspInitialPheromone"
  import {
    cities5,
    cities7,
    cities10,
    cities15,
  } from "./lib/helpers/citiesArrays"
  import { deepCopyOfCitiesArray } from "./lib/helpers/citiesDeepCopy"
  import PheromoneHeatMap from "./lib/components/HeatMap/PheromoneHeatMap.svelte"

  let userControls = {
    nbrOfCities: "10",
    acoMode: "aco",
    colonySize: 30,
    nbrOfIterations: 200,
    alpha: 3,
    beta: 1,
    rho: 0.1,
    initialPheromone: 1,
    sound: "on",
    speed: "150",
  }

  let ACOIterations: City[][] = []
  let antsChosenPaths: string[][][] = []
  let globalBestPathPerIteration: string[][] = []
  let localBestPathPerIteration: string[][] = []
  let cities: City[] = deepCopyOfCitiesArray(cities10)

  function updateUserControls(e: CustomEvent) {
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

    // Run the algo on the new params & pass the new values as props to the components
    initializePheromone(cities, userControls.initialPheromone)
    ;[ACOIterations, antsChosenPaths] = AS(
      cities,
      userControls.colonySize,
      userControls.alpha,
      userControls.beta,
      userControls.rho,
      userControls.nbrOfIterations
    )

    globalBestPathPerIteration = extractGlobalBestPathPerIteration(
      cities,
      antsChosenPaths
    )
    localBestPathPerIteration = extractLocalBestPathPerIteration(
      cities,
      antsChosenPaths
    )
  }

  function resetVisualization(e: CustomEvent) {
    globalBestPathPerIteration = []
    localBestPathPerIteration = []
    ACOIterations = []
  }
</script>

<header>
  <UserControls
    on:startAnimation={updateUserControls}
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
  main {
    display: flex;
    align-items: center;
  }
  .cities-container {
    align-self: flex-start;
  }
  footer {
    height: 20%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .chart-container {
    flex-grow: 2;
  }
  .heat-map-container {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
