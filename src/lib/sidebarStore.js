import { writable } from "svelte/store";

// Check if we're in a server-side rendering environment
const isSSR = typeof window === 'undefined';

// Get the initial value based on the screen width
let initialValue = isSSR ? true : window.innerWidth > 768;

export const sidebarState = writable(initialValue);
export const onMobile = writable(initialValue);

// Update sidebarState when the window is resized
if (!isSSR) {
    window.addEventListener("resize", () => {
        sidebarState.set(window.innerWidth > 768);
        onMobile.set(window.innerWidth > 768);
    });
}