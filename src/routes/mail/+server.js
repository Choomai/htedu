import { createTransport } from "nodemailer";
import { MAIL_HOST, MAIL_ACCOUNT, MAIL_PASSWORD } from "$env/static/private";
import { error } from "@sveltejs/kit";
import { randomInt } from "node:crypto"
import Safe from "safejslib";

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const mailTo = url.searchParams.get("to");
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
    const generatedOTP = randomInt(1, 999999);

    const info = await mailSender.sendMail({
        from: "no-reply@huongtraedu.site",
        to: mailTo,
        subject: "This is an OTP test",
        text: `Your OTP code is ${String(generatedOTP).padStart(6, "0")}`
    })
    return new Response(`Mail sent to ${mailTo}. Check your spam folder.\n${JSON.stringify(info, null, 4)}`);
}