<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
    import { onMount } from "svelte";
    import User from "/src/components/user.svelte";
    let { data } = $props();
    let docs = $state(data.docs);

    let currentFilter = $state("");
    function changeFilter(filter) {
        if (!filter) docs = data.docs;
        else {
            docs = data.docs.filter(doc => doc.category == filter);
            currentFilter = filter;
        }
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
    <a class="button new" href="/study-area/new"><FontAwesomeIcon icon={faPlus}/>Tạo đề</a>
</nav>
<main>
    {#if docs.length == 0}
        <h2>Không có tài liệu</h2>
    {/if}
    {#each docs as doc}
        <a class="normalize" href="/study-area/{doc.uuid}">
            <figure>
                <img src={doc.img_path} alt="works thumbnail">
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
        grid-template-columns: auto auto;
    }
    main a {width: fit-content;}
    
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
    nav.filter > a.active {
        background-color: var(--primary-color);
        color: white;
        font-weight: bold;
    }
</style>