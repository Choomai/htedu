<script>
    import { getContext } from "svelte";
    import Card from "/src/components/card.svelte";
    
    const items = getContext("doc-ass");
</script>

<main>
    {#if $items.length == 0}
        <h2>Không có tài liệu</h2>
    {/if}
    {#each $items as doc}
        <Card title={doc.name} url="/practice/{doc.uuid}" imgPath={doc.img_path} 
            username={doc.username} avatar={doc.avatar}/>
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