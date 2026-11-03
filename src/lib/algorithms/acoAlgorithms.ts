import { initializePheromone } from "../helpers/tspInitialPheromone"

export type City = {
  x: number
  y: number
  name: string
  isVisited: boolean
  distanceTo: Record<string, number>
  pheromoneTo: Record<string, number>
  lineWidthTo: Record<string, number>
  edgeAntFlow?: Record<string, number>
}

export type AcoResult = {
  iterations: City[][]
  localBestPathPerIteration: string[][]
  globalBestPathPerIteration: string[][]
}

export function startACOForTSP(
  cities: City[],
  acoMode: string,
  elitistWeight: number,
  colonySize: number,
  alpha: number,
  beta: number,
  rho: number,
  iterations: number,
  progressCallBack: (progress: number) => void
): AcoResult {
  let ACOIterations: City[][] = []
  const localBestPathPerIteration: string[][] = []
  const globalBestPathPerIteration: string[][] = []

  let updatedCities = citiesDeepCopy(cities)

  let tauMax = 0
  let tauMin = 0

  if (acoMode === "max-min-as") {
    const [, nearestNeighborPathLength] = getNearestNeighborPathWithLength(cities)

    tauMax = getTauMax(rho, nearestNeighborPathLength)
    tauMin = getTauMin(tauMax, cities.length)
    updatedCities = initializePheromone(updatedCities, tauMax)
  }

  const allEdgesLengths = getLengthOfAllEdges(cities)
  let globalBestPath: string[] = []
  let globalBestPathLength = Number.POSITIVE_INFINITY
  const progressStride = Math.max(1, Math.floor(iterations / 40))
  for (let iter = 0; iter < iterations; iter++) {
    const currentIterationAntPaths: string[][] = []
    for (let i = 0; i < colonySize; i++) {
      currentIterationAntPaths.push(
        getVisitedCitiesInOrder(updatedCities, alpha, beta)
      )
    }
    const [currentIterBestPath, currentIterBestPathLength] =
      getCurrentIterBestPath(currentIterationAntPaths, allEdgesLengths)
    if (currentIterBestPathLength < globalBestPathLength) {
      globalBestPath = [...currentIterBestPath]
      globalBestPathLength = currentIterBestPathLength
    }
    localBestPathPerIteration.push([...currentIterBestPath])
    globalBestPathPerIteration.push([...globalBestPath])

    switch (acoMode) {
      case "as":
        updatedCities = updateEdgeProperties(
          citiesDeepCopy(updatedCities),
          currentIterationAntPaths,
          rho,
          colonySize
        )
        break
      case "elitist":
        updatedCities = elitistPheromoneUpdate(
          citiesDeepCopy(updatedCities),
          globalBestPath,
          globalBestPathLength,
          elitistWeight
        )
        updatedCities = updateEdgeProperties(
          updatedCities,
          currentIterationAntPaths,
          rho,
          colonySize
        )
        break

      case "max-min-as":
        updatedCities = maxMinEdgePropertiesUpdate(
          citiesDeepCopy(updatedCities),
          currentIterBestPath,
          currentIterBestPathLength,
          currentIterationAntPaths,
          colonySize,
          rho,
          tauMin,
          tauMax
        )
        tauMax = getTauMax(rho, currentIterBestPathLength)
        tauMin = getTauMin(tauMax, cities.length)
        break
    }

    ACOIterations.push(citiesDeepCopy(updatedCities))
    if ((iter + 1) % progressStride === 0 || iter === iterations - 1) {
      progressCallBack((100 * (iter + 1)) / iterations)
    }
  }
  return {
    iterations: ACOIterations,
    localBestPathPerIteration,
    globalBestPathPerIteration,
  }
}

function getTauMax(rho: number, bestPathlength: number) {
  return 1 / (rho * bestPathlength)
}

function getTauMin(tauMax: number, numberOfCities: number) {
  return (
    (tauMax * (1 - Math.pow(0.05, 1 / numberOfCities))) /
    ((numberOfCities / 2 - 1) * Math.pow(0.05, 1 / numberOfCities))
  )
}

