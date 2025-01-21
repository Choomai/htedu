<script>
    import { app_name } from "$lib/const";

    let props = $props();
    let direction = $state("left");
    if (["login", "reset-password"].includes(props.type)) direction = "right";
</script>

<div class={direction}>
    {#if props.type == "register"}
        <h1>Chào mừng đến với {app_name}!</h1>
        <h2>Bạn đã có tài khoản?</h2>
        <a href="/auth/login" class="button">Đăng nhập</a>
    {:else if props.type == "login"}
        <h1>Chào mừng trở lại!</h1>
        <h2>Bạn chưa có tài khoản?</h2>
        <a href="/auth/register" class="button">Tạo tài khoản</a>
    {:else if props.type == "verify"}
        <h1>Chào mừng đến với {app_name}!</h1>
        <h2>Bạn phải xác nhận email trước khi sử dụng dịch vụ!</h2>
    {:else if props.type == "reset-password"}
        <h1>Đặt lại mật khẩu</h1>
        <h2>Nhập email của tài khoản cần đặt lại mật khẩu</h2>
    {/if}
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        background-color: var(--primary-color);
        color: white;
        width: 60%;
    }
    div.left {border-radius: 35% 0 0 35%;}
    div.right {border-radius: 0 35% 35% 0;}

    h1, h2 {margin: 0;}

    a.button {
        background-color: var(--bg);
        color: var(--text);
        border-radius: 2rem;
    }
</style>