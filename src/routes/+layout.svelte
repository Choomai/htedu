<nav class="navbar">
    <div>
        <img src="" alt="Site logo">
        <span>Huong Tra</span>
    </div>

    <div class="search">
        <input type="text" id="search" placeholder="Tìm kiếm...">
    </div>
</nav>

<nav class="sidebar">
    <a href="/">Trang chủ</a>
    <a href="/khu-hoc-tap">Khu học tập</a>
    <a href="/luyen-de">Luyện đề</a>
    <a href="/teachers">Giáo viên</a>
    <a href="/community">Cộng đồng</a>
    <div class="sidebar-bottom">
        <a href="/settings">Cài đặt</a>
    </div>
</nav>
<slot/>

<style>
    nav.navbar {
        display: flex;
    }

    nav.sidebar {
        height: 100%;
        width: 300px;
        border-right: 1px solid #fff;
    }
</style>