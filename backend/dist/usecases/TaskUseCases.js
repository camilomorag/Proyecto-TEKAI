"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskUseCases = void 0;
const TaskRepository_1 = require("../repositories/TaskRepository");
class TaskUseCases {
    async createTask(data) {
        const task = TaskRepository_1.taskRepository.create(data);
        return await TaskRepository_1.taskRepository.save(task);
    }
    async getAllTasks() {
        return await TaskRepository_1.taskRepository.find();
    }
    async updateTask(id, data) {
        await TaskRepository_1.taskRepository.update(id, data);
        return await TaskRepository_1.taskRepository.findOneBy({ id });
    }
    async deleteTask(id) {
        await TaskRepository_1.taskRepository.delete(id);
    }
}
exports.TaskUseCases = TaskUseCases;
//# sourceMappingURL=TaskUseCases.js.map