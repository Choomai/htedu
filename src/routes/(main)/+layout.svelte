<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faHouse, faPen, faFile, faFileLines, faBook, faChalkboardUser, faUsers, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
    import Navbar from "/src/components/navbar.svelte";
    import { page } from "$app/stores";
    import { app_name } from "$lib/const";
    import { sidebarState, onMobile } from "$lib/sidebarStore";
    import { version } from "/package.json";
    
    let { data, children } = $props();
</script>

<nav class="sidebar" class:hidden={!$sidebarState}>
    <div class="sidebar-main">
        <div class="sidebar-header">
            <div>
                <img src="/imgs/logo.png" alt="Site logo">
                <span>{app_name}</span>
            </div>
            {#if !$onMobile}
                <button class="fake" type="button" onclick={() => sidebarState.set(false)}><FontAwesomeIcon icon={faAnglesLeft} size="xl"/></button>
            {/if}
        </div>
        <a class:selected={$page.url.pathname == "/"} href="/"><FontAwesomeIcon icon={faHouse} fixedWidth={true}/>Trang chủ</a>
        <a class:selected={$page.url.pathname.startsWith("/study-area")} href="/study-area"><FontAwesomeIcon icon={faPen} fixedWidth={true}/>Khu học tập</a>
        <a class:selected={$page.url.pathname.startsWith("/practice")} href="/practice"> <FontAwesomeIcon icon={faFileLines} fixedWidth={true}/>Luyện đề</a>
        {#if data.session.permission_level >= 1}
            <a class:selected={$page.url.pathname.startsWith("/documents")} href="/documents"> <FontAwesomeIcon icon={faFile} fixedWidth={true}/>Đăng tài liệu</a>
            <a class:selected={$page.url.pathname.startsWith("/assignments")} href="/assignments"> <FontAwesomeIcon icon={faBook} fixedWidth={true}/>Đăng bài tập</a>
        {/if}
        <a class:selected={$page.url.pathname.startsWith("/teachers")} href="/teachers"><FontAwesomeIcon icon={faChalkboardUser} fixedWidth={true}/>Giáo viên</a>
        <a class:selected={$page.url.pathname.startsWith("/community")} href="/community"><FontAwesomeIcon icon={faUsers} fixedWidth={true}/>Cộng đồng</a>
    </div>
    <div>
        <code>v{version ?? "x.x.x"}</code>
    </div>
</nav>

<div class="container">
    <Navbar name={data.session.name} avatar={data.session.avatar} username={data.session.username}/>
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
        background-color: var(--bg);
        border-right: 3px solid #fff;
        font-size: 1.25rem;
        transition: 500ms ease;
    }
    nav.sidebar.hidden {
        transform: translateX(-100%);
        min-width: 0;
        width: 0;
        padding: 0;
        transition: 500ms ease;
    }
    @media screen and (max-width: 768px) {
        nav.sidebar {
            position: fixed;
            z-index: 50;
        }
    }

    div.sidebar-main {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    div.sidebar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    div.sidebar-header > div:first-child {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
    }
    div.sidebar-header > div:first-child > img {
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

    nav.sidebar > div:last-child {color: gray;}
</style>