function getNearestNeighborPathWithLength(cities: City[]): [string[], number] {
  const visited = new Set<string>()
  const startCity = selectRandomCity(cities)
  const bestPath: string[] = [startCity.name]
  let bestPathLength = 0
  let prevCity = startCity
  visited.add(prevCity.name)

  while (visited.size < cities.length) {
    const nextCity = getClosestNeighbor(cities, prevCity, visited)
    if (nextCity == undefined)
      throw new Error(`Closest Neighbor of ${prevCity.name} doesn't Exist!!`)
    bestPath.push(nextCity.name)
    bestPathLength += prevCity.distanceTo[nextCity.name]
    prevCity = nextCity
    visited.add(prevCity.name)
  }
  // Add the distance between the last visited city and the first one
  const lastVisitedCity = getCityByName(cities, bestPath[bestPath.length - 1])
  if (lastVisitedCity == undefined)
    throw new Error(`Last visited city doesn't Exist!!`)
  bestPathLength += lastVisitedCity.distanceTo[bestPath[0]]
  return [bestPath, bestPathLength]
}

function getClosestNeighbor(
  cities: City[],
  currentCity: City,
  visited: Set<string>
) {
  const unvisitedNeighbors = unvisitedNeighborNames(currentCity, visited)
  let closestNeighborDistance = 9999999
  let closestNeighbor = ""

  for (let neighbor of unvisitedNeighbors) {
    if (currentCity.distanceTo[neighbor] < closestNeighborDistance) {
      closestNeighbor = neighbor
      closestNeighborDistance = currentCity.distanceTo[neighbor]
    }
  }
  return getCityByName(cities, closestNeighbor)
}

function getVisitedCitiesInOrder(cities: City[], alpha: number, beta: number) {
  const visited = new Set<string>()
  const visitedCities: string[] = []
  let currentCity: City = selectRandomCity(cities)

  visited.add(currentCity.name)
  visitedCities.push(currentCity.name)

  while (visitedCities.length < cities.length) {
    const nextCity = getNextCityToVisit(cities, currentCity, alpha, beta, visited)

    if (nextCity === null) break
    if (nextCity === undefined) {
      throw new Error(
        "Error: Something wrong happened when getting the nextCity!"
      )
    }
    visited.add(nextCity.name)
    visitedCities.push(nextCity.name)
    currentCity = nextCity
  }
  return visitedCities
}

function selectRandomCity(cities: City[]) {
  return cities[getRandomIntInclusive(0, cities.length - 1)]
}

// Best path for now is the one with shortest distance.
function getCurrentIterBestPath(
  currentIterationAntPaths: string[][],
  allEdgesLengths: Record<string, number>
): [string[], number] {
  let currenIterBestPath: string[] = []
  let currenIterBestPathLength = 999999
  for (const antPath of currentIterationAntPaths) {
    const antPathLength = getAntPathLength(antPath, allEdgesLengths)
    if (antPathLength <= currenIterBestPathLength) {
      currenIterBestPath = [...antPath]
      currenIterBestPathLength = antPathLength
    }
  }
  return [currenIterBestPath, currenIterBestPathLength]
}

function unvisitedNeighborNames(city: City, visited: Set<string>) {
  const neighbors: string[] = []
  for (const neighbor in city.distanceTo) {
    if (!visited.has(neighbor)) neighbors.push(neighbor)
  }
  return neighbors
}

