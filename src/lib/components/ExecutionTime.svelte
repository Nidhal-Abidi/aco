<script lang="ts">
    export let timeSpent = 0;
    $: formattedTime = timeSpent.toFixed(2)
</script>

<div class="time-display">
    <span class="label">Execution time</span>
    <span class="time">{formattedTime}</span>
    <span class="unit">ms</span>
</div>

<style>
    .time-display {
        display: inline-flex;
        align-items: baseline;
        gap: 0.35rem;
        white-space: nowrap;
    }

    .label {
        font-size: 0.75rem;
        font-weight: 650;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--muted);
    }

    .time {
        font-family: var(--mono);
        font-size: 0.95rem;
        font-weight: 600;
        color: var(--text);
    }

    .unit {
        font-family: var(--mono);
        font-size: 0.75rem;
        color: var(--muted);
    }
</style>
