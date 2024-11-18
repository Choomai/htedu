<script>
    export let data;
</script>

<main>
    <h1>Welcome to SvelteKit</h1>
    <p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
    <p>{#if data.auth}
        cmm
        <a href="/del-data">del session</a>
    {:else}
        cc
        <a href="/set-data">set session</a>
    {/if}
    </p>
</main>
