<script>
    import { enhance } from "$app/forms";
    import { app_name, usernamePattern } from "$lib/const";
    import AuthDecoration from "/src/components/auth-decoration.svelte";
    import { Turnstile } from "sveltekit-turnstile";
    import { PUBLIC_TURNSTILE_SITE_KEY } from "$env/static/public";

    let { form } = $props();
    function validateUsername(e) {
        if (usernamePattern.test(e.target.value)) e.target.setCustomValidity("")
        else e.target.setCustomValidity("Username có độ dài 3 đến 32 kí tự, không chứa kí tự đặc biệt (ngoại trừ _ và .)");
    }
</script>

<svelte:head>
    <title>Đăng nhập - {app_name}</title>
</svelte:head>

<div class="container">
    <AuthDecoration type="login"/>
    <form action method="post" use:enhance>
        <h2>Đăng nhập</h2>
        {#if form?.success == false}<p>{form?.message}</p>{/if}
        <div class="input">
            <input type="text" name="username" onchange={validateUsername} oninput={e => e.target.setCustomValidity("")} placeholder="Tên đăng nhập">
            <input type="password" name="password" placeholder="Mật khẩu">
            <Turnstile siteKey={PUBLIC_TURNSTILE_SITE_KEY} size="flexible"/>
        </div>
        <div class="action">
            <a href="/auth/reset-password">Quên mật khẩu?</a>
            <button type="submit">Đăng nhập</button>
        </div>
    </form> 
</div>

<style>
    div.container {
        display: flex;
        flex-direction: row;
        flex-grow: 1;
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