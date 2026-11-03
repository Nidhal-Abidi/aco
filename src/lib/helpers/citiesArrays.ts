import type { City } from "../algorithms/acoAlgorithms"

type Point = { x: number; y: number }

function roundDistance(value: number) {
  return Math.round(value * 10) / 10
}

function normalize(points: Point[]): Point[] {
  const minX = Math.min(...points.map((point) => point.x))
  const maxX = Math.max(...points.map((point) => point.x))
  const minY = Math.min(...points.map((point) => point.y))
  const maxY = Math.max(...points.map((point) => point.y))
  const spanX = maxX - minX || 1
  const spanY = maxY - minY || 1
  return points.map((point) => ({
    x: Math.round(((point.x - minX) / spanX) * 10000) / 10000,
    y: Math.round(((point.y - minY) / spanY) * 10000) / 10000,
  }))
}

function buildCitySet(rawPoints: Point[]): City[] {
  const points = normalize(rawPoints)
  return points.map((point, index) => {
    const name = `c_${index}`
    const distanceTo: Record<string, number> = {}
    const pheromoneTo: Record<string, number> = {}
    const lineWidthTo: Record<string, number> = {}
    const edgeAntFlow: Record<string, number> = {}
    points.forEach((other, otherIndex) => {
      if (otherIndex === index) return
      const otherName = `c_${otherIndex}`
      const distance = roundDistance(
        Math.hypot(point.x - other.x, point.y - other.y)
      )
      distanceTo[otherName] = distance === 0 ? 0.1 : distance
      pheromoneTo[otherName] = 0
      lineWidthTo[otherName] = 0.3
      edgeAntFlow[otherName] = 0
    })
    return {
      x: point.x,
      y: point.y,
      name,
      isVisited: false,
      distanceTo,
      pheromoneTo,
      lineWidthTo,
      edgeAntFlow,
    }
  })
}

export const cities5 = buildCitySet([
  { x: 30, y: 20 },
  { x: 620, y: 50 },
  { x: 330, y: 490 },
  { x: 50, y: 300 },
  { x: 600, y: 400 },
])

export const cities7 = buildCitySet([
  { x: 40, y: 60 },
  { x: 620, y: 70 },
  { x: 330, y: 490 },
  { x: 100, y: 400 },
  { x: 580, y: 420 },
  { x: 300, y: 150 },
  { x: 620, y: 500 },
])

export const cities10 = buildCitySet([
  { x: 100, y: 100 },
  { x: 180, y: 250 },
  { x: 350, y: 500 },
  { x: 620, y: 490 },
  { x: 600, y: 130 },
  { x: 480, y: 350 },
  { x: 450, y: 220 },
  { x: 380, y: 70 },
  { x: 190, y: 380 },
  { x: 300, y: 260 },
])

export const cities15 = buildCitySet([
  { x: 50, y: 400 },
  { x: 100, y: 50 },
  { x: 150, y: 300 },
  { x: 200, y: 150 },
  { x: 250, y: 450 },
  { x: 300, y: 250 },
  { x: 350, y: 100 },
  { x: 400, y: 350 },
  { x: 450, y: 200 },
  { x: 500, y: 50 },
  { x: 550, y: 400 },
  { x: 100, y: 200 },
  { x: 200, y: 350 },
  { x: 300, y: 50 },
  { x: 400, y: 150 },
])

export const cities20 = buildCitySet([
  { x: 0.08, y: 0.12 },
  { x: 0.22, y: 0.38 },
  { x: 0.05, y: 0.72 },
  { x: 0.18, y: 1 },
  { x: 0.35, y: 0.08 },
  { x: 0.42, y: 0.28 },
  { x: 0.33, y: 0.55 },
  { x: 0.48, y: 0.82 },
  { x: 0.55, y: 0 },
  { x: 0.62, y: 0.22 },
  { x: 0.7, y: 0.48 },
  { x: 0.58, y: 0.68 },
  { x: 0.75, y: 0.9 },
  { x: 0.88, y: 0.15 },
  { x: 1, y: 0.35 },
  { x: 0.92, y: 0.58 },
  { x: 0.82, y: 0.78 },
  { x: 0.96, y: 1 },
  { x: 0, y: 0.45 },
  { x: 0.5, y: 0.42 },
])
