// src/controllers/TaskController.ts
import { Request, Response } from "express";
import { TaskUseCases } from "../usecases/TaskUseCases";
import { validateTaskInput } from "../validators/TaskValidator";

const taskUseCases = new TaskUseCases();

export class TaskController {
  async create(req: Request, res: Response) {
    try {
      validateTaskInput(req.body);
      const task = await taskUseCases.createTask(req.body);
      res.json(task);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(_: Request, res: Response) {
    const tasks = await taskUseCases.getAllTasks();
    res.json(tasks);
  }

  async update(req: Request, res: Response) {
    try {
      const updated = await taskUseCases.updateTask(Number(req.params.id), req.body);
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await taskUseCases.deleteTask(Number(req.params.id));
      res.json({ message: "Tarea eliminada" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

// Exporta también una instancia por si acaso
export const taskController = new TaskController();