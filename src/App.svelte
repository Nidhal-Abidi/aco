<script lang="ts">
  import { AS, type City } from "./lib/acoAlgorithms"
  function initializePheromone(cities: City[], initialVal: number) {
    cities.forEach((city) => {
      for (let neighbor in city.pheromoneTo) {
        city.pheromoneTo[neighbor] = initialVal
      }
    })
  }
  const cities: City[] = [
    {
      x: 100,
      y: 100,
      name: "c_0",
      isVisited: false,
      distanceTo: {
        c_1: 170,
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
      x: 180,
      y: 250,
      name: "c_1",
      isVisited: false,
      distanceTo: {
        c_0: 170,
        c_2: 302.3,
        c_3: 501.2,
        c_4: 436.8,
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
        c_1: 302.3,
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
        c_1: 501.2,
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
        c_1: 436.8,
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
  initializePheromone(cities, 1)
  const [ACOIterations, antsChosenPaths] = AS(cities)
  console.log("ACOIterations =", ACOIterations)
  console.log("antsChosenPaths =", antsChosenPaths)
</script>

<main>
  <h1>Hi ACO!</h1>
</main>

<style>
</style>
