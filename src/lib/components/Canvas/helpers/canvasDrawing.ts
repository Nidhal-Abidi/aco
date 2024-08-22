import type { City } from "../../../algorithms/acoAlgorithms"
import { deepCopyOfCitiesArray } from "../../../helpers/citiesDeepCopy"

function drawCircle(x: number, y: number, ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "white"
  ctx.strokeStyle = "#a67b5b" // Set the border color
  //ctx.strokeStyle = "red"
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.arc(x, y, 18, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()
}

function drawText(
  x: number,
  y: number,
  text: string,
  ctx: CanvasRenderingContext2D
) {
  ctx.font = "bold 10pt Courier"
  ctx.fillStyle = "black"
  ctx.textAlign = "center"
  ctx.fillText(text, x, y + 3)
}

function drawEdge(
  x_a: number,
  y_a: number,
  x_b: number,
  y_b: number,
  lineWidth: number,
  ctx: CanvasRenderingContext2D,
  color = "gray"
) {
  let prevLineWidth = ctx.lineWidth
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
  ctx: CanvasRenderingContext2D
) {
  //represents a city inside the canvas
  drawCircle(x, y, ctx)
  drawText(x, y, name, ctx)
}

function clearCanvas(
  width: number,
  height: number,
  ctx: CanvasRenderingContext2D
) {
  //console.log("Clearing the canvas")
  ctx.clearRect(0, 0, width, height)
}

function showCityEdges(
  cities: City[],
  globalBestPathEdges: string[],
  ctx: CanvasRenderingContext2D
) {
  // 1) Draw the ordinay edges (They're seperated so that bestpath would always be drawn on top of the oridnary edges)
  let remainingCities = deepCopyOfCitiesArray(cities)
  while (remainingCities.length > 1) {
    let currentCity = remainingCities[0]
    for (let i = 1; i < remainingCities.length; i++) {
      let neighborName = remainingCities[i].name
      if (
        !areEdgesInPath(
          globalBestPathEdges,
          currentCity.name + neighborName,
          neighborName + currentCity.name
        )
      ) {
        // Ordinary edge
        drawEdge(
          currentCity.x,
          currentCity.y,
          remainingCities[i].x,
          remainingCities[i].y,
          currentCity.lineWidthTo[neighborName],
          ctx
        )
      }
    }
    remainingCities.shift()
  }
  // 2) Draw the edges of the best path
  remainingCities = deepCopyOfCitiesArray(cities)
  while (remainingCities.length > 1) {
    let currentCity = remainingCities[0]
    for (let i = 1; i < remainingCities.length; i++) {
      let neighborName = remainingCities[i].name
      if (
        areEdgesInPath(
          globalBestPathEdges,
          currentCity.name + neighborName,
          neighborName + currentCity.name
        )
      ) {
        // This edge is part of the global best path for the current iteration
        drawEdge(
          currentCity.x,
          currentCity.y,
          remainingCities[i].x,
          remainingCities[i].y,
          5,
          ctx,
          "#a67b5b"
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
  clearCanvas(canvasWidth, canvasHeight, ctx)
  showCityEdges(cities, globalBestPathEdges, ctx)
  cities.forEach((city) => {
    drawCity(city.x, city.y, city.name, ctx)
  })
}
