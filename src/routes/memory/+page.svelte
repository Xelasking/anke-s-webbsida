<script>
  let bluePoints = 0;
  let redPoints = 0;
  let blueTurn = true;

  let flipCount = 0;
  let firstCard = null;
  let secondCard = null;

  function createCards() {
    const values = [1, 2, 3, 4, 5, 6];
    const pairs = [...values, ...values];

    return pairs
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        flipped: false,
        matched: false
      }));
  }

  let cards = createCards();

  // Avledda värden
  $: allMatched = cards.every((c) => c.matched);
  $: winner =
    allMatched
      ? bluePoints === redPoints
        ? "Oavgjort"
        : bluePoints > redPoints
          ? "Blå vann"
          : "Röd vann"
      : null;

  function flip(card) {
    if (card.flipped || card.matched || flipCount === 2 || allMatched) return;

    card.flipped = true;
    flipCount += 1;
    cards = [...cards];

    if (flipCount === 1) {
      firstCard = card;
      return;
    }

    secondCard = card;

    if (firstCard.value === secondCard.value) {
      firstCard.matched = true;
      secondCard.matched = true;

      if (blueTurn) bluePoints += 1;
      else redPoints += 1;

      resetTurn();
      cards = [...cards];
    } else {
      setTimeout(() => {
        cards = cards.map((c) => ({
          ...c,
          flipped: c.matched
        }));
        resetTurn(true);
      }, 1000);
    }
  }

  function resetTurn(changeTurn = false) {
    flipCount = 0;
    firstCard = null;
    secondCard = null;
    if (changeTurn) blueTurn = !blueTurn;
  }

  function restartGame() {
    bluePoints = 0;
    redPoints = 0;
    blueTurn = true;
    resetTurn(false);
    cards = createCards();
  }
</script>

<h1>Memory</h1>

<div class="topbar">
  <button on:click={restartGame}>Starta om</button>

  {#if winner}
    <div class="winner">{winner}</div>
  {:else}
    <div class="status">
      Tur: <span class:blueText={blueTurn} class:redText={!blueTurn}>
        {blueTurn ? "Blå" : "Röd"}
      </span>
    </div>
  {/if}
</div>

<main>
  {#each cards as card (card.id)}
    <div
      class="card"
      class:flipped={card.flipped}
      class:matched={card.matched}
      on:click={() => flip(card)}
      aria-disabled={allMatched}
    >
      <div class="front">{card.value}</div>

      <img class="back" src="/card-back.jpg" alt="Kortets baksida" />
    </div>
  {/each}
</main>

<aside class="box blue"><p>{bluePoints}</p></aside>
<aside class="box"><p>{redPoints}</p></aside>
<aside class="turn" class:blue={blueTurn}></aside>

<style>
  h1 { text-align: center; }

  .topbar {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin: 10px 0 16px;
  }

  button {
    padding: 8px 12px;
    border: 1px solid #222;
    background: white;
    cursor: pointer;
  }

  .status { font-size: 18px; }
  .blueText { color: blue; font-weight: bold; }
  .redText { color: red; font-weight: bold; }

  .winner {
    font-size: 20px;
    padding: 6px 10px;
    border: 2px solid #222;
    background: #fff;
  }

  main {
    display: grid;
    grid-template-columns: repeat(4, 100px);
    grid-template-rows: repeat(3, 100px);
    gap: 10px;
    justify-content: center;
  }

  .card {
    width: 100px;
    height: 100px;
    border: 1px solid black;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.5s;
    cursor: pointer;
  }

  .card.flipped { transform: rotateY(180deg); }

  .front,
  .back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .front {
    transform: rotateY(180deg);
    font-size: 40px;
    font-weight: bold;
    background-color: white;
  }

  .back { object-fit: cover; }

  .card:not(.flipped):hover { transform: scale(1.1); }

  /* valfritt: lite markering på matchade kort */
  .card.matched {
    outline: 3px solid #5a5;
    outline-offset: 2px;
  }

  .box {
    width: 100px;
    height: 100px;
    position: fixed;
    bottom: 10px;
    right: 10px;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .box.blue {
    background-color: blue;
    left: 10px;
    right: auto;
  }

  .turn {
    width: 100px;
    height: 100px;
    position: fixed;
    bottom: 10px;
    right: 10px;
    box-shadow: 0 0 10px 10px yellowgreen;
    z-index: -1;
  }

  .turn.blue {
    left: 10px;
    right: auto;
  }

  p {
    font-size: 30px;
    color: white;
  }
</style>
