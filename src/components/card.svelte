<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faPen, faTag, faTrash } from "@fortawesome/free-solid-svg-icons";
    import User from "/src/components/user.svelte";
    
    let props = $props();
    let imgError = $state(false);
    const tagsMap = {
        "advanced": "Mở rộng",
        "c10": "Lớp 10",
        "c11": "Lớp 11",
        "c12": "Lớp 12",
        "gen": "Ngẫu nhiên"
    }

    function handleImgError(e) {
        imgError = true;
        // e.target.style.display = "none";
        // console.log("called");
    }
</script>

<figure>
    {#if props.url}
        <a class="normalize" href={props.url}>
            <img class:error={imgError} onerror={handleImgError} src={props.imgPath ?? ""} alt="thumbnail">
        </a>
    {:else}
        <img class:error={imgError} onerror={handleImgError} src={props.imgPath ?? ""} alt="thumbnail">
    {/if}
    <figcaption>
        <div class="info-wrapper">
            <span>
                <h3>{props.title}</h3>
                <h4><FontAwesomeIcon icon={faTag}/> {tagsMap[props.tag]}</h4>
            </span>
            <div class="action">
                {#if props.editUrl}
                    <a href={props.editUrl}><FontAwesomeIcon icon={faPen}/></a>
                {/if}
                {#if props.ondelete}
                    <button class="fake" type="button" onclick={props.ondelete}><FontAwesomeIcon icon={faTrash}/></button>
                {/if}
            </div>
        </div>
        <User username={props.username} avatar={props.avatar}/>
    </figcaption>
</figure>

<style>
    figure {
        display: flex;
        flex-direction: column;
        width: 320px;
        border-radius: 1rem;
        margin: 1rem;
    }
    figure img {
        width: 320px;
        height: 150px;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
        font-size: 0;
    }
    figure img.error::after {
        content: "Hương Trà";
        display: block;
        position: relative;
        top: 0;
        left: 0;
        min-width: 320px;
        min-height: 150px;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
        background: linear-gradient(45deg, var(--gradient-start), var(--gradient-end));
        font-size: 2rem;
        font-weight: bold;
        text-align: center;
        text-indent: -1rem;
        line-height: 150px;
    }
    a.normalize {font-size: 0;}
    figure > figcaption {
        padding: .5rem;
        background-color: var(--secondary-bg);
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
    }
    figure h3 {margin-top: 0;}

    div.info-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: .5rem;
    }
    div.info-wrapper > span {width: 100%;}
    div.info-wrapper h3 {
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    div.info-wrapper h4 {
        font-weight: normal;
        margin: 0;
    }
    div.info-wrapper h4 {
        font-weight: normal;
        margin: 0;
    }
    div.info-wrapper > div.action {
        display: flex;
        align-items: center;
        gap: .5rem;
    }
</style>