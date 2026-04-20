<script>
    import { onMount } from 'svelte';
	const pad2 = (n) => String(n).padStart(2, '0');

	let title = 'Enter your birthday';

	let dayWheel = makeWheel(1, 31, 9);
	let monthWheel = makeWheel(1, 12, 9);
	let yearWheel = makeWheel(1950, 2026, 9);

	let selectedDay = null;
	let selectedMonth = null;
	let selectedYear = null;

	let log = [];

	function makeWheel(min, max, size = 9) {
		const center = Math.floor(Math.random() * (max - min + 1)) + min;
		const half = Math.floor(size / 2);
		const items = [];
		for (let i = -half; i <= half; i++) items.push(clampWrap(center + i, min, max));
		return { min, max, size, offset: 0, items };
	}

	function clampWrap(v, min, max) {
		const range = max - min + 1;
		let x = (v - min) % range;
		if (x < 0) x += range;
		return min + x;
	}

	function rotate(wheel, dir) {
		wheel.offset += dir;

		if (dir > 0) {
			const first = wheel.items.shift();
			wheel.items.push(clampWrap(first + wheel.size, wheel.min, wheel.max));
		} else {
			const last = wheel.items.pop();
			wheel.items.unshift(clampWrap(last - wheel.size, wheel.min, wheel.max));
		}
	}

	function pick(which, value) {
		if (which === 'day') selectedDay = value;
		if (which === 'month') selectedMonth = value;
		if (which === 'year') selectedYear = value;

		log.unshift(`You chose ${which}: ${value}`);
		log = log.slice(0, 6);
	}

	function submit(which) {
		if (which === 'day') log.unshift(`SUBMIT day = ${selectedDay ?? 'INGET'}`);
		if (which === 'month') log.unshift(`SUBMIT month = ${selectedMonth ?? 'INGET'}`);
		if (which === 'year') log.unshift(`SUBMIT year = ${selectedYear ?? 'INGET'}`);
		log = log.slice(0, 8);
	}

	function submitAll() {
		const nice =
			`${selectedYear ?? '????'}-` +
			`${selectedMonth ? pad2(selectedMonth) : '??'}-` +
			`${selectedDay ? pad2(selectedDay) : '??'}`;

		log.unshift(`Submitted birthday: ${nice}`);
		log = log.slice(0, 10);
	}

    	onMount(() => {
		
		const timers = [
			setInterval(() => rotate(dayWheel, Math.random() > 0.5 ? 1 : -1), 600),
			setInterval(() => rotate(monthWheel, 1), 450),
			setInterval(() => rotate(yearWheel, -1), 520)
		];

		return () => timers.forEach(clearInterval);
	});

</script>

