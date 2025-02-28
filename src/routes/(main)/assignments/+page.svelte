<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
    import User from "/src/components/user.svelte";

    let { data } = $props();
    const { assigments } = data;
</script>

<main>
    <a href="/assignments/upload" class="normalize upload">
        <FontAwesomeIcon icon={faPlusCircle} size="3x"/>
        <span>Đăng bài tập</span>
    </a>
    <h3>Thư viện của tôi</h3>
    {#each assigments as ass}
        <a class="normalize" href="/study-area/{ass.uuid}">
            <figure>
                <img src={ass.img_path} alt="works thumbnail">
                <figcaption>
                    <h3>{ass.name}</h3>
                    <User username={ass.username} avatar={ass.avatar}/>
                </figcaption>
            </figure>
        </a>
    {/each}
</main>

<style>
    a.upload {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: revert;
        gap: 1rem;
        font-size: 2rem;
        padding: 1rem;
        border: 1px solid var(--text);
        border-radius: 1rem;
    }
</style>