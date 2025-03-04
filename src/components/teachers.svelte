<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
    let props = $props();
</script>

{#if props.homepage}
    <div class="header-wrapper">
        <h2>Giáo viên</h2>
        <a href="/teachers">Xem tất cả <FontAwesomeIcon icon={faArrowRight}/></a>
    </div>
{:else}
    <h2>Giáo viên</h2>
{/if}
<article>
    {#each props.data as teacher}
        <a class="normalize" href="/profile/{teacher.username}">
            <figure>
                <img src={teacher.avatar ?? "/avatars/default.webp"} alt="teachers avatar">
                <figcaption>{teacher.name}</figcaption>
            </figure>
        </a>
    {/each}
</article>

<style>
    article {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 2rem;
        justify-items: center;
    }

    figure {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        font-size: 1.25rem;
        width: unset;
    }
    figcaption {
        background-color: unset;
        text-align: center;
    }
    figure > img {
        width: 120px;
        height: 120px;
        border-radius: 100%;
    }
</style>