import { sveltekitSessionHandle } from "svelte-kit-sessions";
import { SESSION_KEY } from "$env/static/private";

export const handle = sveltekitSessionHandle({
    name: "SESSIONID",
    secret: SESSION_KEY
});