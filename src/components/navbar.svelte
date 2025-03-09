<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faBars, faBell, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
    import { sidebarState } from "$lib/sidebarStore";
    let userDropdown = $state(false);
    let notifyDropdown = $state(false);

    let props = $props();

    function toggleSidebar() {sidebarState.update(state => !state)};
</script>

<nav class="navbar">
    {#if props.showTitle}<a class="title" href="/"><h3>Huong Tra</h3></a>{/if}
    {#if !props.noToggleSidebar}<button class="fake" type="button" onclick={toggleSidebar}><FontAwesomeIcon icon={faBars} size="xl" fixedWidth={true}/></button>{/if}
    <div class="search-wrapper">
        <input type="text" id="search" placeholder="Tìm kiếm...">
    </div>
    <div class="user">
        <button class="fake" type="button" aria-label="user" onclick={() => notifyDropdown = !notifyDropdown}><FontAwesomeIcon icon={faBell} size="2x"/></button>
        <button class="fake" type="button" aria-label="notification" onclick={() => userDropdown = !userDropdown}><img src={props.avatar ?? "/avatars/default.webp"} alt="profile"></button>
        {#if userDropdown}
            <div class="user-dropdown">
                <span>Xin chào, {props.name}!</span>
                <div class="action">
                    <a class="button" href="/profile/{props.username}">Trang cá nhân</a>
                    <a class="button logout" href="/auth/logout"><FontAwesomeIcon icon={faRightFromBracket} fixedWidth={true}/></a>
                </div>
            </div>
        {:else if notifyDropdown}
            <button type="button" class="fake notify-dropdown" onclick={() => notifyDropdown = false}>
                <span>Không có thông báo</span>
            </button>
        {/if}
    </div>
</nav>

<style>
    nav.navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: fit-content;
        margin: 8px;
    }
    
    nav.navbar > a.title:hover {text-decoration: none;}

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
    input#search::after {
        content: "\f002";
        display: block;
        font-family: "Font Awesome 6 Free";
        position: relative;
    }
    div.user {
        justify-self: flex-end;
    }

    div.user-dropdown > div.action {
        display: flex;
        gap: 1rem;
    }
</style>