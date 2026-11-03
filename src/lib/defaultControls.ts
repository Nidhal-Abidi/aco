export const cityCountOptions = [
  { value: "5", label: "5 cities" },
  { value: "7", label: "7 cities" },
  { value: "10", label: "10 cities" },
  { value: "15", label: "15 cities" },
  { value: "20", label: "20 cities" },
] as const

export const defaultControls = {
  nbrOfCities: "10",
  acoMode: "as",
  colonySize: "10",
  nbrOfIterations: "50",
  alpha: "1",
  beta: "1",
  rho: "0.5",
  initialPheromone: "0.1",
  sound: "on",
  speed: "150",
  elitistWeight: "5",
}

export type AcoControls = typeof defaultControls
