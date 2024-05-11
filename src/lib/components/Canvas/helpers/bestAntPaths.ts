import {
  getLengthOfAllEdges,
  getAntPathLength,
  type City,
} from "../../../algorithms/acoAlgorithms"

export function extractGlobalBestPathPerIteration(
  cities: City[],
  antsChosenPaths: string[][][]
) {
  // Contains the EDGES of the global best path for each iteration
  let globalBestPathsPerIteration: string[][] = []

  const allEdgesLengths = getLengthOfAllEdges(cities)
  let globalBestPath: string[] = []
  let globalBestPathLength = 999999999
  for (let currentIterationPaths of antsChosenPaths) {
    const [localBestPath, localBestPathLength] = getLocalBestPath(
      currentIterationPaths,
      allEdgesLengths
    )
    if (localBestPathLength < globalBestPathLength) {
      globalBestPath = [...localBestPath]
      globalBestPathLength = localBestPathLength
    }
    globalBestPathsPerIteration.push(convertPathToEdges(globalBestPath))
  }
  return globalBestPathsPerIteration
}

function getLocalBestPath(
  currentIterationPaths: string[][],
  allEdgesLengths: Record<string, number>
): [string[], number] {
  let localBestPath: string[] = []
  let localBestPathLength = 999999999
  for (const antPath of currentIterationPaths) {
    const antPathLength = getAntPathLength(antPath, allEdgesLengths)
    if (antPathLength < localBestPathLength) {
      localBestPath = [...antPath]
      localBestPathLength = antPathLength
    }
  }
  return [localBestPath, localBestPathLength]
}

function convertPathToEdges(antPath: string[]) {
  let antPathEdges = []
  for (let i = 0; i < antPath.length - 1; i++) {
    antPathEdges.push(antPath[i] + antPath[i + 1])
  }
  // Add the last edge that completes the path
  antPathEdges.push(antPath[antPath.length - 1] + antPath[0])
  return antPathEdges
}
