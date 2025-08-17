"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskController = exports.TaskController = void 0;
const TaskUseCases_1 = require("../usecases/TaskUseCases");
const TaskValidator_1 = require("../validators/TaskValidator");
const taskUseCases = new TaskUseCases_1.TaskUseCases();
class TaskController {
    async create(req, res) {
        try {
            (0, TaskValidator_1.validateTaskInput)(req.body);
            const task = await taskUseCases.createTask(req.body);
            res.json(task);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getAll(_, res) {
        const tasks = await taskUseCases.getAllTasks();
        res.json(tasks);
    }
    async update(req, res) {
        try {
            const updated = await taskUseCases.updateTask(Number(req.params.id), req.body);
            res.json(updated);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            await taskUseCases.deleteTask(Number(req.params.id));
            res.json({ message: "Tarea eliminada" });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.TaskController = TaskController;
// Exporta también una instancia por si acaso
exports.taskController = new TaskController();
//# sourceMappingURL=TaskController.js.map