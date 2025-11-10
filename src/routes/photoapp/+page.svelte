<script>
	//import kawaiiRikard from '$lib/assets/Kawaii_rikard.png';
</script>

<div class="photos">
	<img src="https://i.redd.it/rofzm44oka091.png" alt="Flexbox egenskaper" />
	<img src="https://placebear.com/300/200" alt="Björn" />
	<img src="https://picsum.photos/300/200" alt="Slumpmässig bild" />
</div>

<style>
	.photos {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
		padding: 1rem;
		background-color: #f8f8f8;
	}

	img {
		width: 300px;
		height: 400px;
		object-fit: cover;
		border-radius: 8px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	img:hover {
		transform: scale(1.05);
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
	}
</style>
