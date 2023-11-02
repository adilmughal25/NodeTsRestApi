import express from "express";
import apiRouter from "./routes";
import mongoose from "mongoose";
import setup from "./routes";
import { config } from "dotenv";
config(); // Load environment variables from .env

// Access environment variables
const mongodbUri = process.env.dbUri || "default-value";

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(mongodbUri)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error: any) => {
    console.log("db error", error);
    process.exit(1);
  });
app.use(express.json());

setup(app);

app.use("/", apiRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
