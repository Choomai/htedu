import { scryptSync, randomBytes } from "node:crypto";

const salt = randomBytes(16).toString("hex");
const password = "hi-mom!"
const hashed = scryptSync(password, salt, 64);
console.log(`${salt}:${hashed.toString("hex")}`)