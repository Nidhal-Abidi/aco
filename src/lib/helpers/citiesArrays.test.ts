import { describe, expect, it } from "vitest"
import {
  cities5,
  cities7,
  cities10,
  cities15,
  cities20,
} from "./citiesArrays"
import type { City } from "../algorithms/acoAlgorithms"

const sets: [string, City[], number][] = [
  ["cities5", cities5, 5],
  ["cities7", cities7, 7],
  ["cities10", cities10, 10],
  ["cities15", cities15, 15],
  ["cities20", cities20, 20],
]

describe("city sets", () => {
  it.each(sets)("%s spans the unit box with a complete distance matrix", (_name, cities, count) => {
    expect(cities).toHaveLength(count)
    expect(Math.min(...cities.map((city) => city.x))).toBe(0)
    expect(Math.max(...cities.map((city) => city.x))).toBe(1)
    expect(Math.min(...cities.map((city) => city.y))).toBe(0)
    expect(Math.max(...cities.map((city) => city.y))).toBe(1)

    const names = cities.map((city) => city.name)
    expect(new Set(names).size).toBe(count)

    for (const city of cities) {
      const others = names.filter((name) => name !== city.name)
      expect(Object.keys(city.distanceTo).sort()).toEqual([...others].sort())
      expect(Object.keys(city.pheromoneTo).sort()).toEqual([...others].sort())
      expect(Object.keys(city.lineWidthTo).sort()).toEqual([...others].sort())
      expect(Object.keys(city.edgeAntFlow ?? {}).sort()).toEqual([...others].sort())
      for (const otherName of others) {
        const other = cities.find((candidate) => candidate.name === otherName)
        expect(other).toBeDefined()
        const distance = city.distanceTo[otherName]
        expect(Number.isFinite(distance)).toBe(true)
        expect(distance).toBeGreaterThan(0)
        expect(distance).toBe(other?.distanceTo[city.name])
      }
    }
  })
})
