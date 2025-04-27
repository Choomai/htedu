<script>
    import { app_name } from "$lib/const";
    let { children } = $props();
</script>

<main>
    <h1 class="app-name">{app_name}</h1>
    {@render children()}
</main>

<style>
    main {
        padding: 0;
        gap: 0;
    }
    h1.app-name {
        width: 100%;
        margin: 0;
        margin-left: 10%;
        font-size: 1.5rem;
        padding: .5rem 0;
    }
</style>