<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
    import User from "/src/components/user.svelte";

    let { data } = $props();
    const { assignments } = data;
</script>

<main>
    <a href="/assignments/upload" class="normalize upload">
        <FontAwesomeIcon icon={faPlusCircle} size="3x"/>
        <span>Đăng bài tập</span>
    </a>
    <h3>Thư viện của tôi</h3>
    <div class="uploaded">
        {#each assignments as ass}
            <a class="normalize" href="/practice/{ass.uuid}">
                <figure>
                    <img src={ass.img_path ?? "/imgs/logo.png"} alt="works thumbnail">
                    <figcaption>
                        <h3>{ass.title}</h3>
                        <User username={ass.username} avatar={ass.avatar}/>
                    </figcaption>
                </figure>
            </a>
        {/each}
    </div>
</main>

<style>
    div.uploaded {
        display: grid;
        grid-template-columns: auto auto;
        justify-items: center;
    }

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