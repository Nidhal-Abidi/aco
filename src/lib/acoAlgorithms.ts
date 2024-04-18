export type City = {
  x: number
  y: number
  name: string
  isVisited: boolean
  distanceTo: Record<string, number>
  pheromoneTo: Record<string, number>
  lineWidthTo: Record<string, number>
}

export function roundUpTo3Decimal(num: number) {
  // Convert the number to a string with one decimal place
  const roundedUpString = num.toFixed(3)

  // Parse the string back to a number, effectively truncating the decimal part
  // This will round up if the decimal part is >= 0.5
  const roundedUpNumber = parseFloat(roundedUpString)

  return roundedUpNumber
}

export function getRandomIntInclusive(min: number, max: number) {
  // The maximum is inclusive and the minimum is inclusive
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}

function selectRandomCity(cities: City[]) {
  return cities[getRandomIntInclusive(0, cities.length - 1)]
}

function markAllCitiesAsUnvisited(cities: City[]) {
  cities.forEach((city) => (city.isVisited = false))
}

function markCityAsVisited(cities: City[], cityName: string) {
  // Modify the array in place.
  cities.forEach((city) => {
    if (city.name === cityName) {
      city.isVisited = true
    }
  })
}

function citiesDeepCopy(cities: City[]): City[] {
  let res: City[] = []
  cities.forEach((city) => {
    let copiedCity: City = {
      x: city.x,
      y: city.y,
      name: city.name,
      isVisited: city.isVisited,
      distanceTo: JSON.parse(JSON.stringify(city.distanceTo)),
      pheromoneTo: JSON.parse(JSON.stringify(city.pheromoneTo)),
      lineWidthTo: JSON.parse(JSON.stringify(city.lineWidthTo)),
    }
    res.push(copiedCity)
  })
  return res
}

// TEST THIS LATER
function getVisitedCitiesInOrder(cities: City[], alpha: number, beta: number) {
  // 'visitedCities' will contain the reslt of this fct. Final rslt = ['c_1', 'c_3', 'c_7' ...]
  let visitedCities: string[] = []

  // Select a random city to start with & mark it as visited
  let currentCity = selectRandomCity(cities)

  markCityAsVisited(cities, currentCity.name)
  visitedCities.push(currentCity.name)

  while (visitedCities.length < cities.length) {
    let nextCity = getNextCityToVisit(cities, currentCity, alpha, beta)
    // This shouldn't happen since we're tracking the nbr of visited cities here. But I added it so that TS won't complain.
    if (nextCity == undefined) break
    markCityAsVisited(cities, nextCity.name)
    visitedCities.push(nextCity.name)
    currentCity = nextCity
  }
  return visitedCities
}

function getNextCityToVisit(
  cities: City[],
  currentCity: City,
  alpha: number,
  beta: number
): City | undefined {
  const neighborsList = getAllUnvisitedNeighborsOfCity_i(cities, currentCity)
  if (neighborsList.length == 0) return undefined
  if (neighborsList.length == 1) return getCityByName(cities, neighborsList[0])

  let probabilityOfMovingtoNeighbors: number[] = []
  neighborsList.forEach((neighbor) => {
    let probability = getProbabilityOfMovingToCity_j(
      currentCity,
      neighborsList,
      neighbor,
      alpha,
      beta
    )
    // console.log(`unvisitedNeighbors [of ${currentCity.name}] = `, neighborsList)
    probabilityOfMovingtoNeighbors.push(probability)
  })
  let cumulativeProbability = 0
  // Will determine the next city to go to. We rely on chance BUT the city with a high prability would be more likely to be chosen.
  let randomNumber = Math.random()
  for (let i = 0; i < probabilityOfMovingtoNeighbors.length; i++) {
    if (isNaN(probabilityOfMovingtoNeighbors[i])) {
      console.error(
        "Error while calculating the probabilities of moving to the next city!"
      )
      break
    }
    cumulativeProbability += probabilityOfMovingtoNeighbors[i]
    if (randomNumber < cumulativeProbability) {
      return getCityByName(cities, neighborsList[i])
    }
  }
  console.error(
    `We went through all the cities but randomNumber=${randomNumber} is bigger than cumulative prob=${cumulativeProbability}, probabilityOfMovingtoNeighbors=`,
    probabilityOfMovingtoNeighbors
  )
}

