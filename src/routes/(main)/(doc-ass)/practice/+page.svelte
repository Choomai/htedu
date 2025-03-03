<script>
    import { getContext } from "svelte";
    import User from "/src/components/user.svelte";

    const items = getContext("doc-ass");
</script>

<main>
    {#if $items.length == 0}
        <h2>Không có đề</h2>
    {/if}
    {#each $items as ass}
        <a class="normalize" href="/practice/{ass.uuid}">
            <figure>
                <img src={ass.img_path ?? "/imgs/logo.png"} alt="works thumbnail">
                <figcaption>
                    <h3>{ass.title}</h3>
                    <User username={ass.username} avatar={ass.avatar}/>
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