/**
  Function returns :
     + "a City": if it's unvisited & was selected by our process.
     + "null": If all the cities were visited
     + "undefined": in every other case (Should be error cases)
*/
function getNextCityToVisit(
  cities: City[],
  currentCity: City,
  alpha: number,
  beta: number,
  visited: Set<string>
) {
  const unvisitedNeighborsList = unvisitedNeighborNames(currentCity, visited)
  if (unvisitedNeighborsList.length == 0) return null
  if (unvisitedNeighborsList.length == 1)
    return getCityByName(cities, unvisitedNeighborsList[0])

  let probabilityOfMovingtoNeighbors: number[] = []
  // sumOfDesires is the same for all the neighbors of a specific city. It's in the denominator of all of them
  const sumOfDesires = sumOfDesiresOfMovingToAllAllowedCities(
    currentCity,
    unvisitedNeighborsList,
    alpha,
    beta
  )
  for (const neighbor of unvisitedNeighborsList) {
    let probability = getProbabilityOfMovingToCity_j(
      currentCity,
      unvisitedNeighborsList,
      neighbor,
      sumOfDesires,
      alpha,
      beta
    )

    probabilityOfMovingtoNeighbors.push(probability)
  }
  let cumulativeProbability = 0
  // Will determine the next city to go to. We rely on chance BUT the city with a high prability would be more likely to be chosen.
  let randomNumber = Math.random()
  for (let i = 0; i < probabilityOfMovingtoNeighbors.length; i++) {
    if (isNaN(probabilityOfMovingtoNeighbors[i])) {
      throw new Error(
        "Error while calculating the probabilities of moving to the next city!"
      )
    }
    cumulativeProbability += probabilityOfMovingtoNeighbors[i]
    if (randomNumber < cumulativeProbability) {
      return getCityByName(cities, unvisitedNeighborsList[i])
    }
  }
  throw new Error(
    `We went through all the cities but randomNumber=${randomNumber} is bigger than cumulative prob=${cumulativeProbability}, probabilityOfMovingtoNeighbors=${probabilityOfMovingtoNeighbors}`
  )
}

