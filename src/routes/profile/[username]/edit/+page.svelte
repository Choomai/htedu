<script>
    let { data } = $props();
    const { name, username, email } = data;
</script>

<main>
    <form action method="post">
        <h1>Chỉnh sửa trang cá nhân</h1>
        <input type="text" name="name" placeholder="Tên" value={name}>
        <input type="text" name="username" placeholder="Username" value={username}>
        <input type="email" name="email" placeholder="Email" value={email}>
        <input type="password" name="old-password" placeholder="Mật khẩu cũ">
        <input type="password" name="new-password" placeholder="Mật khẩu mới">
        <input type="password" name="new-password-confirm" placeholder="Xác nhận mật khẩu mới">
        <button type="submit">Lưu thay đổi</button>
    </form>
</main>

<style>
    main {
        align-items: center;
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 60%;
    }
    form input {
        padding: 1rem;
        border: none;
        border-radius: 1rem;
        outline: 2px solid transparent;
        background-color: var(--input-box);
    }
    form input:focus-visible {
        outline: 2px solid var(--primary-color);
    }
    button {
        width: fit-content;
        margin-left: auto;
    }
</style>