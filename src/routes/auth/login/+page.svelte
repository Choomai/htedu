<script>
    import { enhance } from "$app/forms";
    import { app_name } from "$lib/const";
    import AuthDecoration from "/src/components/auth-decoration.svelte";
    let { form } = $props();
</script>

<svelte:head>
    <title>Đăng nhập - {app_name}</title>
</svelte:head>

<main>
    <h1 class="app-name">{app_name}</h1>
    <div class="container">
        <AuthDecoration type="login"/>
        <form action method="post" use:enhance>
            <h2>Đăng nhập</h2>
            {#if form?.success == false}<p>{form?.message}</p>{/if}
            <div class="input">
                <input type="text" name="username" placeholder="Tên đăng nhập">
                <input type="password" name="password" placeholder="Mật khẩu">
            </div>
            <div class="action">
                <a href="/auth/reset-password">Quên mật khẩu?</a>
                <button type="submit">Đăng nhập</button>
            </div>
        </form> 
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
    form > h2 {margin-bottom: revert;}
    form > p {
        margin-top: 0;
        color: red;
    }
    div.input {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 80%;
    }
    div.input > input {font-size: 1.5rem;}
    div.action {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        width: 80%;
        font-size: 1.25rem;
    }
    div.action > a {
        display: block;
        align-self: flex-end;
    }
    div.action > button {
        width: 100%;
        font-size: 1.25rem;
    }
</style>