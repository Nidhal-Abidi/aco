import { Chart, type ChartOptions } from "chart.js"
import { theme } from "./theme"

let applied = false

export function applyChartTheme() {
  if (applied) return
  applied = true
  Chart.defaults.font.family = theme.font
  Chart.defaults.color = theme.muted
}

export function lineChartOptions(): ChartOptions<"line"> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: theme.text,
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: "line",
        },
      },
    },
    scales: {
      x: {
        grid: { color: theme.border },
        ticks: { color: theme.muted },
        border: { color: theme.border },
      },
      y: {
        grid: { color: theme.border },
        ticks: { color: theme.muted },
        border: { color: theme.border },
      },
    },
  }
}
