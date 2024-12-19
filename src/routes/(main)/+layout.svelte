<script>
    import { page } from "$app/stores";
    import { app_name } from "$lib/const";
    
    let { data, children } = $props();
    const { session } = data;
    let userDropdown = $state(false);
    let notifyDropdown = $state(false);
</script>

<nav class="sidebar">
    <div class="sidebar-main">
        <div>
            <img src="/imgs/logo.png" alt="Site logo">
            <span>{app_name}</span>
        </div>
        <a class:selected={$page.url.pathname == "/"} href="/"><i class="fa-solid fa-house fa-fw"></i>Trang chủ</a>
        <a class:selected={$page.url.pathname.startsWith("/study-area")} href="/study-area"><i class="fa-solid fa-pen fa-fw"></i>Khu học tập</a>
        <a class:selected={$page.url.pathname.startsWith("/practice")} href="/practice"><i class="fa-solid fa-file-lines fa-fw"></i>Luyện đề</a>
        <a class:selected={$page.url.pathname.startsWith("/teachers")} href="/teachers"><i class="fa-solid fa-chalkboard-user fa-fw"></i>Giáo viên</a>
        <a class:selected={$page.url.pathname.startsWith("/community")} href="/community"><i class="fa-solid fa-users fa-fw"></i>Cộng đồng</a>
    </div>
</nav>

<div class="container">
    <nav class="navbar">
        <div class="search-wrapper">
            <input type="text" id="search" placeholder="Tìm kiếm...">
            <i id="searchIcon" class="fa-solid fa-magnifying-glass fa-1x"></i>
        </div>
        <div class="user">
            <button class="fake" type="button" aria-label="user" onclick={() => notifyDropdown = !notifyDropdown}><i class="fa-solid fa-bell fa-2x"></i></button>
            <button class="fake" type="button" aria-label="notification" onclick={() => userDropdown = !userDropdown}><img src={data.avatar ?? "/avatars/default.webp"} alt="profile"></button>
            {#if userDropdown}
                <div class="user-dropdown">
                    Xin chào, {session.name ?? "Khách"}!
                    <a class="button" href="/auth/logout">Đăng xuất</a>
                </div>
            {:else if notifyDropdown}
                <button type="button" class="fake notify-dropdown" onclick={() => notifyDropdown = false}>
                    <span>Không có thông báo</span>
                </button>
            {/if}
        </div>
    </nav>
    {@render children()}
</div>

<style>
    div.container {
        display: flex;
        flex-direction: column;
        width: fit-content;
        overflow-x: hidden;
        overflow-y: auto;
        flex-grow: 1;
    }

    nav.sidebar {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100vh;
        width: 300px;
        padding: 1rem;
        overflow-y: overlay;
        border-right: 1px solid #fff;
        font-size: 1.25rem;
    }

    div.sidebar-main {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    div.sidebar-main div:first-child {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
    }
    div.sidebar-main div:first-child > img {
        width: 48px;
        border-radius: 100%;
    }
    nav.sidebar a {
        display: flex;
        align-items: center;
        gap: .5rem;
        padding: 8px;
        text-decoration: none;
        color: var(--text);
        border-radius: 16px;
        transition: 500ms ease color;
        user-select: none;
    }

    nav.sidebar a:not(.selected):hover {
        color: var(--primary-color);
        transition: 500ms ease color;
    }
    nav.sidebar a.selected {
        background-color: var(--primary-color);
        color: white;
    }


    nav.navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: fit-content;
        margin: 8px;
    }
    div.search-wrapper {
        display: flex;
        justify-content: center;
        flex-grow: 1;
    }
    input#search {
        width: 60%;
        padding: 8px;
        border-radius: 16px;
        border: 1px solid gray;
        font-size: 1rem;
    }
    input#search::placeholder {color: var(--placeholder-color);}
    #searchIcon {
        position: relative;
        left: -28px;
        top: 10px;
        cursor: pointer;
    }
    div.user {
        justify-self: flex-end;
    }
</style>