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
    background-color: rgba(15, 23, 42, 0.45);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .content {
    width: min(22rem, calc(100% - 2rem));
    background: var(--surface);
    padding: 1.75rem 1.5rem;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: 0 16px 40px rgba(15, 23, 42, 0.18);
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text);
  }

  .spinner {
    border: 0.35rem solid var(--border);
    border-top: 0.35rem solid var(--accent);
    border-radius: 50%;
    width: 2.75rem;
    height: 2.75rem;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
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
    height: 0.45rem;
    margin-top: 0.85rem;
    accent-color: var(--accent);
  }
</style>
