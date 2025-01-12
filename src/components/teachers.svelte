<script>
    let props = $props();
</script>

{#if props?.homepage}
    <div class="header-wrapper">
        <h2>Giáo viên</h2>
        <a href="/teachers">Xem tất cả <i class="fa-solid fa-arrow-right"></i></a>
    </div>
{:else}
    <h2>Giáo viên</h2>
{/if}
<article>
    {#each props?.data as teacher}
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
        grid-template-columns: repeat(4, 1fr);
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
    }
    figure > img {
        width: 120px;
        height: 120px;
        border-radius: 100%;
    }
    h2 {margin: 0;}
</style>