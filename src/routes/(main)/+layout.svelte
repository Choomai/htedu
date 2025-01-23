<script>
    import Navbar from "/src/components/navbar.svelte";
    import { page } from "$app/stores";
    import { app_name } from "$lib/const";
    import { version } from "/package.json";
    
    let { data, children } = $props();
    const { session } = data;
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
    <div>
        <code>v{version ?? "dev"}</code>
    </div>
</nav>

<div class="container">
    <Navbar name={session.name} avatar={session.avatar} username={session.username}/>
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
        min-width: 300px;
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

    nav.sidebar div:last-child {color: gray;}
</style>