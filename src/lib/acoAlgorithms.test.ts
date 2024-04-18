import {
  type City,
  roundUpTo3Decimal,
  getRandomIntInclusive,
  getProbabilityOfMovingToCity_j,
  sumOfDesiresOfMovingToAllAllowedCities,
} from "./acoAlgorithms"
import { describe, expect, it } from "vitest"

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
      c_5: 454.9,
      c_6: 370,
      c_7: 281.6,
      c_8: 294.1,
      c_9: 256.1,
    },
    pheromoneTo: {
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
    },
    lineWidthTo: {
      c_1: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_8: 0.3,
      c_9: 0.3,
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
      c_5: 316.2,
      c_6: 271.7,
      c_7: 269.1,
      c_8: 130.4,
      c_9: 120.4,
    },
    pheromoneTo: {
      c_0: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_8: 0.3,
      c_9: 0.3,
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
      c_5: 198.5,
      c_6: 297.3,
      c_7: 431,
      c_8: 200,
      c_9: 245.2,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_8: 0.3,
      c_9: 0.3,
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
      c_5: 198,
      c_6: 319.1,
      c_7: 483.7,
      c_8: 443.8,
      c_9: 394.1,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_2: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_8: 0.3,
      c_9: 0.3,
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
      c_5: 250.6,
      c_6: 174.9,
      c_7: 228,
      c_8: 480.2,
      c_9: 327,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_8: 0.3,
      c_9: 0.3,
    },
  },
  {
    x: 480,
    y: 350,
    name: "c_5",
    isVisited: false,
    distanceTo: {
      c_0: 454.9,
      c_1: 316.2,
      c_2: 198.5,
      c_3: 198,
      c_4: 250.6,
      c_6: 133.4,
      c_7: 297.3,
      c_8: 291.5,
      c_9: 201.2,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_8: 0.3,
      c_9: 0.3,
    },
  },
  {
    x: 450,
    y: 220,
    name: "c_6",
    isVisited: false,
    distanceTo: {
      c_0: 370,
      c_1: 271.7,
      c_2: 297.3,
      c_3: 319.1,
      c_4: 174.9,
      c_5: 133.4,
      c_7: 165.5,
      c_8: 305.3,
      c_9: 155.2,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_7: 0,
      c_8: 0,
      c_9: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_7: 0.3,
      c_8: 0.3,
      c_9: 0.3,
    },
  },
  {
    x: 380,
    y: 70,
    name: "c_7",
    isVisited: false,
    distanceTo: {
      c_0: 281.6,
      c_1: 269.1,
      c_2: 431,
      c_3: 483.7,
      c_4: 228,
      c_5: 297.3,
      c_6: 165.5,
      c_8: 363.6,
      c_9: 206.2,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_8: 0,
      c_9: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_8: 0.3,
      c_9: 0.3,
    },
  },
  {
    x: 190,
    y: 380,
    name: "c_8",
    isVisited: false,
    distanceTo: {
      c_0: 294.1,
      c_1: 130.4,
      c_2: 200,
      c_3: 443.8,
      c_4: 480.2,
      c_5: 291.5,
      c_8: 305.3,
      c_7: 363.6,
      c_9: 162.8,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_8: 0,
      c_7: 0,
      c_9: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_9: 0.3,
    },
  },
  {
    x: 300,
    y: 260,
    name: "c_9",
    isVisited: false,
    distanceTo: {
      c_0: 256.1,
      c_1: 120.4,
      c_2: 245.2,
      c_3: 394.1,
      c_4: 327,
      c_5: 201.2,
      c_6: 155.2,
      c_7: 206.2,
      c_8: 162.8,
    },
    pheromoneTo: {
      c_0: 0,
      c_1: 0,
      c_2: 0,
      c_3: 0,
      c_4: 0,
      c_5: 0,
      c_6: 0,
      c_7: 0,
      c_8: 0,
    },
    lineWidthTo: {
      c_0: 0.3,
      c_1: 0.3,
      c_2: 0.3,
      c_3: 0.3,
      c_4: 0.3,
      c_5: 0.3,
      c_6: 0.3,
      c_7: 0.3,
      c_8: 0.3,
    },
  },
]
describe("#roundUpTo3Decimal", () => {
  it("Rounds up numbers to floor value", () => {
    expect(roundUpTo3Decimal(1.256487)).toBe(1.256)
  })

  it("Rounds up to ceil value", () => {
    expect(roundUpTo3Decimal(1.256587)).toBe(1.257)
  })
})

describe("#getRandomIntInclusive", () => {
  it("Returns 0 or 1 since min=0 & max=1 and random number is inclusive", () => {
    let randNbr = getRandomIntInclusive(0, 1)
    expect(randNbr).toBeGreaterThanOrEqual(0)
    expect(randNbr).toBeLessThanOrEqual(1)
  })
})

describe("#getProbabilityOfMovingToCity_j", () => {
  describe("Test if the probability calculation is valid mathematically", () => {
    const unvisitedNeighbors = [
      "c_1",
      "c_2",
      "c_3",
      "c_4",
      "c_5",
      "c_6",
      "c_7",
      "c_8",
      "c_9",
    ]
    it("Returns a valid probability value between [0,1]", () => {
      let probability = getProbabilityOfMovingToCity_j(
        cities[0],
        unvisitedNeighbors,
        "c_1",
        1,
        1
      )
      expect(probability).toBeGreaterThanOrEqual(0)
      expect(probability).toBeLessThanOrEqual(1)
    })
    it("Sum of probabilities of moving to all remaining unvisited cities should be 1", () => {
      let s = 0
      for (let i = 0; i < unvisitedNeighbors.length; i++) {
        const prob = getProbabilityOfMovingToCity_j(
          cities[0],
          unvisitedNeighbors,
          unvisitedNeighbors[i],
          1,
          1
        )
        s += prob
      }
      s = roundUpTo3Decimal(s)
      expect(s).toBe(1)
    })
  })
  it("Returns 1 if it remains only one city to visit", () => {
    let prob = getProbabilityOfMovingToCity_j(cities[0], ["c_1"], "c_1", 1, 1)
    expect(prob).toBe(1)
  })
  it("Returns 0 if it All the cities were visited", () => {
    let prob = getProbabilityOfMovingToCity_j(cities[0], [], "", 1, 1)
    expect(prob).toBe(0)
  })
})
