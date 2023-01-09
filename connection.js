import mongoose from "mongoose";
import dotenv from "dotenv";

// Intialise config vars
dotenv.config({ path: "./config.env" });

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    try {
      console.log("successs");
    } catch (error) {
      console.log(error.message);
    }
  });
