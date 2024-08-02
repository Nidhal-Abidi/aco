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
    Travel Map Selector
    <select name="nbr-of-cities" id="nbr-of-cities" bind:value={nbrOfCities}>
      <option value="5">Small Town</option>
      <option value="7">Medium Town</option>
      <option value="10" selected>Large Town</option>
      <option value="15">Metropolis</option>
    </select>
  </label>

  <label>
    ACO mode
    <select name="aco-mode" id="aco-mode" bind:value={acoMode}>
      <option value="as" selected>Ant System</option>
      <option value="elitist">Elitist Ant System</option>
      <option value="max-min-as">Max-Min Ant System</option>
    </select>
  </label>

  {#if showElitistWeight}
    <label>
      Elitist Weight
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
    Colony Size
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
    Iterations number
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
    Alpha
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
    Beta
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
    Rho
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

  <label>
    Initial Pheromone
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

  <label>
    Speed
    <select name="speed" id="speed" bind:value={speed}>
      <option value="500">Slow</option>
      <option value="150" selected>Normal</option>
      <option value="50">fast</option>
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
    font-size: 1rem;
    border: 1px solid dimgray;
    line-height: 1.5;
    padding: 0.25rem;
    border-radius: 0.2rem;
    cursor: pointer;
  }
  .btn {
    border: 2px solid #04aa6d;
    background-color: white;
    border-radius: 0.5rem;
    cursor: pointer;
    transition-duration: 0.4s;
  }

  .btn:hover {
    background-color: #04aa6d;
    color: white;
  }

  .btn-reset {
    border-color: #008cba;
  }

  .btn-reset:hover {
    background-color: #008cba;
    color: white;
  }
</style>
