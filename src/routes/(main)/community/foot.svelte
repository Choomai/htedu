<script>
    let props = $props();
</script>

<footer>
    <span>Bạn đang đăng bài với username là {props.username}</span>
    <button type="submit"><i class="fa-solid fa-pen-to-square fa-fw"></i>Đăng bài</button>
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