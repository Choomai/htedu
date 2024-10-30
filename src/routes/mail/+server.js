import { createTransport } from "nodemailer";
import { MAIL_HOST, MAIL_ACCOUNT, MAIL_PASSWORD } from "$env/static/private";
import { error } from "@sveltejs/kit";
import { randomInt } from "node:crypto"
import Safe from "safejslib";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
        subject: "Account activation at huongtraedu.site",
        html: readFileSync(join(__dirname, "otp.html"), { encoding: "utf-8" }).replace("%OTP%", String(generatedOTP).padStart(6, "0")) 
    })
    return new Response(`Mail sent to ${mailTo}. Check your spam folder.\n${JSON.stringify(info, null, 4)}`);
}