import { Request, Response } from "express";
import { TaskUseCases } from "../usecases/TaskUseCases";
import { validateTaskInput } from "../validators/TaskValidator";

const taskUseCases = new TaskUseCases();

// Asegúrate de que la clase esté exportada con 'export'
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
    const updated = await taskUseCases.updateTask(Number(req.params.id), req.body);
    res.json(updated);
  }

  async delete(req: Request, res: Response) {
    await taskUseCases.deleteTask(Number(req.params.id));
    res.json({ message: "Tarea eliminada" });
  }
}