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
  import { cities } from "./lib/helpers/citiesArrays"

  let userControls = {
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

  function updateUserControls(e: CustomEvent) {
    // Get the params chosen by the user for this algo run.
    userControls = JSON.parse(JSON.stringify(e.detail))

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
    justify-content: space-between;
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
</style>
