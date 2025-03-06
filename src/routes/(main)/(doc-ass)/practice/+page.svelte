<script>
    import { getContext } from "svelte";
    import Card from "/src/components/card.svelte";

    const items = getContext("doc-ass");
</script>

<main>
    {#if $items.length == 0}
        <h2>Không có đề</h2>
    {/if}
    {#each $items as ass}
        <Card title={ass.title} url="/practice/{ass.uuid}" imgPath={ass.img_path} 
            username={ass.username} avatar={ass.avatar}/>
    {/each}
</main>

<style>
    main {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        gap: 1rem;
        justify-items: center;
    }
    main > h2 {
        grid-column: 1 / -1;
        text-align: center;
        margin-top: 1rem;
    }
</style>