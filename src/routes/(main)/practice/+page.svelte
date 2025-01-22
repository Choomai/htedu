<script>
    import { onMount } from "svelte";
    import User from "/src/components/user.svelte";
    let { data } = $props();

    onMount(() => {
        window.addEventListener("hashchange", () => {
            const currentFilter = window.location.hash.slice(1);
            
        })
    })
</script>

<nav class="filter">
    {#each data.exam_categories as category}
        <a class="normalize" href={`#${category.id}`}><i class="fa-solid fa-pen"></i>{category.title}</a>
    {/each}
    {#if data.session.permission_level >= 1}
        <a class="button" href="/practice/new"><i class="fa-solid fa-plus"></i>Tạo đề</a>
    {/if}
</nav>
<main>
    <figure>
        <img src="/imgs/logo.png" alt="works thumbnail">
        <figcaption>
            <h3>works title</h3>
            <User username={data.session?.username} avatar={data.session?.avatar}/>
        </figcaption>
    </figure>
</main>

<style>
    nav.filter {
        display: flex;
        gap: 1rem;
        justify-content: center;
    }
    nav.filter > a {
        display: flex;
        gap: .5rem;
        align-items: center;
        background-color: var(--secondary-bg);
        padding: .5rem;
        border-radius: 1rem;
    }
</style>