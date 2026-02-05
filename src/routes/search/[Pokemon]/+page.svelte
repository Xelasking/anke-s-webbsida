
<script>
  /** @type {import('./$types').PageData} */
  export let data;
</script>

{#await data}
  <p>.. waiting</p>
{:then pokemon} 
<article>
  {#each Object.entries(pokemon.response.sprites) as sprites}
    {#if typeof sprites[1] == "string"}
    <img src={sprites[1]} alt="" />
    {/if}
  {/each}
</article>
<h1>{pokemon.response.name}</h1>
<section>

</section>

{/await}  


  