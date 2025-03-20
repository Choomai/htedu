<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faUser, faFile, faFileLines, faArrowRight } from "@fortawesome/free-solid-svg-icons";
    import Card from "/src/components/card.svelte";
    import Teachers from "/src/components/teachers.svelte";
    import { app_name } from "$lib/const";
    let { data } = $props();
    if (data.stats) {
        data.stats.docs_count = data.docs.filter(doc => doc.username == data.session.username).length;
    }
</script>

<svelte:head>
    <title>{app_name}</title>
</svelte:head>

<main>
    {#if data.session.permission_level >= 1}
        <section class="stats">
            <div class="card" style="--line:#E60000">
                <FontAwesomeIcon icon={faUser}/>
                <span>{data.stats.followers_count}</span>
                <span>Người theo dõi</span>
            </div>
            <div class="card" style="--line:#00B050">
                <FontAwesomeIcon icon={faFileLines}/>
                <span>{data.stats.articles_count}</span>
                <span>Bài viết</span>
            </div>
            <div class="card" style="--line:#00B0F0">
                <FontAwesomeIcon icon={faFile}/>
                <span>{data.stats.docs_count}</span>
                <span>Tài liệu tải lên</span>
            </div>
            <div class="card" style="--line:#7030A0">
                <FontAwesomeIcon icon={faFile}/>
                <span>{data.stats.assignments_count}</span>
                <span>Bài tập tải lên</span>
            </div>
        </section>
    {/if}
    {#if data.docs.length >= 1}
        <section class="documents">
            <div class="header">
                <h2>Tài liệu phổ biến</h2>
                <a href="/study-area">Xem tất cả <FontAwesomeIcon icon={faArrowRight}/></a>
            </div>
            {#each data.docs as doc}
            <Card title={doc.name} url="/study-area/{doc.uuid}" imgPath={doc.img_path}
            username={doc.username} avatar={doc.avatar}/>
            {/each}
        </section>
    {/if}
    {#if data.assignments.length >= 1}
        <section class="works">
            <div class="header">
                <h2>Bài tập phổ biến</h2>
                <a href="/study-area">Xem tất cả <FontAwesomeIcon icon={faArrowRight}/></a>
            </div>
            {#each data.assignments as ass}
                <Card title={ass.title} url="/practice/{ass.uuid}" imgPath={ass.img_path ?? ""}
                    username={ass.username} avatar={ass.avatar}/>
            {/each}
        </section>
    {/if}
    <Teachers data={data?.teachers} homepage={true}/>
</main>

<style>
    section:is(.documents, .works) {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        justify-items: center;
    }
    section:is(.documents, .works) > div.header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        justify-self: normal;
        grid-column: 1 / -1;
    }

    section.stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        justify-items: center;
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