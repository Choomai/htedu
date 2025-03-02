<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faPen, faPlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
    import { onMount } from "svelte";
    import User from "/src/components/user.svelte";
    let { data } = $props();

    let currentFilter = $state("");
    function changeFilter(filter) {
        if (filter == "top" || filter == "") {
            currentFilter = "";
            return;
        }
        currentFilter = filter;
    }
    onMount(() => {
        window.addEventListener("hashchange", () => {
            changeFilter(window.location.hash.slice(1))
        })
        changeFilter(window.location.hash.slice(1));
    })
</script>

<nav class="filter">
    {#each data.categories as cat}
        <a class="normalize" class:active={currentFilter == cat.id} href={`#${cat.id}`}><FontAwesomeIcon icon={faPen}/>{cat.title}</a>
    {/each}
    {#if currentFilter != ""}
        <a class="normalize" href="#top"><FontAwesomeIcon icon={faCircleXmark} fixedWidth={true}/></a>
    {/if}
    <a class="button new" href="/practice/new"><FontAwesomeIcon icon={faPlus}/>Tạo đề</a>
</nav>
<main>
    {#each data.assignments as ass}
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
        grid-template-columns: auto auto;
        justify-items: center;
    }
    
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
    nav.filter > a:is(.new, .active) {
        background-color: var(--primary-color);
        color: white;
        font-weight: bold;
    }
</style>