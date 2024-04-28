export type City = {
  x: number
  y: number
  name: string
  isVisited: boolean
  distanceTo: Record<string, number>
  pheromoneTo: Record<string, number>
  lineWidthTo: Record<string, number>
}

// Returns [ACOIterations, antsChosenPaths]
export function AS(
  cities: City[],
  colonySize = 30,
  alpha = 1,
  beta = 3,
  rou = 0.1,
  iterations = 100,
  speed = 300
): [City[][], string[][][]] {
  console.log("AS")
  // Array will be used later for the animation of: Graph & Matrix
  let ACOIterations: City[][] = []

  // Array will be used later for the animation of: List of cities visited by each ant in order.
  let antsChosenPaths: string[][][] = []

  let updatedCities = citiesDeepCopy(cities)

  for (let iter = 0; iter < iterations; iter++) {
    let currentIterationAntPaths: string[][] = []

    for (let i = 0; i < colonySize; i++) {
      // Deep Copy of cities since I'm modifying the array directly. This modification will affect the other ants during the same iteration.

      let orderOfVisitedCities = getVisitedCitiesInOrder(
        citiesDeepCopy(updatedCities),
        alpha,
        beta
      )
      currentIterationAntPaths.push(orderOfVisitedCities)
    }
    antsChosenPaths.push(currentIterationAntPaths)
    // Update the values of pheromone & lineWidths. Also store the previous values for the animation.
    updatedCities = updatePheromoneAmount(
      citiesDeepCopy(cities),
      currentIterationAntPaths,
      rou
    )
    ACOIterations.push(updatedCities)
  }
  return [ACOIterations, antsChosenPaths]
}

function getVisitedCitiesInOrder(cities: City[], alpha: number, beta: number) {
  // 'visitedCities' will contain the reslt of this fct. Final rslt = ['c_1', 'c_3', 'c_7' ...]
  let visitedCities: string[] = []

  // Select a random city to start with & mark it as visited
  let currentCity: City = selectRandomCity(cities)

  markCityAsVisited(cities, currentCity.name)
  visitedCities.push(currentCity.name)

  while (visitedCities.length < cities.length) {
    let nextCity = getNextCityToVisit(cities, currentCity, alpha, beta)

    if (nextCity === null) break
    // This shouldn't happen since we're tracking the nbr of visited cities here. But I added it so that TS won't complain.
    if (nextCity === undefined) {
      console.error(
        "Error: Something wrong happened when getting the nextCity!"
      )
      break
    }
    markCityAsVisited(cities, nextCity.name)
    visitedCities.push(nextCity.name)
    currentCity = nextCity
  }
  return visitedCities
}

function selectRandomCity(cities: City[]) {
  return cities[getRandomIntInclusive(0, cities.length - 1)]
}
function markCityAsVisited(cities: City[], cityName: string) {
  // Modify the array in place
  for (let city of cities) {
    if (city.name === cityName) {
      city.isVisited = true
      break
    }
  }
}

/**
 * Function returns : A City, if it's Unvisited & was selected by our process.
 *                    null: If all the cities were visited
 *                    undefined: in every other case (Should be error cases)
 * */
