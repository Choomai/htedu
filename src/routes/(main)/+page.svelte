<script>
    import User from "/src/components/user.svelte";
    import Teachers from "/src/components/teachers.svelte";
    let { data } = $props();
</script>

<main>
    <section class="stats">
        <div class="card" style="--line:#E60000">
            <i class="fa-solid fa-shoe-prints"></i>
            <span>{data.stats.followers_count}</span>
            <span>Người theo dõi</span>
        </div>
        <div class="card" style="--line:#00B050">
            <i class="fa-solid fa-file-lines"></i>
            <span>{data.stats.articles_count}</span>
            <span>Bài viết</span>
        </div>
        <div class="card" style="--line:#00B0F0">
            <i class="fa-regular fa-file"></i>
            <span>{data.stats.exams_count}</span>
            <span>Tài liệu tải lên</span>
        </div>
        <div class="card" style="--line:#7030A0">
            <i class="fa-regular fa-file"></i>
            <span>{0}</span>
            <span>Bài tập tải lên</span>
        </div>
    </section>
    <article class="documents">
        <div class="header-wrapper">
            <h2>Tài liệu phổ biến</h2>
            <a href="/practice">Xem tất cả <i class="fa-solid fa-arrow-right"></i></a>
        </div>
        <figure>
            <img src="/imgs/logo.png" alt="document thumbnail">
            <figcaption>
                <h3>document title</h3>
                <User username={data.session?.username} avatar={data.session?.avatar}/>
            </figcaption>
        </figure>
    </article>
    <article class="works">
        <div class="header-wrapper">
            <h2>Bài tập phổ biến</h2>
            <a href="/study-area">Xem tất cả <i class="fa-solid fa-arrow-right"></i></a>
        </div>
        <figure>
            <img src="/imgs/logo.png" alt="works thumbnail">
            <figcaption>
                <h3>works title</h3>
                <User username={data.session?.username} avatar={data.session?.avatar}/>
            </figcaption>
        </figure>
    </article>
    <Teachers data={data?.teachers} homepage={true}/>
</main>

<style>
    section.stats {
        display: flex;
        justify-content: space-evenly;
    }

    section.stats > div {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: start;
        width: 150px;
        height: 150px;
        padding: 1rem;
        border-radius: 1rem 1rem .5rem .5rem;
        font-size: 2rem;
        box-shadow: 3px 3px 1rem .5rem var(--secondary-bg);
        border-bottom: 3px solid var(--line);
    }
    section.stats > div > span:last-child {font-size: 1rem;}
</style>