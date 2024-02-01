//import {toto} from "./module.js";

//console.log(toto);

import Express from "express";
import mongoose from "mongoose";

const app = Express();
app.use(Express.json());
const mid1 =(req, res, next) =>{
    req.user = {name: "Josh"};
    next()
}
const mid2 =(req, res, next) =>{
    console.log(req.user.name);
    res.send("Hello");
}
async function connect(){
    try {
        await mongoose.connect("mongodb://localhost:27017/sample_db");
        console.log("Mongodb connected");
        app.listen(3000, ()=>{
            console.log("running port 3000");
        })
    } catch (err){
        console.log(err);
    }
}

connect()