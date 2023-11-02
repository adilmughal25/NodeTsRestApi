import { Request, Response } from "express";
import taskModel from "../models/taskModel";
import _ from "lodash";

class TaskController {
  async createTask(req: Request, res: Response) {
    try {
      // Create a new task instance using the TaskModel
      const newTask = new taskModel({
        name: req.body.name,
      });

      // Save the task to the database
      const savedTask = await newTask.save();

      const response = {
        task: {
          id: savedTask._id,
          name: savedTask.name,
        },
      };

      // Respond with the saved task
      res.status(201).json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create a new task" });
    }
  }

  async listTasks(req: Request, res: Response) {
    try {
      //Finding all the tasks, we have in the DB and sending it in response.
      const tasks = await taskModel.find();
      const response = _.map(tasks, (task) => _.omit(task.toObject(), "__v"));
      res.json(response);
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Failed to retrieve Tasks" });
    }
  }
}

export default new TaskController();
