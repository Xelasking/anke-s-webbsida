<script>
    let name = '';
    let email = '';
    let password = '';
    let favoriteColor = '#000000';

    function handleSubmit() {
        alert(`Välkommen!\nNamn: ${name}\nEmail: ${email}\nLösenord: ${password}\nFavoritfärg: ${favoriteColor}`);
    }
</script>

<main>
    <div class='container'>
        <h1>Registering</h1>
        <form on:submit|preventDefault={handleSubmit}>
            <label for="name">Namn:</label>
            <input type="text" id="name" bind:value={name}>

            <label for="password">Lösenord:</label>
            <input type="password" id="password" bind:value={password}>

            <label for="email">Email:</label>
            <input type="email" id="email" bind:value={email}>

            <label for="color">Välj favoritfärg:</label>
            <input type="color" id="color" bind:value={favoriteColor}>

            <input type="submit" value="Registrera">
        </form>
    </div>
</main>

<style>
    main {
        background-image: url("https://t4.ftcdn.net/jpg/05/21/65/59/360_F_521655929_N80d5GaCQJ2VP073PfTXJTe9mkvsNtHE.jpg");
        background-size: cover;
        width: 100%;
        height: 100vh;
        padding: 0%;
    }

    .container {
        border: solid 5px rosybrown;
        border-radius: 10px;
        width: 30%;
        background-color: #dfa1e4;
        margin: 50px auto;
        padding: 20px;
    }

    label, input {
        display: block;
        margin: 10px 0;
    }

    input[type="submit"] {
        margin-top: 20px;
        padding: 10px;
        background-color: rosybrown;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        color: white;
        font-weight: bold;
    }
</style>
