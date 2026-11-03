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
      tooltip: {
        callbacks: {
          title(items) {
            return `Iteration: ${items[0]?.label ?? ""}`
          },
          label(item) {
            return `${item.dataset.label}: ${item.formattedValue}`
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Iteration", color: theme.muted },
        grid: { color: theme.border },
        ticks: { color: theme.muted },
        border: { color: theme.border },
      },
      y: {
        title: { display: true, text: "Path length", color: theme.muted },
        grid: { color: theme.border },
        ticks: { color: theme.muted },
        border: { color: theme.border },
      },
    },
  }
}
