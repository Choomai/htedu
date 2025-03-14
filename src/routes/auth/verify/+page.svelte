<script>
    import AuthDecoration from "/src/components/auth-decoration.svelte";
    import { app_name } from "$lib/const";
    let { form } = $props();
    let timeLeft = 0;

    async function sendOTP(e) {
        const formData = new FormData();
        formData.append("type", "verify");
        const otpFetch = await fetch("/api/otp", { method: "POST", body: formData })
        if (otpFetch.ok) {
            e.target.disabled = true;
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
        }
        else return alert("Đã xảy ra lỗi khi gửi mail, vui lòng thử lại sau.");
    }
</script>

<svelte:head>
    <title>Xác minh - {app_name}</title>
</svelte:head>

<main>
    <h1 class="app-name">{app_name}</h1>
    <div class="container">
        <form action method="post">
            <!-- TODO: Add CAPCHA system -->
            {#if !form?.success}<p class="invalid">{form?.message}</p>{/if}
            <div class="input">
                <input type="number" min={1} max={999999} name="otp" placeholder="Mã OTP" required>
                <button type="button" onclick={sendOTP}>Gửi OTP</button>
            </div>
            <button type="submit">Xác nhận OTP</button>
        </form>
        <AuthDecoration type="verify"/>
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

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        width: 30%;
        font-size: 1.5rem;
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
        margin-top: .5rem;
        font-size: 1.25rem;
    }
</style>