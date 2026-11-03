/** Mirrors the custom properties in src/app.css. Canvas and Chart.js cannot read those variables. */
export const theme = {
  text: "#1e293b",
  muted: "#64748b",
  border: "#e2e8f0",
  surface: "#ffffff",
  accent: "#0f766e",
  amber: "#d97706",
  edge: "#94a3b8",
  font: '"Source Sans 3", "Segoe UI", sans-serif',
  mono: '"IBM Plex Mono", ui-monospace, monospace',
}

/** Sequential teal from a 0–1 share of ants on an edge. */
export function heatCellColor(amount: number) {
  const t = Math.min(1, Math.max(0, amount))
  const r = Math.round(230 + (15 - 230) * t)
  const g = Math.round(244 + (118 - 244) * t)
  const b = Math.round(243 + (110 - 243) * t)
  return `rgb(${r}, ${g}, ${b})`
}
