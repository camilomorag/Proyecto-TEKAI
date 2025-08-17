import { Request, Response } from 'express';
import { Task } from '../entity/Task';
import { Estado } from '../dtos/TaskDTO';

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
import { TaskController } from './TaskController';

describe('TaskController', () => {
  let controller: TaskController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  beforeEach(() => {
    jest.clearAllMocks();
    
    controller = new TaskController();
    
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
        estado: 'Creada' as Estado,
        responsable: 'Test User'
      };

      const createdTask: Task = {
        id: 1,
        ...taskData,
        fechaCreacion: new Date()
      };

      mockCreateTask.mockResolvedValue(createdTask);
      mockRequest.body = taskData;

      await controller.create(mockRequest as Request, mockResponse as Response);

      expect(mockCreateTask).toHaveBeenCalledWith(taskData);
      expect(mockResponse.json).toHaveBeenCalledWith(createdTask);
    });

    it('should handle validation errors', async () => {
      const invalidTaskData = {
        titulo: '',
        descripcion: 'Test Description',
        estado: 'Creada' as Estado,
        responsable: 'Test User'
      };

      mockRequest.body = invalidTaskData;

      await controller.create(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(responseObject).toHaveProperty('error');
    });
  });

  describe('getAll', () => {
    it('should return all tasks', async () => {
      const tasks: Task[] = [{
        id: 1,
        titulo: 'Task 1',
        descripcion: 'Desc 1',
        estado: 'Creada' as Estado,
        responsable: 'User 1',
        fechaCreacion: new Date()
      }];

      mockGetAllTasks.mockResolvedValue(tasks);

      await controller.getAll(mockRequest as Request, mockResponse as Response);

      expect(mockGetAllTasks).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(tasks);
    });
  });

  describe('update', () => {
    it('should update a task successfully', async () => {
      const taskId = 1;
      const updateData = {
        titulo: 'Updated Task',
        estado: 'En progreso' as Estado
      };

      const updatedTask: Task = {
        id: taskId,
        titulo: 'Updated Task',
        descripcion: 'Original Description',
        estado: 'En progreso' as Estado,
        responsable: 'Original User',
        fechaCreacion: new Date()
      };

      mockRequest.params = { id: taskId.toString() };
      mockRequest.body = updateData;
      mockUpdateTask.mockResolvedValue(updatedTask);

      await controller.update(mockRequest as Request, mockResponse as Response);

      expect(mockUpdateTask).toHaveBeenCalledWith(taskId, updateData);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedTask);
    });

    it('should handle task not found', async () => {
      const taskId = 999;
      mockRequest.params = { id: taskId.toString() };
      mockRequest.body = { titulo: 'Update Attempt' };
      mockUpdateTask.mockResolvedValue(null);

      await controller.update(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(null);
    });
  });

  describe('delete', () => {
    it('should delete a task successfully', async () => {
      const taskId = 1;
      mockRequest.params = { id: taskId.toString() };
      mockDeleteTask.mockResolvedValue(undefined);

      await controller.delete(mockRequest as Request, mockResponse as Response);

      expect(mockDeleteTask).toHaveBeenCalledWith(taskId);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Tarea eliminada' });
    });

    it('should handle delete errors', async () => {
      const taskId = 1;
      mockRequest.params = { id: taskId.toString() };
      const error = new Error('Database error');
      mockDeleteTask.mockRejectedValue(error);

      await controller.delete(mockRequest as Request, mockResponse as Response);

      // Actualizado para esperar 400 en lugar de 500
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(responseObject).toEqual({ error: error.message });
    });
  });
});