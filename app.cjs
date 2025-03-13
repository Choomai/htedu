const path = requiore("node:path");
const express = require("express");

const app = express();
const app_port = process.env.PORT || 3000;
app.use("/ass", express.static(path.join(__dirname, "static", "ass")));
app.use("/avatars", express.static(path.join(__dirname, "static", "avatars")));
app.use("/docs", express.static(path.join(__dirname, "static", "docs")));
app.use("/imgs", express.static(path.join(__dirname, "static", "imgs")));

(async () => {
    // let SvelteKit handle everything else, including serving prerendered pages and static assets
    const { handler } = await import("./handler.js");
    app.use(handler);
    
    app.listen(app_port, () => console.log(`Listening on port ${app_port}`));
})()