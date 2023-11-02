import { Express } from "express";
import userRoutes from "./routers/userRoutes";
import taskRoutes from "./routers/taskRoutes";

export default function setup(app: Express) {
  app.use("/users", userRoutes);
  app.use("/tasks", taskRoutes);
}
