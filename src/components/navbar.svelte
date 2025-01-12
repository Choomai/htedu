<script>
    let userDropdown = $state(false);
    let notifyDropdown = $state(false);

    let props = $props();
</script>

<nav class="navbar">
    {#if props.showTitle}<h3>Huong Tra</h3>{/if}
    <div class="search-wrapper">
        <input type="text" id="search" placeholder="Tìm kiếm...">
        <i id="searchIcon" class="fa-solid fa-magnifying-glass fa-1x"></i>
    </div>
    <div class="user">
        <button class="fake" type="button" aria-label="user" onclick={() => notifyDropdown = !notifyDropdown}><i class="fa-solid fa-bell fa-2x"></i></button>
        <button class="fake" type="button" aria-label="notification" onclick={() => userDropdown = !userDropdown}><img src={props.avatar ?? "/avatars/default.webp"} alt="profile"></button>
        {#if userDropdown}
            <div class="user-dropdown">
                Xin chào, {props.name ?? "Khách"}!
                <a class="button" href="/auth/logout">Đăng xuất</a>
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

    h3 {margin: 0;}

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