const express = require("express");

const app = express();
const app_port = process.env.PORT || 3000;
app.use("/static", express.static("static"));

(async () => {
    // let SvelteKit handle everything else, including serving prerendered pages and static assets
    const { handler } = await import("./handler.js");
    app.use(handler);
    
    app.listen(app_port, () => console.log(`Listening on port ${app_port}`));
})()