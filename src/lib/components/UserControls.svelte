<script lang="ts">
  import { createEventDispatcher } from "svelte"

  let nbrOfCities: number
  let acoMode: string
  let colonySize: number
  let nbrOfIterations: number
  let alpha: number
  let beta: number
  let rho: number
  let initialPheromone: number
  let speed: string
  let sound: string
  let elitistWeight: number

  $: showElitistWeight = acoMode === "elitist"
  $: showInitialPheromone = acoMode !== "max-min-as"

  const dispatch = createEventDispatcher()

  function onSubmit() {
    dispatch("startAnimation", {
      nbrOfCities: nbrOfCities == undefined ? 10 : nbrOfCities,
      acoMode: acoMode == undefined ? "as" : acoMode,
      colonySize: colonySize == undefined ? 30 : colonySize,
      nbrOfIterations: nbrOfIterations == undefined ? 200 : nbrOfIterations,
      alpha: alpha == undefined ? 3 : alpha,
      beta: beta == undefined ? 1 : beta,
      rho: rho == undefined ? 0.1 : rho,
      initialPheromone: initialPheromone == undefined ? 1 : initialPheromone,
      sound: sound == undefined ? "on" : sound,
      speed: speed == undefined ? "150" : speed,
      elitistWeight: elitistWeight == undefined ? 2 : elitistWeight,
    })
  }

  function resetAnimation() {
    dispatch("resetAnimation")
  }
</script>

<form on:submit|preventDefault={onSubmit}>
  <label>
    <span class="tooltip">
      Travel map
      <span class="tooltiptext">Choose a map size (number of cities)</span>
    </span>
    <select name="nbr-of-cities" id="nbr-of-cities" bind:value={nbrOfCities}>
      <option value="5">Small Town</option>
      <option value="7" selected>Medium Town</option>
      <option value="10">Large Town</option>
      <option value="15">Metropolis</option>
    </select>
  </label>

  <label>
    <span class="tooltip">
      ACO mode
      <span class="tooltiptext"
        >Select an ACO variant (AS, Elitist AS, or Max-Min AS).</span
      >
    </span>
    <select name="aco-mode" id="aco-mode" bind:value={acoMode}>
      <option value="as" selected>Ant System</option>
      <option value="elitist">Elitist Ant System</option>
      <option value="max-min-as">Max-Min Ant System</option>
    </select>
  </label>

  {#if showElitistWeight}
    <label>
      <span class="tooltip">
        Elitist Weight
        <span class="tooltiptext"
          >Extra pheromone for best path (Elitist AS only).</span
        >
      </span>

      <select
        name="elitist-weight"
        id="elitist-weight"
        bind:value={elitistWeight}
      >
        <option value="0.1">0.1</option>
        <option value="0.5">0.5</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50" selected>50</option>
        <option value="100">100</option>
      </select>
    </label>
  {/if}

  <label>
    <span class="tooltip">
      Colony Size
      <span class="tooltiptext">Number of ants in the colony (10-200).</span>
    </span>

    <select name="colony-size" id="colony-size" bind:value={colonySize}>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="30">30</option>
      <option value="50" selected>50</option>
      <option value="100">100</option>
      <option value="200">200</option>
    </select>
  </label>

  <label>
    <span class="tooltip">
      Iterations
      <span class="tooltiptext">Total algorithm iterations (50-500).</span>
    </span>

    <select
      name="nbr-iterations"
      id="nbr-iterations"
      bind:value={nbrOfIterations}
    >
      <option value="50">50</option>
      <option value="100">100</option>
      <option value="200" selected>200</option>
      <option value="300">300</option>
      <option value="500">500</option>
    </select>
  </label>

  <label>
    <span class="tooltip">
      Alpha
      <span class="tooltiptext">Controls pheromone influence (1-15).</span>
    </span>

    <select name="alpha" id="alpha" bind:value={alpha}>
      <option value="0">0</option>
      <option value="1" selected>1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
    </select>
  </label>

  <label>
    <span class="tooltip"
      >Beta

      <span class="tooltiptext">Controls distance influence (1-15).</span>
    </span>

    <select name="beta" id="beta" bind:value={beta}>
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5" selected>5</option>
      <option value="10">10</option>
      <option value="15">15</option>
    </select>
  </label>

  <label>
    <span class="tooltip"
      >Rho
      <span class="tooltiptext">Pheromone evaporation rate (0-0.75).</span>
    </span>

    <select name="rho" id="rho" bind:value={rho}>
      <option value="0">0</option>
      <option value="0.001">0.001</option>
      <option value="0.01">0.01</option>
      <option value="0.05">0.05</option>
      <option value="0.1">0.1</option>
      <option value="0.2">0.2</option>
      <option value="0.5" selected>0.5</option>
      <option value="0.75">0.75</option>
    </select>
  </label>

  {#if showInitialPheromone}
    <label>
      <span class="tooltip"
        >Initial Pheromone
        <span class="tooltiptext"
          >Starting pheromone amount on edges (not for Max-Min AS).</span
        >
      </span>

      <select
        name="initial-pheromone"
        id="initial-pheromone"
        bind:value={initialPheromone}
      >
        <option value="0.1" selected>0.1</option>
        <option value="0.5">0.5</option>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </label>
  {/if}

  <label>
    <span class="tooltip"
      >Speed
      <span class="tooltiptext">Select the speed of the animation.</span>
    </span>
    <select name="speed" id="speed" bind:value={speed}>
      <option value="500">Slow</option>
      <option value="150">Normal</option>
      <option value="50" selected>Fast</option>
    </select>
  </label>

  <label>
    Sound
    <select name="sound" id="sound" bind:value={sound}>
      <option value="on" selected>On</option>
      <option value="off">Off</option>
    </select>
  </label>

  <div class="actions">
    <button type="submit" id="start-animation" class="btn">Start Animation</button>
    <button
      type="button"
      id="reset-animation"
      class="btn btn-reset"
      on:click={resetAnimation}>Reset Animation</button>
  </div>
</form>

<style>
  form {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 0.75rem 1rem;
    padding: 0.85rem 1rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    min-width: 8.5rem;
    font-size: 0.75rem;
    font-weight: 650;
    letter-spacing: 0.02em;
    color: var(--muted);
  }

  select {
    background: var(--surface);
    color: var(--text);
    font-size: 0.95rem;
    font-weight: 500;
    line-height: 1.4;
    padding: 0.4rem 0.5rem;
    border: 1px solid var(--border);
    border-radius: 8px;
    cursor: pointer;
  }

  select:focus,
  .btn:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-left: auto;
  }

  .btn {
    border: none;
    border-radius: 8px;
    padding: 0.5rem 0.9rem;
    background: var(--accent);
    color: white;
    font-size: 0.95rem;
    font-weight: 650;
    cursor: pointer;
  }

  .btn:hover {
    background: var(--accent-strong);
  }

  .btn-reset {
    background: transparent;
    color: var(--text);
    border: 1px solid var(--border);
  }

  .btn-reset:hover {
    background: var(--bg);
    color: var(--text);
  }

  .tooltip {
    position: relative;
    display: inline-block;
    width: fit-content;
    cursor: help;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 200px;
    background: var(--text);
    color: white;
    text-align: left;
    font-weight: 500;
    letter-spacing: 0;
    text-transform: none;
    padding: 0.4rem 0.55rem;
    border-radius: 8px;
    position: absolute;
    z-index: 2;
    top: calc(100% + 6px);
    left: 0;
    opacity: 0;
    transition: opacity 0.2s;
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.16);
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
</style>
