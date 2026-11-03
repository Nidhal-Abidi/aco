import type { City } from "../../../algorithms/acoAlgorithms"
import { deepCopyOfCitiesArray } from "../../../helpers/citiesDeepCopy"
import { theme } from "../../../theme"

type DrawMetrics = {
  radius: number
  fontSize: number
  bestStroke: number
  pad: number
  scaleSpace: number
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function drawMetrics(
  cities: City[],
  canvasWidth: number,
  canvasHeight: number
): DrawMetrics {
  const shorter = Math.min(canvasWidth, canvasHeight)
  const radius = clamp(shorter / 22, 10, 18)
  const fontSize = Math.max(8, Math.round(radius * 0.72))
  const longestName = cities.reduce(
    (longest, city) => Math.max(longest, city.name.length),
    1
  )
  const labelHalf = (longestName * fontSize * 0.62) / 2
  const bestStroke = clamp(radius / 4, 2.5, 4)
  const scaleSpace = fontSize + 14
  const desiredPad = Math.max(radius, labelHalf) + bestStroke / 2 + 1
  const maxPad = Math.min(canvasWidth, canvasHeight) * 0.28
  return {
    radius,
    fontSize,
    bestStroke,
    pad: Math.min(desiredPad, Math.max(0, maxPad)),
    scaleSpace,
  }
}

export function placeCities(
  cities: City[],
  width: number,
  height: number,
  pad: number,
  bottomInset = pad
) {
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  for (const city of cities) {
    minX = Math.min(minX, city.x)
    maxX = Math.max(maxX, city.x)
    minY = Math.min(minY, city.y)
    maxY = Math.max(maxY, city.y)
  }
  const spanX = maxX - minX || 1
  const spanY = maxY - minY || 1
  const innerW = Math.max(width - pad * 2, 1)
  const innerH = Math.max(height - pad - bottomInset, 1)
  const side = Math.min(innerW, innerH)
  const offsetX = pad + (innerW - side) / 2
  const offsetY = pad + (innerH - side) / 2
  return cities.map((city) => ({
    ...city,
    x: offsetX + ((city.x - minX) / spanX) * side,
    y: offsetY + ((city.y - minY) / spanY) * side,
  }))
}

function drawCircle(
  x: number,
  y: number,
  radius: number,
  ctx: CanvasRenderingContext2D
) {
  ctx.fillStyle = theme.surface
  ctx.strokeStyle = theme.accent
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()
}

function drawText(
  x: number,
  y: number,
  text: string,
  fontSize: number,
  ctx: CanvasRenderingContext2D
) {
  ctx.font = `600 ${fontSize}px ${theme.mono}`
  ctx.fillStyle = theme.text
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(text, x, y)
}

function drawEdge(
  x_a: number,
  y_a: number,
  x_b: number,
  y_b: number,
  lineWidth: number,
  ctx: CanvasRenderingContext2D,
  color = theme.edge
) {
  const prevLineWidth = ctx.lineWidth
  ctx.strokeStyle = color
  ctx.lineWidth = lineWidth
  ctx.beginPath()
  ctx.moveTo(x_a, y_a)
  ctx.lineTo(x_b, y_b)
  ctx.stroke()
  ctx.lineWidth = prevLineWidth
}

function drawCity(
  x: number,
  y: number,
  name: string,
  metrics: DrawMetrics,
  ctx: CanvasRenderingContext2D
) {
  drawCircle(x, y, metrics.radius, ctx)
  drawText(x, y, name, metrics.fontSize, ctx)
}

function clearCanvas(
  width: number,
  height: number,
  ctx: CanvasRenderingContext2D
) {
  ctx.clearRect(0, 0, width, height)
}

function squareBounds(cities: City[]) {
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  for (const city of cities) {
    minX = Math.min(minX, city.x)
    maxX = Math.max(maxX, city.x)
    minY = Math.min(minY, city.y)
    maxY = Math.max(maxY, city.y)
  }
  return { minX, maxX, minY, maxY }
}

function drawUnitSquare(
  bounds: { minX: number; maxX: number; minY: number; maxY: number },
  ctx: CanvasRenderingContext2D
) {
  const prevLineWidth = ctx.lineWidth
  ctx.strokeStyle = theme.border
  ctx.lineWidth = 1
  ctx.strokeRect(
    bounds.minX,
    bounds.minY,
    bounds.maxX - bounds.minX,
    bounds.maxY - bounds.minY
  )
  ctx.lineWidth = prevLineWidth
}

function drawScale(
  bounds: { minX: number; maxX: number; maxY: number },
  radius: number,
  fontSize: number,
  ctx: CanvasRenderingContext2D
) {
  const barY = bounds.maxY + radius + 6
  const tick = 4
  const prevLineWidth = ctx.lineWidth
  ctx.strokeStyle = theme.muted
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(bounds.minX, barY)
  ctx.lineTo(bounds.maxX, barY)
  ctx.moveTo(bounds.minX, barY - tick)
  ctx.lineTo(bounds.minX, barY + tick)
  ctx.moveTo(bounds.maxX, barY - tick)
  ctx.lineTo(bounds.maxX, barY + tick)
  ctx.stroke()
  ctx.lineWidth = prevLineWidth
  ctx.font = `600 ${fontSize}px ${theme.mono}`
  ctx.fillStyle = theme.muted
  ctx.textAlign = "center"
  ctx.textBaseline = "top"
  ctx.fillText("0", bounds.minX, barY + tick + 2)
  ctx.fillText("1", bounds.maxX, barY + tick + 2)
}

function showCityEdges(
  cities: City[],
  globalBestPathEdges: string[],
  bestStroke: number,
  ctx: CanvasRenderingContext2D
) {
  let remainingCities = deepCopyOfCitiesArray(cities)
  while (remainingCities.length > 1) {
    const currentCity = remainingCities[0]
    for (let i = 1; i < remainingCities.length; i++) {
      const neighborName = remainingCities[i].name
      if (
        !areEdgesInPath(
          globalBestPathEdges,
          currentCity.name + neighborName,
          neighborName + currentCity.name
        )
      ) {
        drawEdge(
          currentCity.x,
          currentCity.y,
          remainingCities[i].x,
          remainingCities[i].y,
          Math.max(1, currentCity.lineWidthTo[neighborName] ?? 1),
          ctx
        )
      }
    }
    remainingCities.shift()
  }
  remainingCities = deepCopyOfCitiesArray(cities)
  while (remainingCities.length > 1) {
    const currentCity = remainingCities[0]
    for (let i = 1; i < remainingCities.length; i++) {
      const neighborName = remainingCities[i].name
      if (
        areEdgesInPath(
          globalBestPathEdges,
          currentCity.name + neighborName,
          neighborName + currentCity.name
        )
      ) {
        drawEdge(
          currentCity.x,
          currentCity.y,
          remainingCities[i].x,
          remainingCities[i].y,
          bestStroke,
          ctx,
          theme.amber
        )
      }
    }
    remainingCities.shift()
  }
}

function areEdgesInPath(path: string[], edge: string, inverseEdge: string) {
  return path.includes(edge) || path.includes(inverseEdge)
}

export function displayCities(
  cities: City[],
  globalBestPathEdges: string[],
  canvasWidth: number,
  canvasHeight: number,
  ctx: CanvasRenderingContext2D
) {
  if (canvasWidth < 1 || canvasHeight < 1) return
  const metrics = drawMetrics(cities, canvasWidth, canvasHeight)
  const placed = placeCities(
    cities,
    canvasWidth,
    canvasHeight,
    metrics.pad,
    metrics.pad + metrics.scaleSpace
  )
  const bounds = squareBounds(placed)
  clearCanvas(canvasWidth, canvasHeight, ctx)
  drawUnitSquare(bounds, ctx)
  showCityEdges(placed, globalBestPathEdges, metrics.bestStroke, ctx)
  placed.forEach((city) => {
    drawCity(city.x, city.y, city.name, metrics, ctx)
  })
  drawScale(bounds, metrics.radius, metrics.fontSize, ctx)
}
