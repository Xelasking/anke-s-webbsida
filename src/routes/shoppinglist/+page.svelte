<script>
  let items = [];
  let newItem = '';

  function addItem() {
    if (newItem.trim() !== '') {
      items.push({ text: newItem.trim(), bought: false });
      items = items;  // trigger reaktivitet
      newItem = '';
    }
  }

  function toggleBought(index) {
    items[index].bought = !items[index].bought;
    items = items; // trigger reaktivitet
  }

  function removeItem(index) {
    items.splice(index, 1);
    items = items; // trigger UI uppdatering
  }
</script>

<main>
  <h1>Shoppinglista</h1>

  <div class="add-item">
    <input
      type="text"
      bind:value={newItem}
      placeholder="Lägg till vara"
      on:keydown={(e) => e.key === 'Enter' && addItem()}
    />
    <button on:click={addItem}>Lägg till</button>
  </div>

  <div class="row">
    <h2>Att köpa</h2>
    {#if items.filter(i => !i.bought).length === 0}
      <p>(Inga varor)</p>
    {:else}
      <ul>
        {#each items as item, index (index)}
          {#if !item.bought}
            <li>
              {item.text}
              <button on:click={() => toggleBought(index)}>Köpt</button>
              <button on:click={() => removeItem(index)}>Ta bort</button>
            </li>
          {/if}
        {/each}
      </ul>
    {/if}
  </div>

  <div class="row">
    <h2>Köpta varor</h2>
    {#if items.filter(i => i.bought).length === 0}
      <p>(Inga köpta varor)</p>
    {:else}
      <ul>
        {#each items as item, index (index)}
          {#if item.bought}
            <li>
              {item.text}
              <button on:click={() => toggleBought(index)}>Ångra</button>
              <button on:click={() => removeItem(index)}>Ta bort</button>
            </li>
          {/if}
        {/each}
      </ul>
    {/if}
  </div>
</main>

<style>
  main {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
    font-family: sans-serif;
  }

  .add-item {
    display: flex;
    margin-bottom: 1rem;
  }

  .add-item input {
    flex: 1;
    padding: 0.5rem;
    margin-right: 0.5rem;
  }

  .row {
    border: 2px solid #ccc;
    background: #f9f9f9;
    padding: 1rem;
    border-radius: 6px;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.3rem;
  }
</style>
