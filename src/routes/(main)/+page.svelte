<script>
    import User from "/src/components/user.svelte";
    import Teachers from "/src/components/teachers.svelte";
    export let data;
</script>

<main>
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
    <Teachers/>
</main>

<style>
    article > div.header-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    article > div.header-wrapper > a {
        color: var(--placeholder-color);
        text-decoration: none;
    }
    h2 {margin: 0;}

    article > figure {
        display: flex;
        flex-direction: column;
        width: 400px;
        border-radius: 1rem;
    }
    article > figure > img {
        width: 400px;
        height: 150px;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
    }
    article > figure > figcaption {
        padding: .5rem;
        background-color: black;
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
    }
    h3 {margin-top: 0;}
</style>