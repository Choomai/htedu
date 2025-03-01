<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faPen, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
    import { onMount } from "svelte";
    import User from "/src/components/user.svelte";
    let { data } = $props();
    let docs = $state(data.docs);

    let currentFilter = $state("");
    function changeFilter(filter) {
        if (filter == "top" || filter == "") {
            docs = data.docs
            currentFilter = "";
            return;
        }
        docs = data.docs.filter(doc => doc.category == filter);
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
    {#each data.categories as category}
        <a class="normalize" class:active={currentFilter == category.id} href={`#${category.id}`}><FontAwesomeIcon icon={faPen}/>{category.title}</a>
    {/each}
    {#if currentFilter != ""}
        <a class="normalize" href="#top"><FontAwesomeIcon icon={faCircleXmark} fixedWidth={true}/></a>
    {/if}
</nav>
<main>
    {#if docs.length == 0}
        <h2>Không có tài liệu</h2>
    {/if}
    {#each docs as doc}
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
        grid-template-columns: auto auto;
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
    nav.filter > a.active {
        background-color: var(--primary-color);
        color: white;
        font-weight: bold;
    }
</style>