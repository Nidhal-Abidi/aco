<script lang="ts">
    export let timeSpent = 0;
</script>

<div class="time-display-wrapper">
    <div class="time-display">
        <span class="time">Execution Time: {timeSpent}</span>
        <span class="unit">ms</span>
    </div>
</div>

<style>
    .time-display-wrapper{
        width: 100%;
        display: flex;
        justify-content: center;
        padding:0.5rem 0;
        background: transparent;
    }
    .time-display{
        display: inline-flex;
        align-items: baseline;
        background: #f3f4f6;
        padding:0.25rem 0.5rem;
        border-radius: .25rem;
        font-family: monospace;
    }
    .time{
        font-size: .875rem;
        font-weight:600;
        color: #374151;
    }
    .unit{
        margin-left: .25rem;
        font-size: .75rem;
        color: #6b7280;
    }
    @media(max-width:768px){
        .time-display-wrapper{
            padding: .25rem 0;
        }
    }
</style>