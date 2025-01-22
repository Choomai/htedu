import { sveltekitSessionHandle } from "svelte-kit-sessions";
import RedisStore from "svelte-kit-connect-redis";
import fs from "node:fs";
import { Redis } from "ioredis";
import { REDIS_HOST, REDIS_PASSWORD, SESSION_KEY } from "$env/static/private";
const client = new Redis({
    host: REDIS_HOST,
    password: REDIS_PASSWORD,
    tls: { rejectUnauthorized: false }
})

export const handle = sveltekitSessionHandle({
    name: "HT_SESSION",
    secret: SESSION_KEY,
    store: new RedisStore({ client })
});