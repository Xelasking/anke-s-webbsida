<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	import { base } from '$app/paths';
</script>

<nav class="flex-container">
	<a href="{base}/">Hem</a>
	<a href="{base}/photoapp">Photo App</a>
	<a href="{base}/register">Register</a>
	<a href="{base}/shoppinglist">Shopping list</a>
	<a href="{base}/memory">Memory</a>
	<a href="{base}/chat">Chat</a>
	<a href="{base}/search">Search</a>
	<a href="{base}/project1">Project 1</a>
	<a href="{base}/project2">Project 2</a>
	<a href="{base}/marketpoly">Market Poly</a>
</nav>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<style>
	a {
		text-decoration: none;
		color: black;
		font-weight: bold;
	}

	a:hover {
		color: darkblue;
	}
	
:global(body), :global(html){
  margin: 0%;
  padding: 0%;
  height: 100vh;
  width: 100vw;
}    

</style>

{@render children?.()}
