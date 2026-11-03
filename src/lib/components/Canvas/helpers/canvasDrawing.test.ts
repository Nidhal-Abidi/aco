import { describe, expect, it } from "vitest"
import type { City } from "../../../algorithms/acoAlgorithms"
import { placeCities } from "./canvasDrawing"

function city(name: string, x: number, y: number): City {
  return {
    name,
    x,
    y,
    isVisited: false,
    distanceTo: {},
    pheromoneTo: {},
    lineWidthTo: {},
  }
}

describe("placeCities", () => {
  it("keeps equal data distances equal on a wide canvas", () => {
    const placed = placeCities(
      [city("origin", 0, 0), city("east", 1, 0), city("south", 0, 1)],
      800,
      400,
      20
    )
    const at = (name: string) => placed.find((item) => item.name === name)!
    const origin = at("origin")
    const east = at("east")
    const south = at("south")
    const horizontal = Math.hypot(east.x - origin.x, east.y - origin.y)
    const vertical = Math.hypot(south.x - origin.x, south.y - origin.y)

    expect(horizontal).toBeCloseTo(vertical)
    expect(horizontal).toBeGreaterThan(0)
  })

  it("keeps equal gaps when the scale inset is only on the bottom", () => {
    const placed = placeCities(
      [city("origin", 0, 0), city("east", 1, 0), city("south", 0, 1)],
      800,
      400,
      20,
      80
    )
    const at = (name: string) => placed.find((item) => item.name === name)!
    const origin = at("origin")
    const east = at("east")
    const south = at("south")
    const horizontal = Math.hypot(east.x - origin.x, east.y - origin.y)
    const vertical = Math.hypot(south.x - origin.x, south.y - origin.y)

    expect(horizontal).toBeCloseTo(vertical)
    expect(400 - south.y).toBeCloseTo(80)
  })
})
