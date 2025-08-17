"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TaskUseCases_1 = require("./TaskUseCases");
const TaskRepository_1 = require("../repositories/TaskRepository");
jest.mock('../repositories/TaskRepository');
describe('TaskUseCases', () => {
    let useCases;
    const mockTask = {
        id: 1,
        titulo: 'Test Task',
        descripcion: 'Test Description',
        estado: 'Creada',
        responsable: 'Test User',
        fechaCreacion: new Date()
    };
    beforeEach(() => {
        jest.clearAllMocks();
        useCases = new TaskUseCases_1.TaskUseCases();
    });
    describe('createTask', () => {
        it('should create and return a new task', async () => {
            const taskData = {
                titulo: 'New Task',
                descripcion: 'Description',
                estado: 'Creada',
                responsable: 'User'
            };
            const savedTask = {
                id: 1,
                ...taskData,
                fechaCreacion: new Date()
            };
            TaskRepository_1.taskRepository.create.mockReturnValue(taskData);
            TaskRepository_1.taskRepository.save.mockResolvedValue(savedTask);
            const result = await useCases.createTask(taskData);
            expect(TaskRepository_1.taskRepository.create).toHaveBeenCalledWith(taskData);
            expect(TaskRepository_1.taskRepository.save).toHaveBeenCalledWith(taskData);
            expect(result).toEqual(savedTask);
        });
    });
    describe('getAllTasks', () => {
        it('should return all tasks', async () => {
            const tasks = [mockTask];
            TaskRepository_1.taskRepository.find.mockResolvedValue(tasks);
            const result = await useCases.getAllTasks();
            expect(TaskRepository_1.taskRepository.find).toHaveBeenCalled();
            expect(result).toEqual(tasks);
        });
    });
    describe('updateTask', () => {
        it('should update a task and return the updated task', async () => {
            const taskId = 1;
            const updateData = {
                titulo: 'Updated Task',
                estado: 'En progreso'
            };
            const updatedTask = {
                ...mockTask,
                ...updateData
            };
            TaskRepository_1.taskRepository.update.mockResolvedValue({ affected: 1 });
            TaskRepository_1.taskRepository.findOneBy.mockResolvedValue(updatedTask);
            const result = await useCases.updateTask(taskId, updateData);
            expect(TaskRepository_1.taskRepository.update).toHaveBeenCalledWith(taskId, updateData);
            expect(TaskRepository_1.taskRepository.findOneBy).toHaveBeenCalledWith({ id: taskId });
            expect(result).toEqual(updatedTask);
        });
        it('should return null when task is not found', async () => {
            const taskId = 999;
            const updateData = {
                titulo: 'Non-existent Task'
            };
            TaskRepository_1.taskRepository.update.mockResolvedValue({ affected: 0 });
            TaskRepository_1.taskRepository.findOneBy.mockResolvedValue(null);
            const result = await useCases.updateTask(taskId, updateData);
            expect(TaskRepository_1.taskRepository.update).toHaveBeenCalledWith(taskId, updateData);
            expect(result).toBeNull();
        });
        it('should handle partial updates', async () => {
            const taskId = 1;
            const updateData = {
                descripcion: 'Updated Description Only'
            };
            const updatedTask = {
                ...mockTask,
                ...updateData
            };
            TaskRepository_1.taskRepository.update.mockResolvedValue({ affected: 1 });
            TaskRepository_1.taskRepository.findOneBy.mockResolvedValue(updatedTask);
            const result = await useCases.updateTask(taskId, updateData);
            expect(TaskRepository_1.taskRepository.update).toHaveBeenCalledWith(taskId, updateData);
            expect(result).toEqual(updatedTask);
        });
    });
    describe('deleteTask', () => {
        it('should delete a task successfully', async () => {
            const taskId = 1;
            TaskRepository_1.taskRepository.delete.mockResolvedValue({ affected: 1 });
            await useCases.deleteTask(taskId);
            expect(TaskRepository_1.taskRepository.delete).toHaveBeenCalledWith(taskId);
        });
        it('should not throw error when deleting non-existent task', async () => {
            const taskId = 999;
            TaskRepository_1.taskRepository.delete.mockResolvedValue({ affected: 0 });
            await expect(useCases.deleteTask(taskId)).resolves.not.toThrow();
            expect(TaskRepository_1.taskRepository.delete).toHaveBeenCalledWith(taskId);
        });
        it('should throw error when database operation fails', async () => {
            const taskId = 1;
            TaskRepository_1.taskRepository.delete.mockRejectedValue(new Error('Database error'));
            await expect(useCases.deleteTask(taskId)).rejects.toThrow('Database error');
        });
    });
});
//# sourceMappingURL=TaskUseCases.test.js.map