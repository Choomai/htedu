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
    import { enhance } from "$app/forms";

    let { data } = $props();
    let { articles } = $state(data);
    let theme = $state("");
    let actionDisabled = $state(false);
    onMount(() => theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "");
    let body = "";
    let editor = $state();
    const postContent = $derived(editor?.getHTML());
    
    function handleSubmit(e) {
        // Only submit if it's an actual form submission, not a link button click
        if (e.submitter?.getAttribute("aria-label") === "Edit link") {
            e.preventDefault();
        }
    }

    async function likeArticle(id) {
        actionDisabled = true;
        const likeReq = await fetch("/api/articles", {
            method: "PUT",
            body: JSON.stringify({ id })
        });
        if (!likeReq.ok) {
            actionDisabled = false;
            return alert("Không thể thích bài viết, hãy thử lại sau");
        }

        const likeRes = await likeReq.json();

        const article = articles.find(a => a.id == id);
        if (!article) {
            actionDisabled = false;
            return alert("Không thể tìm thấy bài viết");
        }

        article.already_liked = likeRes.liked;
        article.total_likes += likeRes.liked ? 1 : -1;
        articles = [...articles];
        actionDisabled = false;
    }

    // function editArticle() {alert("Tính năng đang phát triển")}
    async function deleteArticle(id) {
        if (!confirm("Bạn có chắc chắn muốn xóa bài viết này ?")) return;

        actionDisabled = true;
        const formData = new FormData();
        formData.append("id", id);
        const deleteReq = await fetch("/api/articles", {
            method: "DELETE",
            body: formData
        })
        if (!deleteReq.ok) {
            actionDisabled = false;
            return alert("Xoá thất bại, hãy thử lại sau");
        }
        articles = articles.filter(article => article.id != id);
        alert("Xóa bài viết thành công");
        actionDisabled = false;
    }

    async function toggleComments(articleId, page = 1) {
        const article = articles.find(a => a.id === articleId);
        if (!article) return;
        
        // If comments are already loaded and it's page 1, just toggle visibility
        if (article.comments && page === 1) {
            articles = articles.map(a => {
                if (a.id === articleId) {
                    return { ...a, showComments: !a.showComments };
                }
                return a;
            });
            return;
        }
        
        // Load comments (first time or more)
        try {
            const response = await fetch(`/api/articles/comments?article_id=${articleId}&page=${page}&limit=5`);
            if (!response.ok) throw new Error("Failed to load comments");
            
            const data = await response.json();
            articles = articles.map(a => {
                if (a.id === articleId) {
                    return {
                        ...a,
                        comments: page === 1 ? data.comments : [...(a.comments || []), ...data.comments],
                        showComments: true,
                        hasMore: data.hasMore,
                        currentPage: page
                    };
                }
                return a;
            });
        } catch (err) {
            console.error(err);
            alert("Load bình luận thất bại, hãy thử lại sau");
        }
    }

    async function submitComment(e, articleId) {
        e.preventDefault();
        const article = articles.find(a => a.id === articleId);
        if (!article?.newComment) return;

        actionDisabled = true;
        try {
            const response = await fetch("/api/articles/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    article_id: articleId,
                    content: article.newComment
                })
            });

            if (!response.ok) throw new Error("Failed to post comment");

            const newComment = await response.json();
            
            articles = articles.map(a => {
                if (a.id === articleId) {
                    return {
                        ...a,
                        comments: [...(a.comments || []), newComment],
                        total_comments: a.total_comments + 1,
                        newComment: "" // Clear input after successful post
                    };
                }
                return a;
            });
        } catch (err) {
            console.error(err);
            alert("Đăng bình luận thất bại, hãy thử lại sau");
        } finally {
            actionDisabled = false;
        }
    }
</script>

<svelte:head>
    <title>Cộng đồng - {app_name}</title>
</svelte:head>

<main>
    <Tipex {body} bind:tipex={editor} class={theme} controls floating>
        {#snippet foot()}<Foot username={data.session.username}/>{/snippet}
    </Tipex>
    <form id="post-form" action="?/new_article" method="post" onsubmit={handleSubmit} use:enhance>
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
                    <button class="fake" disabled={actionDisabled} class:active={article.already_liked} type="button" onclick={() => likeArticle(article.id)} title="like"><FontAwesomeIcon icon={faHeart}/><span>&nbsp;{article.total_likes}</span></button>
                    <button class="fake" disabled={actionDisabled} type="button" title="comment" onclick={() => toggleComments(article.id)}><FontAwesomeIcon icon={faComment}/><span>&nbsp;{article.total_comments}</span></button>
                    <button class="fake" disabled={actionDisabled} type="button" aria-label="share" title="share"><FontAwesomeIcon icon={faShare}/></button>
                    {#if article.user_id == data.session.id}
                        <!-- <button class="fake" onclick={editArticle} type="button"><FontAwesomeIcon icon={faPen}/></button> -->
                        <button class="fake" disabled={actionDisabled} onclick={() => deleteArticle(article.id)} type="button"><FontAwesomeIcon icon={faTrash}/></button>
                    {/if}
                </div>
                {#if article.showComments}
                    <hr>
                    <div class="comments">
                        {#if article.comments?.length}
                            {#each article.comments as comment}
                                <div class="comment">
                                    <img src={comment.avatar || "/avatars/default.webp"} alt="commenter avatar">
                                    <div>
                                        <b>{comment.username}</b>&nbsp;<code>-</code>&nbsp;<time datetime={comment.timestamp}>{(new Date(comment.timestamp)).toLocaleString("vi-VN")}</time>
                                        <br>
                                        <span>{comment.content}</span>
                                    </div>
                                </div>
                            {/each}
                            {#if article.hasMore}
                                <button class="fake" type="button" onclick={() => toggleComments(article.id, (article.currentPage || 1) + 1)}>Xem thêm</button>
                            {/if}
                        {/if}
                        
                        <form class="comment-form" method="post" onsubmit={(e) => submitComment(e, article.id)}>
                            <input type="text" bind:value={article.newComment} placeholder="Nhập bình luận..." required>
                            <button type="submit" disabled={actionDisabled}><FontAwesomeIcon icon={faComment}/>&nbsp;Comment</button>
                        </form>
                    </div>
                {/if}
            </article>
        {/each}
    {:else}<h2>Không có bài viết</h2>{/if}
</main>

<style>
    main {
        align-items: center;
        padding: 0 6rem;
    }
    hr {border-color: var(--border-low);}

    div:is(.header, .comment) {
        display: flex;
        align-items: center;
        gap: .5rem;
    }
    div:is(.header, .comment) > img {
        border-radius: 100%;
        width: 40px;
        height: 40px;
    }

    form {width: 100%;}

    article {
        border: 1px solid var(--border);
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
    article > div.action > button.fake.active {
        color: red;
    }

    div.comments {
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }
    form.comment-form {
        display: flex;
        gap: 0.5rem;
    }
    form.comment-form input {
        flex-grow: 1;
        padding: 0.5rem;
        border-radius: 8px;
        border: 1px solid var(--border-low);
        background: transparent;
        color: inherit;
    }
    form.comment-form button {
        padding: 0.5rem 1rem;
        border-radius: 8px;
        background: var(--primary-color);
        border: none;
        cursor: pointer;
    }
</style>