import { TaskController } from './TaskController';
import { TaskUseCases } from '../usecases/TaskUseCases';
import { Request, Response } from 'express';
import { Task } from '../entity/Task';

describe('TaskController', () => {
  let controller: TaskController;
  let mockUseCases: jest.Mocked<TaskUseCases>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  beforeEach(() => {
    mockUseCases = {
      createTask: jest.fn(),
      getAllTasks: jest.fn(),
      updateTask: jest.fn(),
      deleteTask: jest.fn(),
    } as unknown as jest.Mocked<TaskUseCases>;

    controller = new TaskController();

    // Mockear la instancia de TaskUseCases en el controlador
    (controller as any).taskUseCases = mockUseCases;

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

      const createdTask: Task = {
        id: 1,
        ...taskData,
        fechaCreacion: new Date()
      };

      mockRequest.body = taskData;
      mockUseCases.createTask.mockResolvedValue(createdTask);

      await controller.create(mockRequest as Request, mockResponse as Response);

      expect(mockUseCases.createTask).toHaveBeenCalledWith(taskData);
      expect(mockResponse.json).toHaveBeenCalledWith(createdTask);
    });

    it('should handle validation errors', async () => {
      const invalidTaskData = {
        titulo: '', // Título vacío es inválido
        descripcion: 'Test Description',
        estado: 'Creada',
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
      const tasks = [
        {
          id: 1,
          titulo: 'Task 1',
          descripcion: 'Desc 1',
          estado: 'Creada',
          responsable: 'User 1',
          fechaCreacion: new Date()
        }
      ];

      mockUseCases.getAllTasks.mockResolvedValue(tasks);

      await controller.getAll(mockRequest as Request, mockResponse as Response);

      expect(mockUseCases.getAllTasks).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(tasks);
    });
  });

  // Tests similares para update y delete
});