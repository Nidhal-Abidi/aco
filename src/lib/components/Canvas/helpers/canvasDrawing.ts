import type { City } from "../../../algorithms/acoAlgorithms"
import { deepCopyOfCitiesArray } from "../../../helpers/citiesDeepCopy"

function drawCircle(x: number, y: number, ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "white"
  //ctx.strokeStyle = "red"
  //ctx.lineWidth = 5
  ctx.beginPath()
  ctx.arc(x, y, 18, 0, Math.PI * 2)
  ctx.fill()
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
  color = "lightblue"
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

function showCityEdges(cities: City[], ctx: CanvasRenderingContext2D) {
  let remainingCities = deepCopyOfCitiesArray(cities)
  while (remainingCities.length > 1) {
    let currentCity = remainingCities[0]
    for (let i = 1; i < remainingCities.length; i++) {
      let neighborName = remainingCities[i].name
      drawEdge(
        currentCity.x,
        currentCity.y,
        remainingCities[i].x,
        remainingCities[i].y,
        currentCity.lineWidthTo[neighborName],
        ctx
      )
    }
    remainingCities.shift()
  }
}

export function displayCities(
  cities: City[],
  canvasWidth: number,
  canvasHeight: number,
  ctx: CanvasRenderingContext2D
) {
  clearCanvas(canvasWidth, canvasHeight, ctx)
  showCityEdges(cities, ctx)
  cities.forEach((city) => {
    drawCity(city.x, city.y, city.name, ctx)
  })
}
