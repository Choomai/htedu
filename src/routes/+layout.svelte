<nav class="sidebar">
    <div class="sidebar-main">
        <div>
            <img src="" alt="Site logo">
            <span>Huong Tra</span>
        </div>
        <a href="/"><i class="fa-solid fa-house fa-fw"></i>Trang chủ</a>
        <a href="/khu-hoc-tap"><i class="fa-solid fa-pen fa-fw"></i>Khu học tập</a>
        <a href="/luyen-de"><i class="fa-solid fa-file-lines fa-fw"></i>Luyện đề</a>
        <a href="/teachers"><i class="fa-solid fa-chalkboard-user fa-fw"></i>Giáo viên</a>
        <a href="/community"><i class="fa-solid fa-users fa-fw"></i>Cộng đồng</a>
    </div>

    <div class="sidebar-bottom">
        <a href="/settings"><i class="fa-solid fa-gear fa-fw"></i>Cài đặt</a>
    </div>
</nav>

<div class="container">
    <nav class="navbar">
        <input type="text" id="search" placeholder="Tìm kiếm...">
        <div class="user">
            <button class="fake" type="button"><i class="fa-solid fa-bell fa-2x"></i></button>
            <img src alt="profile">
        </div>
    </nav>
    <slot/>
</div>

<style>
    nav.sidebar {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100vh;
        width: 300px;
        padding: 1rem;
        border-right: 1px solid #fff;
    }
    nav.sidebar a {
        display: flex;
        align-items: center;
        gap: .5rem;
        text-decoration: none;
    }

    nav.navbar {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        height: fit-content;
        width: 100%;
    }
    input#search {
        width: 200px;
        padding: .5rem;
    }
    div.user {
        justify-self: flex-end;
    }
</style>