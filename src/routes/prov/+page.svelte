<script>
  let showEvenOnly = false;

  const colors = [
    "#ff0000",
    "#0000FF",
    "#008000",
    "#FFFF00",
    "#800080",
    "#FFA500"
  ];

  const numberedCells = colors.map((c, i) => ({
    color: c,
    number: i + 1
  }));

  $: visibleCells = showEvenOnly
    ? numberedCells.filter(c => c.number % 2 === 0)
    : numberedCells;
</script>

<label>
  <input type="checkbox" bind:checked={showEvenOnly} />
  Visa bara jämna nummer
</label>

<div class="grid {showEvenOnly ? 'even-expanded' : ''}">
  {#each visibleCells as cell}
    <div 
      class="cell {showEvenOnly ? 'expanded' : ''}" 
      style="background-color: {cell.color};"
    >
      {cell.number}
    </div>
  {/each}
</div>

<style>
  label {
    display: block;
    margin-bottom: 12px;
    font-size: 18px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 150px);
    grid-template-rows: repeat(2, 150px);
    gap: 10px;
    transition: all 0.2s ease;
  }

  .grid.even-expanded {
    grid-template-rows: repeat(2, 150px);
  }

  .cell {
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: #222;
    transition: transform 0.15s ease, box-shadow 0.15s ease, grid-row 0.2s;
  }

  .expanded {
    grid-row: span 2;
  }

  .cell:hover {
    transform: scale(1.08);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }
</style>
