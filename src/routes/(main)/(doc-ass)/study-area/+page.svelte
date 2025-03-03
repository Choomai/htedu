<script>
    import { getContext } from "svelte";
    import User from "/src/components/user.svelte";
    
    const items = getContext("doc-ass");
</script>

<main>
    {#if $items.length == 0}
        <h2>Không có tài liệu</h2>
    {/if}
    {#each $items as doc}
        <a class="normalize" href="/study-area/{doc.uuid}">
            <figure>
                <img src={doc.img_path ?? "/imgs/logo.png"} alt="works thumbnail">
                <figcaption>
                    <h3>{doc.name}</h3>
                    <User username={doc.username} avatar={doc.avatar}/>
                </figcaption>
            </figure>
        </a>
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