<label>
  ACO mode
  <select name="aco-mode" id="aco-mode">
    <option value="aco">Ant Colony System</option>
    <option value="max-min-as">Max-Min Ant System</option>
    <option value="elitist">Elitist</option>
  </select>
</label>

<label>
  Colony Size
  <select name="colony-size" id="colony-size">
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
  <select name="nbr-iterations" id="nbr-iterations">
    <option value="50">50</option>
    <option value="100">100</option>
    <option value="200" selected>200</option>
    <option value="300">300</option>
    <option value="500">500</option>
  </select>
</label>

<label>
  Alpha
  <select name="alpha" id="alpha">
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
  <select name="beta" id="beta">
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
  <select name="rho" id="rho">
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
  <select name="initial-pheromone" id="initial-pheromone">
    <option value="0">0</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="5">5</option>
    <option value="10">10</option>
    <option value="20">20</option>
    <option value="50">50</option>
  </select>
</label>

<label>
  Speed
  <select name="speed" id="speed">
    <option value="slow">Slow</option>
    <option value="normal">Normal</option>
    <option value="fast">fast</option>
  </select>
</label>

<label>
  Sound
  <select name="sound" id="sound">
    <option value="on">On</option>
    <option value="off">Off</option>
  </select>
</label>

<button>Start Animation</button>
<button>Reset Animation</button>

<style>
  label {
    font-size: 1rem;
  }
  select,
  button {
    font-size: 1rem;
    border: 1px solid dimgray;
    line-height: 1.5;
    padding: 0.5rem;
    border-radius: 0.2rem;
  }
</style>
