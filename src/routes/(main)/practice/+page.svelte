<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
    import { onMount } from "svelte";
    let { data } = $props();

    let currentFilter = $state("");
    function changeFilter(filter) {
        // if (!filter) docs = data.docs;
        // else {
            // docs = data.docs.filter(doc => doc.category == filter);
            currentFilter = filter;
        // }
    }
    onMount(() => {
        window.addEventListener("hashchange", () => {
            changeFilter(window.location.hash.slice(1))
        })
        changeFilter(window.location.hash.slice(1));
    })
</script>

<nav class="filter">
    {#each data.categories as category}
        <a class="normalize" class:active={currentFilter == category.id} href={`#${category.id}`}><FontAwesomeIcon icon={faPen}/>{category.title}</a>
    {/each}
    <a class="button new" href="/practice/new"><FontAwesomeIcon icon={faPlus}/>Tạo đề</a>
</nav>
<main>
    <h2>Không có đề</h2>
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
    nav.filter > a.new {
        background-color: var(--primary-color);
        color: white;
        font-weight: bold;
    }
</style>