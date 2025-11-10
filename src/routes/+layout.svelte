<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	import { base } from '$app/paths';
</script>

<nav class="flex-container">
	<a href="{base}/">Hem</a>
	<a href="{base}/photoapp">Photo App</a>
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
</style>

{@render children?.()}
