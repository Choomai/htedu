<script>
    import { app_name } from "$lib/const";
    export let form;

    let currentFilename = "";
    function updateFilename(e) {
        currentFilename = e.target.value.replace(/^.*[\\\/]/, '');
    }
</script>

<main>
    <h1 class="app-name">{app_name}</h1>
    <div class="container">
        <form action method="post" enctype="multipart/form-data">
            <h2>Đăng nhập</h2>
            {#if form?.success == false}<p>{form?.message}</p>{/if}
            <div class="input">
                <input type="text" name="username" placeholder="Tên đăng nhập" required>
                <input type="text" name="name" placeholder="Họ và tên" required>
                <input type="email" name="email" placeholder="Email" required>
                <input type="password" name="password" placeholder="Mật khẩu" required>
                <input type="password" name="password-confirm" placeholder="Xác nhận mật khẩu" required>
                <div class="file-input">
                    <label for="avatar"><i class="fa-solid fa-file-image"></i>Ảnh đại diện</label>
                    <span>{currentFilename}</span>
                    <input type="file" name="avatar" id="avatar" accept="image/*" on:change={updateFilename} hidden>
                </div>
            </div>
            <button type="submit">Đăng ký</button>
        </form>
        <div class="hint">
            <h1>Chào mừng đến với {app_name}!</h1>
            <h2>Bạn đã có tài khoản?</h2>
            <a href="/auth/login" class="button">Đăng nhập</a>
        </div>
    </div>
</main>

<style>
    main {
        padding: 0;
        gap: 0;
    }
    h1.app-name {
        width: 100%;
        margin: 0;
        margin-left: 10%;
        font-size: 1.5rem;
        padding: 1rem;
        padding-left: 0;
    }
    div.container {
        display: flex;
        flex-direction: row;
        flex-grow: 1;
    }
    div.hint {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        background-color: var(--primary-color);
        width: 60%;
        border-radius: 35% 0 0 35%;
    }
    h1, h2 {margin: 0;}

    a.button {
        background-color: #111;
        color: var(--text-dark);
        border-radius: 2rem;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        width: 30%;
        font-size: 1.5rem;
    }
    form > h2 {margin-bottom: revert;}
    form > p {
        margin-top: 0;
        color: red;
    }
    div.input {
        display: flex;
        flex-direction: column;
        gap: .5rem;
        width: 80%;
    }
    div.input > input {font-size: 1.25rem;}
    div.file-input {
        display: flex;
        align-items: center;
        gap: .5rem;
    }
    label[for="avatar"] {
        display: flex;
        align-items: center;
        gap: .5rem;
        width: fit-content;
        border-radius: 1rem;
        padding: .5rem;
        user-select: none;
        border: 1px solid var(--text-dark);
        white-space: nowrap;
    }
    div.file-input > span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    button[type="submit"] {
        width: 80%;
        margin-top: .5rem;
        font-size: 1.25rem;
    }
</style>