function getNextCityToVisit(
  cities: City[],
  currentCity: City,
  alpha: number,
  beta: number
) {
  const unvisitedNeighborsList = getAllUnvisitedNeighborsOfCity_i(
    cities,
    currentCity
  )
  if (unvisitedNeighborsList.length == 0) return null
  if (unvisitedNeighborsList.length == 1)
    return getCityByName(cities, unvisitedNeighborsList[0])

  let probabilityOfMovingtoNeighbors: number[] = []
  for (const neighbor of unvisitedNeighborsList) {
    let probability = getProbabilityOfMovingToCity_j(
      currentCity,
      unvisitedNeighborsList,
      neighbor,
      alpha,
      beta
    )
    // console.log(`unvisitedNeighbors [of ${currentCity.name}] = `, unvisitedNeighborsList)
    probabilityOfMovingtoNeighbors.push(probability)
  }
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
      return getCityByName(cities, unvisitedNeighborsList[i])
    }
  }
  console.error(
    `We went through all the cities but randomNumber=${randomNumber} is bigger than cumulative prob=${cumulativeProbability}, probabilityOfMovingtoNeighbors=`,
    probabilityOfMovingtoNeighbors
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

function getNewLineWidth(
  oldLineWidth: number,
  oldPheromoneAmount: number,
  newPheromoneAmount: number
) {
  const percentageDiff = getPercentageDifference(
    oldPheromoneAmount,
    newPheromoneAmount
  )
  const newLineWidth = roundUpTo3Decimal(oldLineWidth * (1 + percentageDiff))
  /* console.log(
    `B-Pher=${oldPheromoneAmount}, A-Pher=${newPheromoneAmount}, %Diff=${percentageDiff}, B-Line=${oldLineWidth}, A-Line=${newLineWidth}`
  ) */
  if (newLineWidth < 0.1) {
    return 0.1
  } else if (newLineWidth > 5) {
    return 5
  }
  return newLineWidth
}

function getPercentageDifference(originalVal: number, newValue: number) {
  if (originalVal == 0 && newValue == 0) return 0
  return originalVal === 0 ? 1 : (newValue - originalVal) / originalVal
}

function getLengthOfAllEdges(cities: City[]) {
  const allEdgesLengths: Record<string, number> = {}
  for (let city of cities) {
    for (let neighborName in city.distanceTo) {
      allEdgesLengths[city.name + neighborName] = city.distanceTo[neighborName]
    }
  }
  return allEdgesLengths
}

function getAntPathLength(
  antPathArr: string[],
  allEdges: Record<string, number>
) {
  let pathLength = 0
  for (let i = 0; i < antPathArr.length - 1; i++) {
    let currentEdge = antPathArr[i] + antPathArr[i + 1]
    if (currentEdge in allEdges) {
      pathLength += allEdges[currentEdge]
    } else {
      console.error(`Edge-${currentEdge} doesn't exist in the object allEdges!`)
    }
  }
  return pathLength
}

function getAntsContributionToEdges(
  cities: City[],
  currentIterationAntPaths: string[][]
) {
  const allEdgesLengths = getLengthOfAllEdges(cities)
  const antsContributionToEdges: Record<string, number> = {}
  for (const antPath of currentIterationAntPaths) {
    const currentAntContrib = getCurrentAntContribution(
      antPath,
      allEdgesLengths
    )

    for (let i = 0; i < antPath.length - 1; i++) {
      const currentEdge = antPath[i] + antPath[i + 1]
      const reverseEdge = antPath[i + 1] + antPath[i]
      if (currentEdge in antsContributionToEdges) {
        antsContributionToEdges[currentEdge] += currentAntContrib
        antsContributionToEdges[reverseEdge] += currentAntContrib
      } else {
        antsContributionToEdges[currentEdge] = currentAntContrib
        antsContributionToEdges[reverseEdge] = currentAntContrib
      }
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

function updatePheromoneAmount(
  cities: City[],
  currentIterationAntPaths: string[][],
  rou: number
) {
  const allEdgesLengths = getLengthOfAllEdges(cities)
  const antsContributionToEdges = getAntsContributionToEdges(
    cities,
    currentIterationAntPaths
  )
  /*  console.log(
    `AntsContributionToEdges=${JSON.stringify(antsContributionToEdges)}`
  ) */
  for (const city of cities) {
    for (let neighborName in city.pheromoneTo) {
      const linkingEdge = city.name + neighborName
      const oldPheromoneAmount = city.pheromoneTo[neighborName]
      const oldLineWidth = city.lineWidthTo[neighborName]
      const newPheromoneAmount = getNewPheromoneAmount2(
        oldPheromoneAmount,
        antsContributionToEdges,
        linkingEdge,
        rou
      )
      const newLineWidth = getNewLineWidth(
        oldLineWidth,
        oldPheromoneAmount,
        newPheromoneAmount
      )
      city.pheromoneTo[neighborName] = newPheromoneAmount
      city.lineWidthTo[neighborName] = newLineWidth
    }
  }
  // Mark all cities as unvisited for the next iteration
  cities.forEach((city) => (city.isVisited = false))
  return cities
}

function getNewPheromoneAmount2(
  oldPheromoneAmount: number,
  antsContributionToEdges: Record<string, number>,
  linkingEdge: string,
  rou: number
) {
  let antsContribution = 0
  if (linkingEdge in antsContributionToEdges) {
    antsContribution = antsContributionToEdges[linkingEdge]
  }
  return (1 - rou) * oldPheromoneAmount + antsContribution
}
