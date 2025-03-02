<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
    import User from "/src/components/user.svelte";

    let { data } = $props();
    const { docs } = data;
</script>

<main>
    <a href="/docs/upload" class="normalize upload">
        <FontAwesomeIcon icon={faPlusCircle} size="3x"/>
        <span>Đăng tài liệu</span>
    </a>
    <h3>Thư viện của tôi</h3>
    <div class="uploaded">
        {#each docs as doc}
            <a class="normalize" href="/study-area/{doc.uuid}">
                <figure>
                    <img src={doc.img_path ?? "/imgs/logo.png"} alt="works thumbnail">
                    <figcaption>
                        <h3>{doc.name}</h3>
                        <User username={doc.username} avatar={doc.avatar}/>
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