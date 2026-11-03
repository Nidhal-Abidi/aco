import { describe, expect, it } from "vitest"
import {
  citiesDeepCopy,
  elitistPheromoneUpdate,
  maxMinEdgePropertiesUpdate,
  startACOForTSP,
  updateEdgeProperties,
  type City,
} from "./acoAlgorithms"

const tour = ["c_0", "c_1", "c_2", "c_3"]

function linkedCities(pheromone: number): City[] {
  const names = ["c_0", "c_1", "c_2", "c_3"]
  return names.map((name, index) => {
    const distanceTo: Record<string, number> = {}
    const pheromoneTo: Record<string, number> = {}
    const lineWidthTo: Record<string, number> = {}
    const edgeAntFlow: Record<string, number> = {}
    names.forEach((other, otherIndex) => {
      if (other === name) return
      distanceTo[other] = 10
      pheromoneTo[other] = pheromone
      lineWidthTo[other] = 0.3
      edgeAntFlow[other] = 0
    })
    return {
      x: index * 10,
      y: 0,
      name,
      isVisited: false,
      distanceTo,
      pheromoneTo,
      lineWidthTo,
      edgeAntFlow,
    }
  })
}

function pheromoneBetween(cities: City[], from: string, to: string) {
  const city = cities.find((candidate) => candidate.name === from)
  if (!city) throw new Error(`Missing ${from}`)
  return city.pheromoneTo[to]
}

describe("pheromone update", () => {
  it("deposits pheromone on the edge that closes the tour", () => {
    const updated = updateEdgeProperties(
      linkedCities(1),
      [["c_0", "c_1", "c_2"]],
      0,
      1
    )

    expect(pheromoneBetween(updated, "c_2", "c_0")).toBeCloseTo(1 + 1 / 30)
    expect(pheromoneBetween(updated, "c_0", "c_2")).toBeCloseTo(1 + 1 / 30)
  })

  it("carries pheromone into the next iteration instead of rebuilding from the template", () => {
    const template = linkedCities(1)
    let state = updateEdgeProperties(citiesDeepCopy(template), [tour], 0, 1)
    state = updateEdgeProperties(citiesDeepCopy(state), [tour], 0, 1)

    expect(pheromoneBetween(state, "c_0", "c_1")).toBeCloseTo(1 + 2 / 40)
    expect(pheromoneBetween(template, "c_0", "c_1")).toBe(1)
  })

  it("evaporates a Max-Min edge once", () => {
    const updated = maxMinEdgePropertiesUpdate(
      linkedCities(10),
      tour,
      40,
      [tour],
      1,
      0.5,
      0,
      100
    )

    expect(pheromoneBetween(updated, "c_0", "c_1")).toBeCloseTo(5 + 1 / 40)
    expect(pheromoneBetween(updated, "c_0", "c_2")).toBeCloseTo(5)
  })

  it("keeps the elitist bonus on the working state and leaves the template alone", () => {
    const template = linkedCities(1)
    let state = elitistPheromoneUpdate(citiesDeepCopy(template), tour, 40, 2)
    state = updateEdgeProperties(state, [tour], 0, 1)
    const afterFirst = pheromoneBetween(state, "c_0", "c_1")

    state = elitistPheromoneUpdate(citiesDeepCopy(state), tour, 40, 2)
    state = updateEdgeProperties(state, [tour], 0, 1)

    expect(afterFirst).toBeCloseTo(1 + 3 / 40)
    expect(pheromoneBetween(state, "c_0", "c_1")).toBeCloseTo(1 + 6 / 40)
    expect(pheromoneBetween(state, "c_0", "c_2")).toBe(1)
    expect(pheromoneBetween(template, "c_0", "c_1")).toBe(1)
  })

  it("accumulates pheromone across a run and reports completion", () => {
    const template = linkedCities(1)
    const before = citiesDeepCopy(template)
    const progress: number[] = []
    const { iterations } = startACOForTSP(
      template,
      "as",
      2,
      1,
      1,
      1,
      0,
      3,
      (value) => progress.push(value)
    )

    const total = (cities: City[]) =>
      cities.reduce(
        (sum, city) =>
          sum + Object.values(city.pheromoneTo).reduce((edgeSum, amount) => edgeSum + amount, 0),
        0
      )

    expect(template).toEqual(before)
    expect(total(iterations[1])).toBeGreaterThan(total(iterations[0]))
    expect(total(iterations[2])).toBeGreaterThan(total(iterations[1]))
    expect(progress[progress.length - 1]).toBe(100)
  })

  it("does not mark the caller's cities visited during Max-Min setup", () => {
    const template = linkedCities(1)
    startACOForTSP(template, "max-min-as", 2, 2, 1, 1, 0.5, 2, () => {})

    expect(template.every((city) => city.isVisited === false)).toBe(true)
    expect(pheromoneBetween(template, "c_0", "c_1")).toBe(1)
  })
})
