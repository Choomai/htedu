<script>
    import { enhance } from "$app/forms";
    import { app_name } from "$lib/const";
    import AuthDecoration from "/src/components/auth-decoration.svelte";
    import Safe from "safejslib";
    import { Turnstile } from "sveltekit-turnstile";
    import { PUBLIC_TURNSTILE_SITE_KEY } from "$env/static/public";
    let { form } = $props();
    let timeLeft = 0, email = $state(""), turnstileToken = "";

    async function sendOTP(e) {
        const formData = new FormData();
        formData.append("type", "reset-password");
        formData.append("token", turnstileToken);
        if (!Safe.validateEmail(email)) return alert("Sai định dạng email");
        formData.append("email", email);

        e.target.disabled = true;
        e.target.textContent = "Đang gửi...";
        const otpFetch = await fetch("/api/otp", { method: "POST", body: formData })
        if (otpFetch.ok) {
            timeLeft = 60;
            const wait_interval = setInterval(() => {
                timeLeft -= 1;
                e.target.textContent = `Gửi lại sau ${timeLeft}s`
            }, 1000);
            setTimeout(() => {
                clearInterval(wait_interval);
                e.target.disabled = false;
            }, timeLeft * 1000);
            return alert("Mã OTP đã được gửi, hãy kiểm tra mục Spam nếu không thấy mail!");
        } else if (otpFetch.status == 404) return alert("Email chưa được đăng ký trên hệ thống")
        else return alert("Đã xảy ra lỗi khi gửi mail, vui lòng thử lại sau.");
    }
</script>

<svelte:head>
    <title>Quên mật khẩu - {app_name}</title>
</svelte:head>

<div class="container">
    <AuthDecoration type="reset-password"/>
    <form action method="post" use:enhance>
        <h2>Quên mật khẩu</h2>
        {#if form?.success == false}<p>{form?.message}</p>{/if}
        <div class="input">
            <div class="email-wrapper">
                <input type="email" name="email" placeholder="Email" bind:value={email}>
                <input type="number" name="otp" placeholder="Mã OTP" min={1} max={999999}>
                <button type="button" onclick={sendOTP} disabled={!email}>Gửi OTP</button>
            </div>
            <input type="password" name="password" placeholder="Mật khẩu mới">
            <input type="password" name="password-confirm" placeholder="Xác nhận mật khẩu mới">
            <Turnstile siteKey={PUBLIC_TURNSTILE_SITE_KEY} size="flexible" on:turnstile-callback={e => turnstileToken = e.detail.token}/>
        </div>
        <div class="action">
            <button type="submit">Đổi mật khẩu</button>
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
    div.input input {font-size: 1.5rem;}
    
    div.email-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 1rem;
    }
    div.email-wrapper > input[type="email"] {flex-grow: 1;}
    div.email-wrapper > button {
        flex-grow: 2;
        font-size: 1.25rem;
    }

    div.action {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        width: 80%;
        font-size: 1.25rem;
        margin-top: 1rem;
    }
    div.action > button {
        width: 100%;
        font-size: 1.25rem;
    }
</style>