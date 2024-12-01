import { createTransport } from "nodemailer";
import { MAIL_HOST, MAIL_ACCOUNT, MAIL_PASSWORD } from "$env/static/private";
import { error } from "@sveltejs/kit";
import { randomInt } from "node:crypto"
import Safe from "safejslib";

/** @type {import('./$types').RequestHandler} */
export async function POST({ locals }) {
    const { session } = locals;
    const mailTo = session.data.email;
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
    try {
        const info = await mailSender.sendMail({
            from: "no-reply@huongtraedu.site",
            to: mailTo,
            subject: `Verify OTP: ${generatedOTP}`,
            text: `Your OTP code is ${generatedOTP}. This code will expire in 10 minutes.`
        })
        return new Response(`Mail sent to ${mailTo}.`);
    } catch {throw error(400, "Failed to send email.")}
}