<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faComment, faHeart, faShare } from "@fortawesome/free-solid-svg-icons";
    import { Tipex } from "@friendofsvelte/tipex";
    import "@friendofsvelte/tipex/styles/Tipex.css";
    import "@friendofsvelte/tipex/styles/ProseMirror.css";
    import "@friendofsvelte/tipex/styles/Controls.css";
    import "@friendofsvelte/tipex/styles/EditLink.css";
    import "@friendofsvelte/tipex/styles/CodeBlock.css";
    import "./tipex.css";
    import Foot from "./foot.svelte";
    import { onMount } from "svelte";

    let { data } = $props();
    const articles = data.articles;
    let theme = $state("");
    onMount(() => {
        theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "";
    })
</script>

<main>
    <form action="?/new_article" method="post">
        <Tipex class={theme} controls floating focal>
            {#snippet foot(editor)}<Foot username={data.session.username}/>{/snippet}
        </Tipex>
    </form>

    {#if articles.length >= 1}
        {#each articles as article}
            <article>
                <h2><img src={article.avatar || "/avatars/default.webp"} alt="user avatar">{article.username}</h2>
                <p>{article.content}</p>
                <div class="action">
                    <button class="fake" type="button" title="like"><FontAwesomeIcon icon={faHeart}/>&nbsp;{article.total_likes}</button>
                    <button class="fake" type="button" title="comment"><FontAwesomeIcon icon={faComment}/>&nbsp;{article.total_comments}</button>
                    <button class="fake" type="button" aria-label="share" title="share"><FontAwesomeIcon icon={faShare}/>&nbsp;</button>
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
        padding: 0 6rem;
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

    form {
        width: 100%;
    }

    article {
        border: 1px solid white;
        width: 100%;
        padding: 8px;
        border-radius: 16px;
    }
    article > div.action {
        display: flex;
        gap: 1rem;
    }
    article > div.action > button.fake {
        display: inline-flex;
        align-items: center;
        font-size: 1.5rem;
    }
</style>