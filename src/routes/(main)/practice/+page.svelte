<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
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
        <a class="normalize" href={`#${category.id}`}><FontAwesomeIcon icon={faPen}/>{category.title}</a>
    {/each}
    <a class="button new" href="/practice/new"><FontAwesomeIcon icon={faPlus}/>Tạo đề</a>
</nav>
<main>
    {#each data.docs as doc}
        <a class="normalize" href="/practice/{doc.uuid}">
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