//import {toto} from "./module.js";

//console.log(toto);

import Express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";

const app = Express();

app.use(Express.json());

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/sample_db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.use("/user", userRouter);
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  } catch (err) {
    console.log(err);
  }
}

connect();