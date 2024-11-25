<script>
    import { page } from "$app/stores";
</script>

<main>
    <h1>{$page.status}</h1>
    <span class="line"></span>
    <h2>{$page.error.message}</h2>
</main>

<style>
    main {
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        justify-content: center;
        align-items: center;
    }
    span.line {
        width: 0; height: 30px;
        border: 1px solid gray;
    }
</style>