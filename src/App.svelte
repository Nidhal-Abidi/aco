<script lang="ts">
  import { AS, type City } from "./lib/algorithms/acoAlgorithms"
  import Canvas from "./lib/components/Canvas/Canvas.svelte"
  import {
    minMaxDistanceNormalization,
    decimalDistanceNormalization,
    ZScoreDistanceNormalization,
  } from "./lib/helpers/tspDistanceNormalization"
  import { initializePheromone } from "./lib/helpers/tspInitialPheromone"

  function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  const cities: City[] = [
    {
      x: 100,
      y: 100,
      name: "c_0",
      isVisited: false,
      distanceTo: {
        c_1: 153,
        c_2: 471.7,
        c_3: 650,
        c_4: 500.9,
      },
      pheromoneTo: {
        c_1: 0,
        c_2: 0,
        c_3: 0,
        c_4: 0,
      },
      lineWidthTo: {
        c_1: 0.3,
        c_2: 0.3,
        c_3: 0.3,
        c_4: 0.3,
      },
    },
    {
      x: 130,
      y: 250,
      name: "c_1",
      isVisited: false,
      distanceTo: {
        c_0: 153,
        c_2: 333,
        c_3: 545.6,
        c_4: 485.1,
      },
      pheromoneTo: {
        c_0: 0,
        c_2: 0,
        c_3: 0,
        c_4: 0,
      },
      lineWidthTo: {
        c_0: 0.3,
        c_2: 0.3,
        c_3: 0.3,
        c_4: 0.3,
      },
    },
    {
      x: 350,
      y: 500,
      name: "c_2",
      isVisited: false,
      distanceTo: {
        c_0: 471.7,
        c_1: 333,
        c_3: 270.2,
        c_4: 446.5,
      },
      pheromoneTo: {
        c_0: 0,
        c_1: 0,
        c_3: 0,
        c_4: 0,
      },
      lineWidthTo: {
        c_0: 0.3,
        c_1: 0.3,
        c_3: 0.3,
        c_4: 0.3,
      },
    },
    {
      x: 620,
      y: 490,
      name: "c_3",
      isVisited: false,
      distanceTo: {
        c_0: 650,
        c_1: 545.6,
        c_2: 270.2,
        c_4: 360.6,
      },
      pheromoneTo: {
        c_0: 0,
        c_1: 0,
        c_2: 0,
        c_4: 0,
      },
      lineWidthTo: {
        c_0: 0.3,
        c_1: 0.3,
        c_2: 0.3,
        c_4: 0.3,
      },
    },
    {
      x: 600,
      y: 130,
      name: "c_4",
      isVisited: false,
      distanceTo: {
        c_0: 500.9,
        c_1: 485.1,
        c_2: 446.5,
        c_3: 360.6,
      },
      pheromoneTo: {
        c_0: 0,
        c_1: 0,
        c_2: 0,
        c_3: 0,
      },
      lineWidthTo: {
        c_0: 0.3,
        c_1: 0.3,
        c_2: 0.3,
        c_3: 0.3,
      },
    },
  ]

  initializePheromone(cities, 5)
  //minMaxDistanceNormalization(cities)
  //decimalDistanceNormalization(cities)
  //ZScoreDistanceNormalization(cities)
  const alpha = 1 //getRandomArbitrary(0.001, 100)
  const beta = 3 //getRandomArbitrary(0.001, 100)
  const rou = 0.1
  const [ACOIterations, antsChosenPaths] = AS(cities, 30, alpha, beta, rou, 200)
  console.log("ACOIterations =", ACOIterations)
  console.log("antsChosenPaths =", antsChosenPaths)
</script>

<main>
  <Canvas {cities} ACOIter={ACOIterations} {antsChosenPaths} />
</main>

<style>
</style>
