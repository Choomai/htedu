import { createTransport } from "nodemailer";
import { MAIL_HOST, MAIL_ACCOUNT, MAIL_PASSWORD } from "$env/static/private";
import { error } from "@sveltejs/kit";
import { randomInt } from "node:crypto"
import Safe from "safejslib";
import { pool } from "$lib/db";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
    const data = await request.formData();
    const { session } = locals;
    const mailTo = session.data.email || data.get("email");
    if (!Safe.validateEmail(mailTo)) return error(400);
    const mailSender = createTransport({
        host: MAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: MAIL_ACCOUNT,
            pass: MAIL_PASSWORD
        }
    });
    
    // OTP code, 6 digits
    const generatedOTP = String(randomInt(1, 999999)).padStart(6, "0");

    // const otpType = data.get("type");
    // if (otpType == "")
    let username = null;
    
    if (!session.data.username) {
        const [usernameRows] = await pool.execute("SELECT username FROM users WHERE email = ?", [mailTo]);
        if (usernameRows.length == 0) error(404, "Email isn't registered");
        username = usernameRows[0].username;
    }
    await pool.execute("INSERT INTO otp(username, otp) VALUES (?, ?) ON DUPLICATE KEY UPDATE otp = ?", [session.data.username ?? username, generatedOTP, generatedOTP]);
    try {
        await mailSender.sendMail({
            from: "no-reply@huongtraedu.site",
            to: mailTo,
            subject: `Verify OTP: ${generatedOTP}`,
            text: `Your OTP code is ${generatedOTP}. This code will expire in 10 minutes.`
        })
    } catch (err) {
        error(500, "Failed to send mail");
        console.error(err);
    }
    return new Response(`Mail sent to ${mailTo}`);
}