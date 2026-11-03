<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import {
    cityCountOptions,
    defaultControls,
    type AcoControls,
  } from "../defaultControls"

  export let isRunning = false
  export let speed = defaultControls.speed

  let nbrOfCities = defaultControls.nbrOfCities
  let acoMode = defaultControls.acoMode
  let colonySize = defaultControls.colonySize
  let nbrOfIterations = defaultControls.nbrOfIterations
  let alpha = defaultControls.alpha
  let beta = defaultControls.beta
  let rho = defaultControls.rho
  let initialPheromone = defaultControls.initialPheromone
  let sound = defaultControls.sound
  let elitistWeight = defaultControls.elitistWeight

  $: showElitistWeight = acoMode === "elitist"
  $: showInitialPheromone = acoMode !== "max-min-as"

  const dispatch = createEventDispatcher<{
    startAnimation: AcoControls
    resetAnimation: { nbrOfCities: string }
  }>()

  function onSubmit() {
    if (isRunning) return
    dispatch("startAnimation", {
      nbrOfCities,
      acoMode,
      colonySize,
      nbrOfIterations,
      alpha,
      beta,
      rho,
      initialPheromone,
      sound,
      speed,
      elitistWeight,
    })
  }

  function resetAnimation() {
    dispatch("resetAnimation", { nbrOfCities })
  }
</script>

<form on:submit|preventDefault={onSubmit}>
  <label>
    <span class="tooltip">
      Cities
      <span class="tooltiptext"
        >Fixed layout. Distances do not change between runs.</span
      >
    </span>
    <select name="nbr-of-cities" id="nbr-of-cities" bind:value={nbrOfCities}>
      {#each cityCountOptions as option}
        <option value={option.value}>{option.label}</option>
      {/each}
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
      <option value="as">Ant System</option>
      <option value="elitist">Elitist Ant System</option>
      <option value="max-min-as">Max-Min Ant System</option>
    </select>
  </label>

  {#if showElitistWeight}
    <label>
      <span class="tooltip">
        Elitist Weight
        <span class="tooltiptext"
          >Extra pheromone on the global best path.</span
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
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </label>
  {/if}

  <label>
    <span class="tooltip">
      Colony Size
      <span class="tooltiptext">Ants that build a path each iteration.</span>
    </span>

    <select name="colony-size" id="colony-size" bind:value={colonySize}>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="30">30</option>
      <option value="50">50</option>
      <option value="100">100</option>
      <option value="200">200</option>
    </select>
  </label>

  <label>
    <span class="tooltip">
      Iterations
      <span class="tooltiptext">How many times the colony builds paths.</span>
    </span>

    <select
      name="nbr-iterations"
      id="nbr-iterations"
      bind:value={nbrOfIterations}
    >
      <option value="50">50</option>
      <option value="100">100</option>
      <option value="200">200</option>
      <option value="300">300</option>
      <option value="500">500</option>
    </select>
  </label>

  <label>
    <span class="tooltip">
      Alpha
      <span class="tooltiptext"
        >Pheromone weight α (0–15). 0 ignores pheromone.</span
      >
    </span>

    <select name="alpha" id="alpha" bind:value={alpha}>
      <option value="0">0</option>
      <option value="1">1</option>
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

      <span class="tooltiptext"
        >Distance weight β (0–15). Shorter edges are preferred. 0 ignores
        distance.</span
      >
    </span>

    <select name="beta" id="beta" bind:value={beta}>
      <option value="0">0</option>
      <option value="1">1</option>
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
      >Rho
      <span class="tooltiptext">Pheromone evaporated each iteration.</span>
    </span>

    <select name="rho" id="rho" bind:value={rho}>
      <option value="0">0</option>
      <option value="0.001">0.001</option>
      <option value="0.01">0.01</option>
      <option value="0.05">0.05</option>
      <option value="0.1">0.1</option>
      <option value="0.2">0.2</option>
      <option value="0.5">0.5</option>
      <option value="0.75">0.75</option>
    </select>
  </label>

  {#if showInitialPheromone}
    <label>
      <span class="tooltip"
        >Initial Pheromone
        <span class="tooltiptext"
          >Pheromone on every edge before iteration 1. Max-Min AS sets its own
          bounds.</span
        >
      </span>

      <select
        name="initial-pheromone"
        id="initial-pheromone"
        bind:value={initialPheromone}
      >
        <option value="0.1">0.1</option>
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
      <option value="50">Fast</option>
    </select>
  </label>

  <label>
    <span class="tooltip"
      >Sound
      <span class="tooltiptext"
        >Chirp when the global best path gets shorter.</span
      >
    </span>
    <select name="sound" id="sound" bind:value={sound}>
      <option value="on">On</option>
      <option value="off">Off</option>
    </select>
  </label>

  <div class="actions">
    <button type="submit" id="start-animation" class="btn" disabled={isRunning}>
      Start Animation
    </button>
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

  .btn:hover:not(:disabled) {
    background: var(--accent-strong);
  }

  .btn:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  .btn-reset {
    background: transparent;
    color: var(--text);
    border: 1px solid var(--border);
  }

  .btn.btn-reset:hover {
    background: var(--border);
    color: var(--text);
    border-color: var(--muted);
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

  @media (max-width: 768px) {
    form {
      flex-direction: column;
      align-items: stretch;
    }

    label {
      min-width: 0;
      width: 100%;
    }

    select,
    .btn {
      width: 100%;
      min-height: 44px;
    }

    .actions {
      margin-left: 0;
      width: 100%;
      flex-direction: column;
    }

    .tooltip .tooltiptext {
      width: min(200px, 70vw);
      max-width: min(200px, 70vw);
    }
  }
</style>
