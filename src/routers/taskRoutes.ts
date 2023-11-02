import { Router } from "express";
import { tokenValidationMiddleware } from "../middleware/authentication";
import taskController from "../controllers/taskController";
import TaskSchema from "../schema/taskSchema";

const router = Router();

router.post(
  "/create-task",
  TaskSchema,
  tokenValidationMiddleware,
  taskController.createTask
);
router.get(
  "/list-tasks",
  TaskSchema,
  tokenValidationMiddleware,
  taskController.listTasks
);

export default router;
