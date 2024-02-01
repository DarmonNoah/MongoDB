//import {toto} from "./module.js";

//console.log(toto);

import Express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import "dotenv/config.js";

const app = Express();

async function connect() {
  try {
    // Middlewares
    app.use(Express.json());

    // Connect to MongoDB
    await mongoose.connect("mongodb://localhost:27017/sample_db");
    console.log("Connected to MongoDB");

    // Routes
    app.use("/users", userRouter);

    // Start server
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  } catch (err) {
    console.log(err);
  }
}

connect();