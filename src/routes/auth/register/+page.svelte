<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faFileImage } from "@fortawesome/free-solid-svg-icons";
    import { enhance } from "$app/forms";
    import { app_name } from "$lib/const";
    import AuthDecoration from "/src/components/auth-decoration.svelte";
    let { form } = $props();

    let currentFilename = $state("");
    function updateFilename(e) {
        currentFilename = e.target.value.replace(/^.*[\\\/]/, '');
    }
    let teacherToggle = $state(false)
</script>

<main>
    <h1 class="app-name">{app_name}</h1>
    <div class="container">
        <form action method="post" enctype="multipart/form-data" use:enhance>
            <h2>Đăng ký</h2>
            {#if form?.success == false}<p>{form?.message}</p>{/if}
            <div class="input">
                <div class="teacher-toggle">
                    <label for="teacher">Tài khoản giáo viên</label>
                    <input type="checkbox" name="teacher" id="teacher" bind:checked={teacherToggle}>
                </div>
                <input type="text" name="username" placeholder="Tên đăng nhập" required minlength="3" maxlength="24">
                <input type="text" name="name" placeholder="Họ và tên" required>
                {#if teacherToggle}
                    <input type="email" name="email" placeholder="Email (edu.vn)" required>
                {:else}
                    <input type="email" name="email" placeholder="Email" required>
                {/if}
                <input type="password" name="password" placeholder="Mật khẩu" required>
                <input type="password" name="password-confirm" placeholder="Xác nhận mật khẩu" required>
                <div class="file-input">
                    <label for="avatar"><FontAwesomeIcon icon={faFileImage}/>Ảnh đại diện</label>
                    <span>{currentFilename}</span>
                    <input type="file" name="avatar" id="avatar" accept="image/jpeg,image/png,image/webp,image/gif,image/avif,image/tiff,image/svg" onchange={updateFilename} hidden>
                </div>
            </div>
            <button type="submit">Đăng ký</button>
        </form>
        <AuthDecoration type="register"/>
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
    h1 {margin: 0;}

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        width: 30%;
        font-size: 1.5rem;
    }
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

    button[type="submit"] {
        width: 80%;
        margin-top: .5rem;
        font-size: 1.25rem;
    }

    div.teacher-toggle {
        display: flex;
        justify-content: space-between;
    }
    input[type="checkbox"] {
        appearance: none;
        min-width: 96px;
        height: 32px;
        display: flex;
        align-items: center;
        position: relative;
        border-radius: 2rem;
        overflow: hidden;
        outline: none;
        border: none;
        cursor: pointer;
        background-color: var(--toggle-off-bg);
        margin: 3px 3px 3px 3px;
        transition: background-color ease 300ms;
    }
    input[type="checkbox"]::before {
        content: "Tắt";
        display: inline-flex;
        align-items: center;
        position: absolute;
        z-index: 3;
        width: 28px;
        height: 28px;
        background-color: var(--toggle-ball);
        left: 2px;
        border-radius: 100%;
        font-size: 1rem;
        font-weight: bold;
        text-indent: 48px;
        color: gray;
        text-shadow: -1px -1px rgba(0,0,0,0.15);
        white-space: nowrap;
        transition: all cubic-bezier(0.3, 1.5, 0.7, 1) 0.3s;
    }
    input[type="checkbox"]:checked {background-color: var(--toggle-on-bg);}
    input[type="checkbox"]:checked::before {
        content: "Bật";
        color: var(--text);
        text-indent: -48px;
        left: 66px;
    }
</style>