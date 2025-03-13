<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faPen, faCircleXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
    import { onMount, setContext } from "svelte";
    import { page } from "$app/state";
    import { writable } from "svelte/store";
    
    let { data, children } = $props();
    let currentFilter = $state("");
    let items = writable(data.items);
    setContext("doc-ass", items);

    function changeFilter(filter) {
        currentFilter = filter === "top" ? "" : filter;
        $items = data.items.filter(item => currentFilter === "" || item.category === currentFilter);
    }
    $effect(() => {
        $items = data.items;
        currentFilter = "";
        if (window) {
            window.location.hash = "";
        }
    });

    onMount(() => {
        window.addEventListener("hashchange", () => {
            changeFilter(window.location.hash.slice(1));
        });
        changeFilter(window.location.hash.slice(1));
    });
</script>

<nav class="filter">
    {#each data.categories as category}
        <a class="normalize" class:active={currentFilter == category.id} href={`#${category.id}`}><FontAwesomeIcon icon={faPen}/>{category.title}</a>
    {/each}
    {#if currentFilter != ""}
        <a class="normalize" href="#top"><FontAwesomeIcon icon={faCircleXmark} fixedWidth={true}/></a>
    {/if}
    {#if page.url.pathname.startsWith("/practice")}
        <a class="button new" href="/practice/new"><FontAwesomeIcon icon={faPlus}/>Tạo đề</a>
    {/if}
</nav>
{@render children()}

<style>
    nav.filter {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }
    nav.filter > a {
        display: flex;
        gap: .5rem;
        align-items: center;
        background-color: var(--secondary-bg);
        padding: .5rem;
        border-radius: 1rem;
    }
    nav.filter > a:is(.active, .new) {
        background-color: var(--primary-color);
        color: white;
        font-weight: bold;
    }
</style>