import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, searchForWorkspaceRoot } from "vite";

export default defineConfig({
	server: {
		fs: {
			allow: [
				searchForWorkspaceRoot(process.cwd()),
				"package.json",
				"/static/assignments",
				"/static/avatars",
				"/static/docs"
			]
		}
	},
	plugins: [sveltekit()]
});