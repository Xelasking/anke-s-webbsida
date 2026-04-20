<script>
  import { tick } from "svelte";
  import Chart from "chart.js/auto";

  const API_KEY = "JL6BQ6KUOQ00Z4K0x"; 

  let query = "";
  let results = [];
  let selectedSymbol = null;

  let chartCanvas;
  let chartInstance;

  async function searchCompany() {
    if (!query) return;

    const res = await fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${API_KEY}`
    );

    const data = await res.json();


    results = (data.bestMatches || []).filter(
      r => r["4. region"] === "United States"
    );
  }

  async function selectCompany(symbol) {
    selectedSymbol = symbol;

    const res = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
    );

    const data = await res.json();

    const series = data["Time Series (Daily)"];

    if (!series) {
      alert("Stock data unavailable");
      return;
    }

    const labels = Object.keys(series).reverse();
    const prices = labels.map(d => parseFloat(series[d]["4. close"]));

    await tick();

    renderChart(labels, prices);
  }

  function renderChart(labels, prices) {
    if (chartInstance) chartInstance.destroy();

    const ctx = chartCanvas.getContext("2d");

    chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: `${selectedSymbol} price`,
            data: prices,
            borderColor: "blue",
            fill: false,
            tension: 0.2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
</script>

<main>
  <h2>Stock search</h2>

  <form on:submit|preventDefault={searchCompany}>
    <input
      placeholder="Search for stocks"
      bind:value={query}
    />
  </form>

  <ul>
    {#each results as company}
      <li>
        <button on:click={() => selectCompany(company["1. symbol"])}>
          {company["2. name"]} — {company["1. symbol"]}
        </button>
      </li>
    {/each}
  </ul>

  {#if selectedSymbol}
    <h3>{selectedSymbol} Price Chart</h3>

    <div class="chart">
      <canvas bind:this={chartCanvas}></canvas>
    </div>
  {/if}
</main>

<style>
main {
  max-width: 800px;
  margin: auto;
  font-family: sans-serif;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
}

ul {
  list-style: none;
  padding: 0;
}

button {
  background: none;
  border: none;
  color: blue;
  cursor: pointer;
  padding: 5px;
}

.chart {
  height: 400px;
  margin-top: 20px;
}
</style>