function getCityByName(cities: City[], cityName: string) {
  for (let i = 0; i < cities.length; i++) {
    if (cities[i].name == cityName) {
      return cities[i]
    }
  }
}

function getAllUnvisitedNeighborsOfCity_i(cities: City[], city: City) {
  let allNeighbors = getAllNeigborsOfCity_i(city)
  return allNeighbors.filter((neighbor) => {
    let potentialUnvisitedNeighbor = getCityByName(cities, neighbor)
    if (potentialUnvisitedNeighbor != undefined) {
      return potentialUnvisitedNeighbor.isVisited == false
    } else {
      console.error(`City ${neighbor} not Found in the array cities!`)
    }
  })
}

function getAllNeigborsOfCity_i(city: City) {
  let neighbors = []
  for (let neighbor in city.distanceTo) {
    neighbors.push(neighbor)
  }
  return neighbors
}

export function getProbabilityOfMovingToCity_j(
  currentCity: City,
  unvisitedNeighbors: string[],
  potentialNextCityName: string,
  alpha: number,
  beta: number
) {
  if (unvisitedNeighbors.length === 0) return 0
  if (unvisitedNeighbors.length === 1) return 1
  if (currentCity.pheromoneTo[potentialNextCityName] === 0) {
    currentCity.pheromoneTo[potentialNextCityName] += 0.000001
  }
  let desireOfMovingToCity_j =
    currentCity.pheromoneTo[potentialNextCityName] ** alpha *
    (1 / currentCity.distanceTo[potentialNextCityName] ** -beta)

  let sumOfDesires = sumOfDesiresOfMovingToAllAllowedCities(
    currentCity,
    unvisitedNeighbors,
    alpha,
    beta
  )
  return desireOfMovingToCity_j / sumOfDesires
}

export function sumOfDesiresOfMovingToAllAllowedCities(
  currentCity: City,
  unvisitedNeighbors: string[],
  alpha: number,
  beta: number
) {
  let sum = 0
  for (let neighbor of unvisitedNeighbors) {
    if (currentCity.pheromoneTo[neighbor] === 0) {
      currentCity.pheromoneTo[neighbor] += 0.000001
    }
    sum +=
      currentCity.pheromoneTo[neighbor] ** alpha *
      (1 / currentCity.distanceTo[neighbor] ** -beta)
  }
  return sum
}

function getAllEdges(cities: City[]) {
  let edges: Record<string, number> = {}
  cities.forEach((city) => {
    for (let neighborName in city.distanceTo) {
      edges[city.name + neighborName] = 0
    }
  })
  return edges
}

// Returns [ACOIterations, antsChosenPaths]
export function AS(
  cities: City[],
  colonySize = 10,
  alpha = 1,
  beta = 1,
  rou = 0.2,
  iterations = 50,
  speed = 300
): [City[][], string[][][]] {
  console.log("AS")
  // Array will be used later for the animation of: Graph & Matrix
  let ACOIterations: City[][] = []

  // Array will be used later for the animation of: List of cities visited by each ant in order.
  let antsChosenPaths: string[][][] = []

  for (let iter = 0; iter < iterations; iter++) {
    console.log("iter=", iter)
    //let allEdges: Record<string, number> = getAllEdges(cities)
    let currentIterationAntPaths: string[][] = []

    for (let i = 0; i < colonySize; i++) {
      // Deep Copy of cities since I'm modifying the array directly. This modification will affect the other ants during the same iteration.
      let copiedCities = citiesDeepCopy(cities)

      let orderOfVisitedCities = getVisitedCitiesInOrder(
        copiedCities,
        alpha,
        beta
      )
      currentIterationAntPaths.push(orderOfVisitedCities)
      //console.log(`Cities visited by ant_${i}: `, orderOfVisitedCities)
    }
    antsChosenPaths.push(currentIterationAntPaths)
  }
  return [ACOIterations, antsChosenPaths]
}

function logger(cities: City[]) {
  console.log(JSON.stringify(cities))
}
