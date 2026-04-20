


<script>
	const boxSize = 500;
	const playerSize = 50;
	const letterSize = 45;

	let top = 200;
	let left = 200;

	let target = "CURLING";
	let progress = "";

	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

	const columns = 7;
	const gap = 15;

	// Centrera grid
	const totalWidth = columns * letterSize + (columns - 1) * gap;
	const startX = (boxSize - totalWidth) / 2;
	const startY = 40;

	let letters = alphabet.map((letter, index) => {
		let col = index % columns;
		let row = Math.floor(index / columns);

		return {
			char: letter,
			x: startX + col * (letterSize + gap),
			y: startY + row * (letterSize + gap),
			collected: false
		};
	});

	function onKeyDown(e) {
		switch (e.key.toLowerCase()) {
			case "w":
				if (top > 0) top -= 25;
				break;
			case "s":
				if (top < boxSize - playerSize) top += 25;
				break;
			case "a":
				if (left > 0) left -= 25;
				break;
			case "d":
				if (left < boxSize - playerSize) left += 25;
				break;
		}

		checkCollision();
	}
let showVideo = false;
	function checkCollision() {
	for (let letter of letters) {
		if (letter.collected) continue;
		let collision =
			left < letter.x + letterSize &&
			left + playerSize > letter.x &&
			top < letter.y + letterSize &&
			top + playerSize > letter.y;

		if (collision) {
			let expected = target[progress.length];

			if (letter.char === expected) {
				letter.collected = true;
				progress += letter.char;
				if (progress === target) {
					showVideo = true;
				}
			}
		}
	}
}
</script>

<style>
	main {
		width: 500px;
		height: 500px;
		border: 2px solid black;
		margin: auto;
		position: relative;
		background: #eee;
	}

	.player {
		width: 40px;
		height: 40px;
		background: darkred;
		position: absolute;
	}

	.letter {
		width: 40px;
		height: 40px;
		background: white;
		border: 1px solid black;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		font-weight: bold;
		font-size: 18px;
	}
	.video-container {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: rgba(0,0,0,0.8);
	padding: 10px;
	z-index: 999;
}
</style>

<h2 style="text-align:center;">Stava: {target}</h2>
<p style="text-align:center;">Progress: {progress}</p>

<main>
	<div class="player" style="left:{left}px; top:{top}px"></div>

	{#each letters as letter}
		{#if !letter.collected}
			<div
				class="letter"
				style="left:{letter.x}px; top:{letter.y}px"
			>
				{letter.char}
			</div>
		{/if}
	{/each}

	{#if showVideo}
	<div class="video-container">
		<iframe
			width="560"
			height="315"
			src="https://www.youtube.com/embed/rZJ-BrBOfaU?autoplay=1"
			title="YouTube video"
			allow="autoplay; encrypted-media"
			allowfullscreen
		></iframe>
	</div>
{/if}
</main>

<svelte:window on:keydown|preventDefault={onKeyDown} />