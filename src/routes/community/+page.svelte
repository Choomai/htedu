<script>
    const articles = [
        {
            name: "fi fai",
            avatar: "https://gravatar.com/avatar/000000000000000000000000000000000000000000000000000000?d=identicon&f=y",
            content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque aliquam illum quod repudiandae ullam reiciendis rerum numquam hic quas molestias harum, id ut consequuntur reprehenderit, perspiciatis ipsa cumque voluptatum? Nihil.",
            total_like: 69420,
            total_comment: 6,
            total_share: 9,
        },
        {
            name: "lua chua",
            avatar: "https://gravatar.com/avatar/000000000000000000000000000000000000000000000000000000?d=identicon&f=y",
            content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque aliquam illum quod repudiandae ullam reiciendis rerum numquam hic quas molestias harum, id ut consequuntur reprehenderit, perspiciatis ipsa cumque voluptatum? Nihil.",
            total_like: 69420,
            total_comment: 6,
            total_share: 9,
        },
        {
            name: "deo ai hoi",
            avatar: "https://gravatar.com/avatar/000000000000000000000000000000000000000000000000000000?d=identicon&f=y",
            content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque aliquam illum quod repudiandae ullam reiciendis rerum numquam hic quas molestias harum, id ut consequuntur reprehenderit, perspiciatis ipsa cumque voluptatum? Nihil.",
            total_like: 69420,
            total_comment: 6,
            total_share: 9,
        },
    ]
</script>

<main>
    {#each articles as article}
        <article>
            <h2><img src={article.avatar} alt="user avatar">{article.name}</h2>
            <p>{article.content}</p>
            <div class="actions">
                <button class="fake" type="button" title="like"><i class="fa-solid fa-heart"></i>&nbsp;{article.total_like}</button>
                <button class="fake" type="button" title="comment"><i class="fa-solid fa-comment"></i>&nbsp;{article.total_comment}</button>
                <button class="fake" type="button" title="share"><i class="fa-solid fa-share"></i>&nbsp;{article.total_share}</button>
            </div>
        </article>
    {/each}
</main>

<style>
    main {
        align-items: center;
    }

    h2 {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    h2 > img {
        border-radius: 100%;
        width: 40px;
        height: 40px;
    }

    article {
        border: 1px solid white;
        width: 80%;
        padding: 8px;
        border-radius: 16px;
    }

    button.fake {
        display: inline-flex;
        align-items: center;
        font-size: 1.5rem;
    }
</style>