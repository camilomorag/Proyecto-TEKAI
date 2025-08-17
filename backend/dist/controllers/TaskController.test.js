"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Mock de TaskUseCases
const mockCreateTask = jest.fn();
const mockGetAllTasks = jest.fn();
const mockUpdateTask = jest.fn();
const mockDeleteTask = jest.fn();
jest.mock('../usecases/TaskUseCases', () => {
    return {
        TaskUseCases: jest.fn().mockImplementation(() => ({
            createTask: mockCreateTask,
            getAllTasks: mockGetAllTasks,
            updateTask: mockUpdateTask,
            deleteTask: mockDeleteTask
        }))
    };
});
// Importar el controlador después de configurar los mocks
const TaskController_1 = require("./TaskController");
describe('TaskController', () => {
    let controller;
    let mockRequest;
    let mockResponse;
    let responseObject;
    beforeEach(() => {
        jest.clearAllMocks();
        controller = new TaskController_1.TaskController();
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockImplementation((result) => {
                responseObject = result;
                return mockResponse;
            }),
        };
    });
    describe('create', () => {
        it('should create a task successfully', async () => {
            const taskData = {
                titulo: 'Test Task',
                descripcion: 'Test Description',
                estado: 'Creada',
                responsable: 'Test User'
            };
            const createdTask = {
                id: 1,
                ...taskData,
                fechaCreacion: new Date()
            };
            mockCreateTask.mockResolvedValue(createdTask);
            mockRequest.body = taskData;
            await controller.create(mockRequest, mockResponse);
            expect(mockCreateTask).toHaveBeenCalledWith(taskData);
            expect(mockResponse.json).toHaveBeenCalledWith(createdTask);
        });
        it('should handle validation errors', async () => {
            const invalidTaskData = {
                titulo: '',
                descripcion: 'Test Description',
                estado: 'Creada',
                responsable: 'Test User'
            };
            mockRequest.body = invalidTaskData;
            await controller.create(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(responseObject).toHaveProperty('error');
        });
    });
    describe('getAll', () => {
        it('should return all tasks', async () => {
            const tasks = [{
                    id: 1,
                    titulo: 'Task 1',
                    descripcion: 'Desc 1',
                    estado: 'Creada',
                    responsable: 'User 1',
                    fechaCreacion: new Date()
                }];
            mockGetAllTasks.mockResolvedValue(tasks);
            await controller.getAll(mockRequest, mockResponse);
            expect(mockGetAllTasks).toHaveBeenCalled();
            expect(mockResponse.json).toHaveBeenCalledWith(tasks);
        });
    });
    describe('update', () => {
        it('should update a task successfully', async () => {
            const taskId = 1;
            const updateData = {
                titulo: 'Updated Task',
                estado: 'En progreso'
            };
            const updatedTask = {
                id: taskId,
                titulo: 'Updated Task',
                descripcion: 'Original Description',
                estado: 'En progreso',
                responsable: 'Original User',
                fechaCreacion: new Date()
            };
            mockRequest.params = { id: taskId.toString() };
            mockRequest.body = updateData;
            mockUpdateTask.mockResolvedValue(updatedTask);
            await controller.update(mockRequest, mockResponse);
            expect(mockUpdateTask).toHaveBeenCalledWith(taskId, updateData);
            expect(mockResponse.json).toHaveBeenCalledWith(updatedTask);
        });
        it('should handle task not found', async () => {
            const taskId = 999;
            mockRequest.params = { id: taskId.toString() };
            mockRequest.body = { titulo: 'Update Attempt' };
            mockUpdateTask.mockResolvedValue(null);
            await controller.update(mockRequest, mockResponse);
            expect(mockResponse.json).toHaveBeenCalledWith(null);
        });
    });
    describe('delete', () => {
        it('should delete a task successfully', async () => {
            const taskId = 1;
            mockRequest.params = { id: taskId.toString() };
            mockDeleteTask.mockResolvedValue(undefined);
            await controller.delete(mockRequest, mockResponse);
            expect(mockDeleteTask).toHaveBeenCalledWith(taskId);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Tarea eliminada' });
        });
        it('should handle delete errors', async () => {
            const taskId = 1;
            mockRequest.params = { id: taskId.toString() };
            const error = new Error('Database error');
            mockDeleteTask.mockRejectedValue(error);
            await controller.delete(mockRequest, mockResponse);
            // Actualizado para esperar 400 en lugar de 500
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(responseObject).toEqual({ error: error.message });
        });
    });
});
//# sourceMappingURL=TaskController.test.js.map