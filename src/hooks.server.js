import { sveltekitSessionHandle } from "svelte-kit-sessions";
import { SESSION_KEY } from "$env/static/private";

export const handle = sveltekitSessionHandle({
    name: "HT_SESSION",
    secret: SESSION_KEY
});