<div class="badui">
	<header>
		<input class="title" bind:value={title} />
	</header>


	<section class="row">
		<div class="picker">
			<div class="label">day</div>

			<div class="circle">
				<button class="arrow left" on:click={() => rotate(dayWheel, -1)} aria-label="day left">add</button>

				<div class="wheel">
					{#each dayWheel.items as n, i}
						<button
							class="num {i === Math.floor(dayWheel.size / 2) ? 'center' : ''} {selectedDay === n ? 'picked' : ''}"
							on:click={() => pick('day', n)}
						>
							{n}
						</button>
					{/each}
				</div>

				<button class="arrow right" on:click={() => rotate(dayWheel, +1)} aria-label="day right">take</button>
			</div>

			<button class="submit" on:click={() => submit('day')}>Submit</button>
		</div>

		<div class="picker">
			<div class="label">month</div>

			<div class="circle">
				<button class="arrow left" on:click={() => rotate(monthWheel, -1)} aria-label="month left">add</button>

				<div class="wheel">
					{#each monthWheel.items as n, i}
						<button
							class="num {i === Math.floor(monthWheel.size / 2) ? 'center' : ''} {selectedMonth === n ? 'picked' : ''}"
							on:click={() => pick('month', n)}
						>
							{n}
						</button>
					{/each}
				</div>

				<button class="arrow right" on:click={() => rotate(monthWheel, +1)} aria-label="month right">take</button>
			</div>

			<button class="submit" on:click={() => submit('month')}>Submit</button>
		</div>

		<div class="picker">
			<div class="label">year</div>

			<div class="circle big">
				<button class="arrow left" on:click={() => rotate(yearWheel, -1)} aria-label="year left">add</button>

				<div class="wheel">
					{#each yearWheel.items as n, i}
						<button
							class="num {i === Math.floor(yearWheel.size / 2) ? 'center' : ''} {selectedYear === n ? 'picked' : ''}"
							on:click={() => pick('year', n)}
						>
							{n}
						</button>
					{/each}
				</div>

				<button class="arrow right" on:click={() => rotate(yearWheel, +1)} aria-label="year right">take</button>
			</div>

			<button class="submit" on:click={() => submit('year')}>Submit</button>
		</div>
	</section>

	<section class="mega">
		<div class="summary">
			<strong>Valt:</strong>
			<span>{selectedDay ?? 'day?'}</span>
			<span> / </span>
			<span>{selectedMonth ?? 'month?'}</span>
			<span> / </span>
			<span>{selectedYear ?? 'year?'}</span>
		</div>

		<button class="submit megaSubmit" on:click={submitAll}>Submit</button>
	</section>

	<aside class="notes">
		<div class="noteTitle">Resultat</div>
		{#if log.length}
			<ul>
				{#each log as line}
					<li>{line}</li>
				{/each}
			</ul>
		{/if}
	</aside>
</div>

<style>
	.badui {
	min-height: 100vh;
	padding: 18px;
	font-family: ui-monospace, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
	background: linear-gradient(135deg, #f7f7f7 0%, #e7e7ff 33%, #fff2f2 100%);
	color: #141414;
}


	header {
  display: grid;
  gap: 6px;
  max-width: 520px;
  margin-bottom: 28px; /* <-- mer space ner till day/month/year */
}



	input.title {
		border: 3px dashed #000;
		background: #fff;
		padding: 10px 12px;
		font-size: 18px;
		transform: rotate(-1deg);
		box-shadow: 6px 6px 0 #000;
	}

	h2 {
		margin: 20px 0 14px;
		letter-spacing: 1px;
		text-transform: lowercase;
	}

	.row {
		display: flex;
		gap: 18px;
		flex-wrap: wrap;
		align-items: flex-start;
	}

	.picker {
		width: 240px;
		padding: 12px;
		border: 2px solid #000;
		background: rgba(255, 255, 255, 0.7);
		transform: rotate(0.6deg);
	}

	.picker:nth-child(2) {
		transform: rotate(-0.9deg);
	}

	.picker:nth-child(3) {
		transform: rotate(1.2deg);
	}

	.label {
		font-weight: 900;
		margin-bottom: 8px;
	}

	.circle {
		position: relative;
		border: 4px solid #000;
		border-radius: 999px;
		padding: 10px;
		background: #ff1111;
	}

	.circle.big {
		background: #ff1111;
	}

	.wheel {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 6px;
		margin: 0 44px; /* plats för pilarna */
	}

	.num {
		border: 2px solid #000;
		background: #fff;
		padding: 10px 0;
		cursor: pointer;
		font-size: 16px;
		user-select: none;
		transform: rotate(-2deg);
	}

	.num.center {
		font-size: 18px;
		background: #000;
		color: #fff;
		transform: rotate(3deg) scale(1.03);
	}

	.num.picked {
		outline: 4px dotted hotpink;
	}

	.arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		border: 2px solid #000;
		background: #fffb;
		padding: 8px 10px;
		cursor: pointer;
		font-weight: 800;
	}

	.arrow.left {
		left: 8px;
	}

	.arrow.right {
		right: 8px;
	}

	.submit {
		margin-top: 10px;
		width: 100%;
		border: 3px solid #000;
		background: #fff;
		padding: 10px;
		cursor: pointer;
		box-shadow: 4px 4px 0 #000;
	}

	.mega {
		margin-top: 16px;
		display: flex;
		gap: 12px;
		align-items: center;
		flex-wrap: wrap;
		padding: 12px;
		border: 2px solid #000;
		background: #fff;
	}

	.summary span {
		display: inline-block;
		min-width: 54px;
		text-align: center;
		padding: 2px 6px;
		border: 2px dotted #000;
		background: #fffd;
	}

	.megaSubmit {
		width: auto;
		padding: 10px 16px;
	}

	.notes {
		margin-top: 18px;
		padding: 12px;
		border: 2px dashed #000;
		background: #fff;
		max-width: 780px;
	}

	.noteTitle {
		font-weight: 900;
		margin-bottom: 8px;
	}

	ul {
		margin: 0;
		padding-left: 18px;
	}

	li {
		margin: 4px 0;
	}
</style>
