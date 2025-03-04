<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faComment, faHeart, faShare, faTrash } from "@fortawesome/free-solid-svg-icons";
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
    let { articles } = $state(data);
    let theme = $state("");
    onMount(() => {
        theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "";
    });
    let body = "";
    let editor = $state();
    const postContent = $derived(editor?.getHTML());

    function handleSubmit(e) {
        // Only submit if it's an actual form submission, not a link button click
        if (e.submitter?.getAttribute("aria-label") === "Edit link") {
            e.preventDefault();
        }
    }
    // function editArticle() {alert("Tính năng đang phát triển")}
    async function deleteArticle(id) {
        const formData = new FormData();
        formData.append("id", id);
        const deleteReq = await fetch("/api/articles", {
            method: "DELETE",
            body: formData
        })
        if (!deleteReq.ok) return alert("Xoá thất bại, hãy thử lại sau");
        articles = articles.filter(article => article.id != id);
        alert("Xóa bài viết thành công")
    }
</script>

<main>
    <Tipex {body} bind:tipex={editor} class={theme} controls floating>
        {#snippet foot()}<Foot username={data.session.username}/>{/snippet}
    </Tipex>
    <form id="post-form" action="?/new_article" method="post" onsubmit={handleSubmit}>
        <input type="hidden" name="content" value={postContent}>
    </form>

    {#if articles.length >= 1}
        {#each articles as article}
            <article>
                <div class="header">
                    <img src={article.avatar || "/avatars/default.webp"} alt="user avatar">
                    <h2>{article.username}</h2>
                </div>
                <p>{@html article.content}</p>
                <div class="action">
                    <button class="fake" type="button" title="like"><FontAwesomeIcon icon={faHeart}/>&nbsp;{article.total_likes}</button>
                    <button class="fake" type="button" title="comment"><FontAwesomeIcon icon={faComment}/>&nbsp;{article.total_comments}</button>
                    <button class="fake" type="button" aria-label="share" title="share"><FontAwesomeIcon icon={faShare}/></button>
                    {#if article.user_id == data.session.id}
                        <!-- <button class="fake" onclick={editArticle} type="button"><FontAwesomeIcon icon={faPen}/></button> -->
                        <button class="fake" onclick={() => deleteArticle(article.id)} type="button"><FontAwesomeIcon icon={faTrash}/></button>
                    {/if}
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

    div.header {
        display: flex;
        gap: .5rem;
    }
    div.header > img {
        border-radius: 100%;
        width: 40px;
        height: 40px;
    }

    form {width: 100%;}

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