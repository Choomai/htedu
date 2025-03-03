<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
    let props = $props();
</script>

<footer>
    <span>Bạn đang đăng bài với username là {props.username}</span>
    <button type="submit" form="post-form"><FontAwesomeIcon icon={faPenToSquare} fixedWidth={true}/>Đăng bài</button>
</footer>

<style>
    footer {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: .5rem;
        align-items: center;
    }
</style>