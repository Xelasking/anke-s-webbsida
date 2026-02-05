<script>
	// Importera goto-funktionen för att navigera mellan sidor
	import { goto } from '$app/navigation';

	// Funktion som hanterar formulärets submit-händelse
	function handleSubmit(e) {
		// Förhindra att sidan laddas om
		e.preventDefault();

		// Skapa FormData från formuläret
		const formData = new FormData(e.target);

		// Hämta värdet från input-fältet
		const search = formData.get('search');

		// Navigera till /search/[pokemon]
		goto('/search/' + search);
	}
</script>

<div class="backdrop"></div>

<main>

	<form on:submit={handleSubmit}>
		<input
			type="text"
			name="search"
			placeholder="Sök upp en pokemon"
		/>
	</form>

	<slot />
</main>

<style>
	main {
		width: 80vw;
		height: 100vh;
		background: rgba(255, 255, 255, 0.8);
		margin: 5vh auto;
		border-radius: 16px;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	.backdrop {
		width: 100vw;
		height: 100vh;
		background-image: url(https://imageio.forbes.com/specials-images/imageserve/604202ff091b6539cb90fcbc/The-backs-of-a-number-of-Pok-mon-cards-/960x0.jpg?format=jpg&width=960);
		background-size: cover;
		background-position: center;

		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;

		filter: blur(5px);
	}

	input {
		padding: 0.75rem 1rem;
		font-size: 1.1rem;
		border-radius: 8px;
		border: 2px solid #ccc;
		width: 250px;
		outline: none;
	}

	input:focus {
		border-color: #ffcb05;
		box-shadow: 0 0 8px rgba(255, 203, 5, 0.6);
	}
</style>
