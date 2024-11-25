<script>
    import Teachers from "../components/teachers.svelte";
</script>

<main>
    <div class="banner-container">
        <div class="banner">
            <h1>Đăng ký tài khoản giáo viên</h1>
            <a href="/auth/register">Đăng ký</a>
        </div>
        <i>Bằng việc đăng ký tài khoản giáo viên bạn sẽ đăng tải được các tài liệu học tập, bài tập lên website của chúng tôi</i>
    </div>
    <hr>
    <Teachers/>
</main>

<style>
    div.banner {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        background-color: var(--primary-color);
        border-radius: 1rem;
        padding: 2rem 0;
    }  
    h1 {margin: 0;}
    div.banner a {
        display: block;
        padding: .5rem 2rem;
        border-radius: .5rem;
        text-decoration: none;
        color: var(--primary-color);
        background-color: var(--bg-dark);
    }

    hr {
        width: 100%;
        border-color: var(--placeholder-color);
    }
</style>