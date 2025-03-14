<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faNewspaper, faFileLines } from "@fortawesome/free-solid-svg-icons";
    import Navbar from "/src/components/navbar.svelte";
    import { app_name } from "$lib/const";
    
    let { data } = $props();

    function requestFollow(e) {
        e.target.disabled = true;
        e.target.textContent = "Đang xử lý...";
        fetch("/api/follow", {
            method: "PUT",
            headers: {"Content-Type": "text/plain"},
            body: data.user.id
        })
        .then(res => {
            e.target.disabled = false;
            if (res.status == 201) {
                e.target.textContent = "Đã theo dõi";
            } else if (res.status == 200) {
                e.target.textContent = "Theo dõi";
            };
        })
        .catch(err => {
            console.error(err);
            e.target.textContent = "Lỗi";
        });
    }
</script>

<svelte:head>
    <title>{data.user.name} - {app_name}</title>
</svelte:head>

<div class="container">
    <Navbar showTitle noToggleSidebar name={data.session.name} avatar={data.session.avatar} username={data.session.username}/>
    
    <main>
        <div class="cover"></div>
        <article>
            <div class="profile">
                <img src={data.user.avatar ?? "/avatars/default.webp"} alt="user avatar">
                <div class="info">
                    <span class="name">{data.user.name}</span>
                    <!-- Edit button if self -->
                    {#if data.session.username == data.user.username} 
                        <a class="button" href="/profile/{data.user.username}/edit">Chỉnh sửa</a>
                    {:else}
                        <button type="button" onclick={requestFollow}>{data.followed ? "Đã theo dõi" : "Theo dõi"}</button>
                    {/if}
                </div>
            </div>
            <div class="follow-container">
                <span>{data.following.count} đang theo dõi</span>
            </div>
            <hr>
            
            <nav class="profile">
                <section>
                    <a class="active normalize" href="/profile/{data.user.username}/posts"><FontAwesomeIcon icon={faNewspaper} fixedWidth={true}/>Bài viết</a>
                </section>
                <section>
                    <a class="normalize" href="/profile/{data.user.username}/history"><FontAwesomeIcon icon={faFileLines} fixedWidth={true}/>Lịch sử bài tập</a>
                </section>
            </nav>
        </article>
    </main>
</div>

<style>
    div.container {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        padding: 0 2rem;
        height: 100%;
        overflow-y: scroll;
    }

    main {
        flex-grow: 1;
        padding: 0;
    }
    div.cover {
        background: linear-gradient(-45deg, var(--gradient-start), var(--gradient-end));
        border-radius: 0 0 2rem 2rem;
        width: 100%;
        height: 300px;
    }

    article {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        position: relative;
        top: -96px;
        font-size: 1.25rem;
    }
    div.profile {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        gap: 2rem;
        font-size: 1.5rem;
    }
    div.profile > img {
        width: 160px;
        height: 160px;
        border-radius: 100%;
        outline: 1rem solid var(--bg);
        user-select: none;
        background-color: var(--bg);
    }
    div.info {
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }
    div.info > :is(a.button, button) {
        font-size: inherit;
        padding: 1rem 1.5rem;
    }

    hr {
        width: 100%;
        border-color: var(--placeholder);
    }

    nav.profile {
        display: flex;
        gap: 1rem;
    }
</style>