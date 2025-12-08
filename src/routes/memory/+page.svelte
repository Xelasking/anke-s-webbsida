<!-- src/routes/memory/+page.svelte -->
<script>
  export let data; // Data kommer från +page.server.js eller +page.js

  // Om du istället vill hämta på klienten:
  // let items = [];
  // let loading = true;
  // onMount(async () => {
  //   const res = await fetch('/api/memory');
  //   items = await res.json();
  //   loading = false;
  // });
</script>

<svelte:head>
  <title>Memory</title>
</svelte:head>

<main>
  <h1>Memory</h1>
  
  {#if data?.items}
    <ul>
      {#each data.items as item}
        <li>{item.title} — {item.description}</li>
      {/each}
    </ul>
  {:else}
    <p>Inga sparade minnen.</p>
  {/if}
</main>

<style>
  main {
    padding: 1rem;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #ccc;
  }
</style>
