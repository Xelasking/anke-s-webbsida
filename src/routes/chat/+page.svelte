<script>
	import ElizaBot from 'elizabot';
	import { enhance } from '$app/forms';
	import { tick } from 'svelte';

	const eliza = new ElizaBot();

	let chat = $state([{ user: 'Eliza', message: eliza.getInitial(), time: now() }]);
	let message = $state('');

	let typing = $state(false);

	let messagesEl;

	function now() {
		const d = new Date();
		return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}

	async function scrollToBottom() {
		await tick();
		if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight;
	}

	async function write(text) {
		const trimmed = (text ?? '').trim();
		if (!trimmed) return;

		// 1) Lägg in user-meddelandet
		chat = [...chat, { user: 'User', message: trimmed, time: now() }];
		await scrollToBottom();

		// 2) Visa typing bubble
		typing = true;
		await scrollToBottom();

		// 3) Vänta lite (1–2s-ish)
		await new Promise((r) => setTimeout(r, 1000 + Math.random() * 1000));

		// 4) Lägg in Elizas svar
		const reply = eliza.transform(trimmed);
		typing = false;
		chat = [...chat, { user: 'Eliza', message: reply, time: now() }];
		await scrollToBottom();
	}
</script>

<main class="chat">
	<section class="messages" bind:this={messagesEl}>
		{#each chat as msg}
			<article class:me={msg.user === 'User'} class:bot={msg.user === 'Eliza'}>
				<div class="meta">
					<span class="name">{msg.user}</span>
					<span class="time">{msg.time}</span>
				</div>
				<p class="bubble">{msg.message}</p>
			</article>
		{/each}

		{#if typing}
			<article id="visible" class="bot typing">
				<div class="meta">
					<span class="name">Eliza</span>
					<span class="time">{now()}</span>
				</div>

				<div class="bubble typing-bubble">
					<span class="circle"></span>
					<span class="circle"></span>
					<span class="circle"></span>
				</div>
			</article>
		{/if}
	</section>

	<form
		class="composer"
		method="post"
		use:enhance={({ formData, formElement, cancel }) => {
			cancel(); // skicka inte till servern

			const text = formData.get('text');
			write(text);

			// resetta + rensa input
			formElement.reset();
			message = '';
		}}
	>
		<input
			id="text"
			name="text"
			type="text"
			required
			placeholder="Skriv ett meddelande..."
			bind:value={message}
		/>
	</form>
</main>

<style>
	main.chat {
		width: min(520px, 90vw);
		height: min(680px, 80vh);
		margin: 0 auto;
		padding: 14px;
		border-radius: 18px;
		background: #5a8c96;
		display: grid;
		grid-template-rows: 1fr auto;
		gap: 10px;
	}

	section.messages {
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 6px;
	}

	article {
		display: flex;
		flex-direction: column;
		max-width: 80%;
		gap: 6px;
	}

	article.bot {
		align-self: flex-start;
	}

	article.me {
		align-self: flex-end;
		text-align: right;
	}

	.meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		opacity: 0.85;
		font-size: 12px;
	}

	article.me .meta {
		justify-content: flex-end;
		gap: 8px;
	}

	.name {
		font-weight: 600;
	}

	.time {
		font-variant-numeric: tabular-nums;
	}

	.bubble {
		margin: 0;
		padding: 12px 14px;
		border-radius: 14px;
		line-height: 1.3;
	}

	article.bot .bubble {
		background: #4b6f76;
		color: white;
		border-top-left-radius: 6px;
	}

	article.me .bubble {
		background: #2f3f44;
		color: white;
		border-top-right-radius: 6px;
	}

	form.composer {
		display: flex;
		align-items: center;
	}

	form.composer input {
		width: 100%;
		padding: 12px 14px;
		border-radius: 12px;
		border: 0;
		outline: none;
		background: rgba(0, 0, 0, 0.25);
		color: white;
	}

	form.composer input::placeholder {
		color: rgba(255, 255, 255, 0.7);
	}

	/* Typing bubble */
	.typing-bubble {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		width: 110px;
		padding: 14px;
	}

	.circle {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.85);
		animation: typing 1000ms ease-in-out infinite;
	}

	.circle:nth-child(1) {
		animation-delay: 0ms;
	}
	.circle:nth-child(2) {
		animation-delay: 333ms;
	}
	.circle:nth-child(3) {
		animation-delay: 666ms;
	}

	@keyframes typing {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.4);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
