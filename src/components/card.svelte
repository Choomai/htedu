<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faTrash } from "@fortawesome/free-solid-svg-icons";
    import User from "/src/components/user.svelte";
    
    let props = $props();
</script>

<figure>
    {#if props.url}
        <a class="normalize" href={props.url}>
            <img src={props.imgPath ?? "/imgs/logo.png"} alt="thumbnail">
        </a>
    {:else}
        <img src={props.imgPath ?? "/imgs/logo.png"} alt="thumbnail">
    {/if}
    <figcaption>
        <div class="info-wrapper">
            <h3>{props.title}</h3>
            {#if props.ondelete}
                <button class="fake" type="button" onclick={props.ondelete}><FontAwesomeIcon icon={faTrash}/></button>
            {/if}
        </div>
        <User username={props.username} avatar={props.avatar}/>
    </figcaption>
</figure>

<style>
    figure {
        display: flex;
        flex-direction: column;
        width: 400px;
        border-radius: 1rem;
    }
    figure img {
        width: 400px;
        height: 150px;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
    }
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
</style>