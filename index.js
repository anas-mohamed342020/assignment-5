import express from "express";
import { bootstrap } from "./src/bootstarp.js";
const app = express();
const port = 3000



bootstrap(app,express)


app.listen(port, () => {
    console.log(`Server started on ${port}`);
});