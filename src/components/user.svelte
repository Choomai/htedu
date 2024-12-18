<script>
    let props = $props();
</script>

<div class="user">
    <img src={props.avatar ?? "/avatars/default.webp"} alt="profile">
    {props.name}
</div>