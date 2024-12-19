import { sveltekitSessionHandle } from "svelte-kit-sessions";
import { SESSION_KEY, REDIS_HOST, REDIS_PASSWORD } from "$env/static/private";
import { Redis } from "ioredis"
import RedisStore from "svelte-kit-connect-redis";

const client = new Redis({
    host: REDIS_HOST,
    password: REDIS_PASSWORD
})

export const handle = sveltekitSessionHandle({
    name: "SESSIONID",
    secret: SESSION_KEY,
    store: new RedisStore({ client })
});