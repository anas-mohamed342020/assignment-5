import express from "express";
import { bootstrap } from "./src/bootstarp.js";
const app = express();
const port = 3000


app.get('/',(req,res)=>{
    res.json({message:"welcom"})
})
bootstrap(app,express)


app.listen(port, () => {
    console.log(`Server started on ${port}`);
});