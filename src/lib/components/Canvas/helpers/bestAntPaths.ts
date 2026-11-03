export function convertPathToEdges(antPath: string[]) {
  if (antPath.length === 0) return []
  const antPathEdges = []
  for (let i = 0; i < antPath.length - 1; i++) {
    antPathEdges.push(antPath[i] + antPath[i + 1])
  }
  antPathEdges.push(antPath[antPath.length - 1] + antPath[0])
  return antPathEdges
}
