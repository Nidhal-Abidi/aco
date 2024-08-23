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
      Travel Map Selector
      <span class="tooltiptext">Choose a map size (number of cities)</span>
    </span>
    <select name="nbr-of-cities" id="nbr-of-cities" bind:value={nbrOfCities}>
      <option value="5">Small Town</option>
      <option value="7">Medium Town</option>
      <option value="10" selected>Large Town</option>
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
        <option value="0.1" selected>0.1</option>
        <option value="0.5">0.5</option>
        <option value="1">1</option>
        <option value="2" selected>2</option>
        <option value="5">5</option>
        <option value="10">10</option>
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
      <option value="30" selected>30</option>
      <option value="50">50</option>
      <option value="100">100</option>
      <option value="200">200</option>
    </select>
  </label>

  <label>
    <span class="tooltip">
      Iterations number
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
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3" selected>3</option>
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
      >Rho
      <span class="tooltiptext">Pheromone evaporation rate (0-0.75).</span>
    </span>

    <select name="rho" id="rho" bind:value={rho}>
      <option value="0">0</option>
      <option value="0.001">0.001</option>
      <option value="0.01">0.01</option>
      <option value="0.05">0.05</option>
      <option value="0.1" selected>0.1</option>
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
          >Starting pheromone amount on edges (not for Max-Min AS).</span
        >
      </span>

      <select
        name="initial-pheromone"
        id="initial-pheromone"
        bind:value={initialPheromone}
      >
        <option value="0">0</option>
        <option value="1" selected>1</option>
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
      <option value="150" selected>Normal</option>
      <option value="50">Fast</option>
    </select>
  </label>

  <label>
    Sound
    <select name="sound" id="sound" bind:value={sound}>
      <option value="on" selected>On</option>
      <option value="off">Off</option>
    </select>
  </label>

  <button type="submit" id="start-animation" class="btn">Start Animation</button
  >
  <button
    type="button"
    id="reset-animation"
    class="btn btn-reset"
    on:click={resetAnimation}>Reset Animation</button
  >
</form>

<style>
  form {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0.5rem 0 0.5rem 0.5rem;
  }
  label {
    font-size: 1rem;
  }
  select,
  button {
    background-color: #fff8e7;
    font-size: 1rem;
    border: 1px solid dimgray;
    line-height: 1.5;
    padding: 0.25rem;
    border-radius: 0.2rem;
    cursor: pointer;
  }
  .btn {
    border: 2px solid #008cba;
    border-radius: 0.5rem;
    cursor: pointer;
    transition-duration: 0.4s;
  }

  .btn:hover {
    background-color: #008cba;
    color: white;
  }

  .btn-reset {
    border-color: #808080;
  }

  .btn-reset:hover {
    background-color: #808080;
    color: white;
  }
  .tooltip {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 180px;
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 5px 10px;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
    top: 125%; /* Position below the "Speed" text */
    left: 50%;
    transform: translateX(-20%);
    opacity: 0;
    transition: opacity 0.3s;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    white-space: wrap;
  }

  .tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: -5px; /* Arrow pointing up */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #333 transparent;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
</style>
