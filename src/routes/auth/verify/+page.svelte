<script>
    import { Turnstile } from "sveltekit-turnstile";
    import AuthDecoration from "/src/components/auth-decoration.svelte";
    import { PUBLIC_TURNSTILE_SITE_KEY } from "$env/static/public";
    import { app_name } from "$lib/const";
    let { form } = $props();
    let timeLeft = 0;
    let turnstileToken = "";

    async function sendOTP(e) {
        const formData = new FormData();
        formData.append("type", "verify");
        formData.append("token", turnstileToken);
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
        } else if (otpFetch.status == 409) return alert("Xác thực capcha thất bại, vui lòng tải lại trang")
        else return alert("Đã xảy ra lỗi khi gửi mail, vui lòng thử lại sau.");
    }
</script>

<svelte:head>
    <title>Xác minh - {app_name}</title>
</svelte:head>

<div class="container">
    <AuthDecoration type="verify"/>
    <form action method="post">
        {#if !form?.success}<p class="invalid">{form?.message}</p>{/if}
        <div class="input">
            <input type="number" min={1} max={999999} name="otp" placeholder="Mã OTP" required>
            <button type="button" onclick={sendOTP}>Gửi OTP</button>
        </div>
        <Turnstile siteKey={PUBLIC_TURNSTILE_SITE_KEY} on:turnstile-callback={e => turnstileToken = e.detail.token}/>
        <button type="submit">Xác nhận OTP</button>
    </form>
</div>

<style>
    div.container {
        display: flex;
        flex-direction: row-reverse;
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
        gap: .5rem;
    }
    p.invalid {
        color: red;
        font-weight: bold;
        margin-top: 0;
    }
    div.input {
        display: flex;
        gap: 1rem;
    }
    div.input > input {
        font-size: 1rem;
    }
    button[type="submit"] {
        width: 80%;
        font-size: 1.25rem;
    }
</style>