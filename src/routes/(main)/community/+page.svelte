<script>
    let { data } = $props();
    const articles = data.articles;
</script>

<main>
    {#if articles.length >= 1}
        {#each articles as article}
            <article>
                <h2><img src={article.avatar || "/avatars/default.png"} alt="user avatar">{article.username}</h2>
                <p>{article.content}</p>
                <div class="action">
                    <button class="fake" type="button" title="like"><i class="fa-solid fa-heart"></i>&nbsp;{article.total_likes}</button>
                    <button class="fake" type="button" title="comment"><i class="fa-solid fa-comment"></i>&nbsp;{article.total_comments}</button>
                    <button class="fake" type="button" aria-label="share" title="share"><i class="fa-solid fa-share"></i></button>
                </div>
            </article>
        {/each}
    {:else}
        <h2>Không có bài viết</h2>
    {/if}
</main>

<style>
    main {
        align-items: center;
    }

    h2 {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0;
    }
    h2 > img {
        border-radius: 100%;
        width: 40px;
        height: 40px;
    }

    article {
        border: 1px solid white;
        width: 80%;
        padding: 8px;
        border-radius: 16px;
    }

    div.action {
        display: flex;
        gap: 1rem;
    }

    button.fake {
        display: inline-flex;
        align-items: center;
        font-size: 1.5rem;
    }
</style>