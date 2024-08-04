<script>
  export let progress = 0
  export let isVisible = true
</script>

{#if isVisible}
  <div class="overlay">
    <div class="content">
      <div class="spinner"></div>
      <p>Calculating... {progress.toFixed(2)}%</p>
      <progress value={progress} max="100"></progress>
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .content {
    background-color: white;
    padding: 5rem;
    border-radius: 5px;
    text-align: center;
    font-size: 1.5rem;
    color: gray;
  }

  .spinner {
    border: 1rem solid gray;
    border-top: 1rem solid #3498db;
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
    animation: spin 1s linear infinite;
    margin: 0 auto 2rem;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  progress {
    width: 100%;
    margin-top: 10px;
  }
</style>
