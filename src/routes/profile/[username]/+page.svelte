<script>
    import { app_name } from "$lib/const";
    
    let { data } = $props();
    const { session, user } = data;
    let userDropdown = $state(false);
    let notifyDropdown = $state(false);
</script>

<div class="container">
    <nav class="navbar">
        <h2>{app_name}</h2>
        <div class="user">
            <button class="fake" type="button" aria-label="user" onclick={() => notifyDropdown = !notifyDropdown}><i class="fa-solid fa-bell fa-2x"></i></button>
            <button class="fake" type="button" aria-label="notification" onclick={() => userDropdown = !userDropdown}><img src={data.avatar ?? "/avatars/default.webp"} alt="profile"></button>
            {#if userDropdown}
                <div class="user-dropdown">
                    Xin chào, {session.name}!
                    <a class="button" href="/auth/logout">Đăng xuất</a>
                </div>
            {:else if notifyDropdown}
                <button type="button" class="fake notify-dropdown" onclick={() => notifyDropdown = false}>
                    <span>someone like ur mom</span>
                </button>
            {/if}
        </div>
    </nav>
    
    <main>
        <div class="cover"></div>
        <article>
            <div class="profile">
                <img src={user.avatar ?? "/avatars/default.webp"} alt="user avatar">
                <div class="info">
                    <span class="name">{user.name}</span>
                    <!-- Edit button if self -->
                    {#if session.username == user.username} 
                        <a class="button" href="/profile/{user.username}/edit">Chỉnh sửa</a>
                    {:else}
                        <button type="button">Theo dõi</button>
                    {/if}
                </div>
            </div>
            <div class="follow-container">
                <span>69 đang theo dõi</span>
            </div>
            <hr>
            
            <nav class="profile">
                <section>
                    <a class="active normalize" href="/profile/ngvana"><i class="fa-solid fa-newspaper fa-fw"></i>Bài viết</a>
                </section>
                <section>
                    <a class="normalize" href="/profile/ngvana/history/"><i class="fa-solid fa-file-lines fa-fw"></i>Lịch sử bài tập</a>
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
    
    nav.navbar {
        display: flex;
        justify-content: space-between;
        height: fit-content;
    }

    main {
        flex-grow: 1;
        padding: 0 2rem;
    }
    div.cover {
        background: linear-gradient(-45deg, var(--cover-gradient-start), var(--cover-gradient-end));
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