export function getAllUnvisitedNeighborsOfCity_i(cities: City[], city: City) {
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

function getCityByName(cities: City[], cityName: string) {
  return cities.find((city) => city.name === cityName)
}

export function getProbabilityOfMovingToCity_j(
  currentCity: City,
  unvisitedNeighbors: string[],
  potentialNextCityName: string,
  sumOfDesires: number,
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
    (1 / currentCity.distanceTo[potentialNextCityName]) ** beta

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
      (1 / currentCity.distanceTo[neighbor]) ** beta
  }
  return sum
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

export function citiesDeepCopy(cities: City[]): City[] {
  return cities.map((city) => ({
    x: city.x,
    y: city.y,
    name: city.name,
    isVisited: city.isVisited,
    distanceTo: { ...city.distanceTo },
    pheromoneTo: { ...city.pheromoneTo },
    lineWidthTo: { ...city.lineWidthTo },
    edgeAntFlow: { ...(city.edgeAntFlow ?? {}) },
  }))
}

function getNewLineWidth(
  colonySize: number,
  nbrOfAntsPerEdge: Record<string, number>,
  linkingEdge: string,
  minLineWidth = 0.01,
  maxLineWidth = 4
) {
  const scalingFactor = (maxLineWidth - minLineWidth) / colonySize
  // Initially we assume that there's NOT A SINGLE ANT that have crossed this edge
  let newLineWidth = 0
  if (linkingEdge in nbrOfAntsPerEdge) {
    // There's at least 1 ant that crossed this edge
    newLineWidth = scalingFactor * nbrOfAntsPerEdge[linkingEdge]
  }

  if (newLineWidth < 0.01) return 0.01
  else if (newLineWidth > 4) return 4
  else return roundUpTo3Decimal(newLineWidth)
}

export function getLengthOfAllEdges(cities: City[]) {
  const allEdgesLengths: Record<string, number> = {}
  for (let city of cities) {
    for (let neighborName in city.distanceTo) {
      allEdgesLengths[city.name + neighborName] = city.distanceTo[neighborName]
    }
  }
  return allEdgesLengths
}

export function getAntPathLength(
  antPathArr: string[],
  allEdgesLengths: Record<string, number>
) {
  let pathLength = 0
  for (let i = 0; i < antPathArr.length - 1; i++) {
    let currentEdge = antPathArr[i] + antPathArr[i + 1]
    if (currentEdge in allEdgesLengths) {
      pathLength += allEdgesLengths[currentEdge]
    } else {
      console.error(
        `Edge-${currentEdge} doesn't exist in the object allEdgesLengths!`
      )
    }
  }
  // Add the edge length from last visited city to the first visited city (Since it was marked as visited in the beginning & won't be added 2 times to this array)
  return roundUpTo3Decimal(
    pathLength +
      allEdgesLengths[antPathArr[0] + antPathArr[antPathArr.length - 1]]
  )
}

function getAntsContributionToEdges(
  cities: City[],
  currentIterationAntPaths: string[][]
) {
  const allEdgesLengths = getLengthOfAllEdges(cities)
  const antsContributionToEdges: Record<string, number> = {}
  const addDeposit = (edge: string, reverseEdge: string, amount: number) => {
    antsContributionToEdges[edge] =
      (antsContributionToEdges[edge] ?? 0) + amount
    antsContributionToEdges[reverseEdge] =
      (antsContributionToEdges[reverseEdge] ?? 0) + amount
  }
  for (const antPath of currentIterationAntPaths) {
    const currentAntContrib = getCurrentAntContribution(
      antPath,
      allEdgesLengths
    )

    for (let i = 0; i < antPath.length - 1; i++) {
      addDeposit(
        antPath[i] + antPath[i + 1],
        antPath[i + 1] + antPath[i],
        currentAntContrib
      )
    }
    if (antPath.length > 1) {
      const last = antPath[antPath.length - 1]
      const first = antPath[0]
      addDeposit(last + first, first + last, currentAntContrib)
    }
  }
  return antsContributionToEdges
}

function getCurrentAntContribution(
  antPath: string[],
  allEdgesLengths: Record<string, number>
): number {
  const antPathLength = getAntPathLength(antPath, allEdgesLengths)
  return 1 / antPathLength
}

export function updateEdgeProperties(
  cities: City[],
  currentIterationAntPaths: string[][],
  rho: number,
  colonySize: number
) {
  const antsContributionToEdges = getAntsContributionToEdges(
    cities,
    currentIterationAntPaths
  )
  const nbrOfAntsPerEdge = getNbrOfAntsPerEdge(currentIterationAntPaths)
  for (const city of cities) {
    for (let neighborName in city.pheromoneTo) {
      const linkingEdge = city.name + neighborName
      const oldPheromoneAmount = city.pheromoneTo[neighborName]
      const newPheromoneAmount = getNewPheromoneAmount(
        oldPheromoneAmount,
        antsContributionToEdges,
        linkingEdge,
        rho
      )

      city.pheromoneTo[neighborName] = newPheromoneAmount
      city.lineWidthTo[neighborName] = getNewLineWidth(
        colonySize,
        nbrOfAntsPerEdge,
        linkingEdge
      )
    }
    // Add how many ants have crossed each edge starting from the current city.
    city.edgeAntFlow = retrieveAntTraffic(city, nbrOfAntsPerEdge)
  }
  cities.forEach((city) => (city.isVisited = false))
  return cities
}

export function elitistPheromoneUpdate(
  cities: City[],
  globalBestPath: string[],
  globalBestPathLength: number,
  elitistWeight: number
) {
  const setOfglobalBestPathEdges = getAntPathEdgesSet(globalBestPath)
  const elitistPheromoneContrib = elitistWeight * (1 / globalBestPathLength)
  for (const city of cities) {
    for (const neighbor in city.pheromoneTo) {
      const edge = city.name + neighbor
      if (setOfglobalBestPathEdges.has(edge)) {
        city.pheromoneTo[neighbor] += elitistPheromoneContrib
      }
    }
  }
  return cities
}

function getAntPathEdgesSet(antPath: string[]) {
  const setOfEdges: Set<string> = new Set()
  for (let i = 0; i < antPath.length - 1; i++) {
    setOfEdges.add(antPath[i] + antPath[i + 1])
  }
  setOfEdges.add(antPath[antPath.length - 1] + antPath[0])
  return setOfEdges
}

function getNbrOfAntsPerEdge(currentIterationAntPaths: string[][]) {
  const nbrOfAntsPerEdge: Record<string, number> = {}

  for (const antPath of currentIterationAntPaths) {
    for (let i = 0; i < antPath.length - 1; i++) {
      const edge = antPath[i] + antPath[i + 1]
      const reverseEdge = antPath[i + 1] + antPath[i]
      if (edge in nbrOfAntsPerEdge && reverseEdge in nbrOfAntsPerEdge) {
        nbrOfAntsPerEdge[edge] += 1
        nbrOfAntsPerEdge[reverseEdge] += 1
      } else {
        nbrOfAntsPerEdge[edge] = 1
        nbrOfAntsPerEdge[reverseEdge] = 1
      }
    }
    const finalEdge = antPath[antPath.length - 1] + antPath[0]
    const reverseFinalEdge = antPath[0] + antPath[antPath.length - 1]
    if (finalEdge in nbrOfAntsPerEdge && reverseFinalEdge in nbrOfAntsPerEdge) {
      nbrOfAntsPerEdge[finalEdge] += 1
      nbrOfAntsPerEdge[reverseFinalEdge] += 1
    } else {
      nbrOfAntsPerEdge[finalEdge] = 1
      nbrOfAntsPerEdge[reverseFinalEdge] = 1
    }
  }
  return nbrOfAntsPerEdge
}

function retrieveAntTraffic(
  currentCity: City,
  nbrOfAntsPerEdge: Record<string, number>
) {
  const allNeighbors = getAllNeigborsOfCity_i(currentCity)
  let antTraffic: Record<string, number> = {}
  for (const neighborName of allNeighbors) {
    const edge = currentCity.name + neighborName
    const reverseEdge = neighborName + currentCity.name
    if (edge in nbrOfAntsPerEdge) {
      antTraffic[neighborName] = nbrOfAntsPerEdge[edge]
    } else if (reverseEdge in nbrOfAntsPerEdge) {
      antTraffic[neighborName] = nbrOfAntsPerEdge[reverseEdge]
    } else {
      antTraffic[neighborName] = 0
    }
  }
  return antTraffic
}

function getNewPheromoneAmount(
  oldPheromoneAmount: number,
  antsContributionToEdges: Record<string, number>,
  linkingEdge: string,
  rho: number
) {
  let antsContribution = 0
  if (linkingEdge in antsContributionToEdges) {
    antsContribution = antsContributionToEdges[linkingEdge]
  }
  return (1 - rho) * oldPheromoneAmount + antsContribution
}

export function maxMinEdgePropertiesUpdate(
  cities: City[],
  currentIterBestPath: string[],
  currentIterBestPathLength: number,
  currentIterationAntPaths: string[][],
  colonySize: number,
  rho: number,
  tauMin: number,
  tauMax: number
) {
  const setOfIterBestPathEdges = getAntPathEdgesSet(currentIterBestPath)
  const bestPathPheromoneDeposit = 1 / currentIterBestPathLength
  const nbrOfAntsPerEdge = getNbrOfAntsPerEdge(currentIterationAntPaths)
  for (const city of cities) {
    for (const neighbor in city.pheromoneTo) {
      const edge = city.name + neighbor
      city.pheromoneTo[neighbor] = getMaxMinNewPheromoneAmount(
        city.pheromoneTo[neighbor],
        bestPathPheromoneDeposit,
        tauMin,
        tauMax,
        rho,
        setOfIterBestPathEdges.has(edge)
      )
      city.lineWidthTo[neighbor] = getNewLineWidth(
        colonySize,
        nbrOfAntsPerEdge,
        edge
      )
    }
    city.edgeAntFlow = retrieveAntTraffic(city, nbrOfAntsPerEdge)
  }
  // Mark all cities as unvisited for the next iteration
  cities.forEach((city) => (city.isVisited = false))
  return cities
}

function getMaxMinNewPheromoneAmount(
  oldPheromoneAmount: number,
  bestPathPheromoneDeposit: number,
  tauMin: number,
  tauMax: number,
  rho: number,
  isPartOfBestPath: boolean
): number {
  // Returns the new pheromone amount bounded by tauMax and tauMin
  const newPheromoneAmount = isPartOfBestPath
    ? (1 - rho) * oldPheromoneAmount + bestPathPheromoneDeposit
    : (1 - rho) * oldPheromoneAmount
  if (newPheromoneAmount < tauMin) {
    return tauMin
  } else if (newPheromoneAmount > tauMax) {
    return tauMax
  }
  return newPheromoneAmount
}
