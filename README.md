# Ant Colony Optimization

## Project Overview

This project implements three variants of the Ant Colony Optimization (ACO) algorithm to solve the Traveling Salesman Problem (TSP). The TSP is a classic optimization problem that seeks the shortest possible route that visits each city exactly once and returns to the starting city. The ACO algorithm is inspired by the behavior of ants in finding the shortest paths from their colony to food sources.

### ACO Variants Implemented

1. **Ant System (AS):** The standard ACO algorithm where all ants contribute to pheromone updating.
2. **Elitist Ant System (EAS):** A variant that adds extra pheromone to the best-so-far path, guiding future ants towards it.
3. **Max-Min Ant System (MMAS):** Focuses on reinforcing the most promising paths by limiting pheromone values within a defined range.

### Project Components

**Header (Hyperparameter Controls):**

- The header contains various parameters that users can adjust to see how they affect the algorithm's performance. The parameters include:
  - **Cities:** Choose a fixed layout (5, 7, 10, 15, or 20 cities). Edge distances do not change between runs.
  - **ACO Mode:** Select the ACO variant (Ant System, Elitist Ant System, Max-Min Ant System).
  - **Colony Size:** Set the number of ants in the colony.
  - **Iterations Number:** Define the number of iterations.
  - **Alpha (α):** Pheromone weight. 0 ignores pheromone.
  - **Beta (β):** Distance weight. Shorter edges are preferred. 0 ignores distance.
  - **Rho (ρ):** Fraction of pheromone evaporated each iteration.
  - **Initial Pheromone:** Set the initial amount of pheromone on all edges (not available for Max-Min Ant System).
  - **Elitist Weight:** Adjust the weight of the extra pheromone in the Elitist Ant System variant.

**Canvas:**

- The canvas draws each fixed city layout as a square whose side is 1. Edge distance is the straight-line length in that square, rounded to 0.1. Line thickness is how many ants used that edge in the current iteration, not the pheromone on it. The global best path is highlighted.

**Edge ant flow:**

- This component displays a matrix where cities are listed on both the x and y axes. Each cell is the fraction of the colony that crossed that edge in the current iteration. The cell color is that fraction, not the pheromone value.

**Global Best Path Chart:**

- This chart plots the length of the global best path found by the algorithm over the course of the iterations. The x-axis represents the iteration number, while the y-axis shows the length of the global best path. This chart allows users to see how quickly the algorithm converges towards an optimal solution.

**Local Best Path Chart:**

- Similar to the Global Best Path Chart, this chart tracks the path length of the shortest path in each iteration. It can rise when a later iteration is worse.

### How to Use the Website

**Select parameters:**

- Use the dropdown menus in the header to select the city layout, ACO variant, colony size, number of iterations, and other parameters. Tooltips are provided for each option to help you understand their roles.

**Run the Simulation:**

- Once you've configured the parameters, the simulation will run after clicking the button "Start Animation". Watch as the ants build paths, edge ant flow changes, and the charts update in real time.

**Analyze Results:**

- Examine the global best path and edge ant flow on the canvas. Use the Global and Local Best Path Charts to assess the algorithm's performance. Adjust the parameters as needed to explore different behaviors and outcomes.

### License

This project is open-source and available under the MIT License. Feel free to use, modify, and distribute as needed.
