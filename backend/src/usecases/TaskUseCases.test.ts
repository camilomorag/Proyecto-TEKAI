import { TaskUseCases } from './TaskUseCases';
import { taskRepository } from '../repositories/TaskRepository';
import { Task } from '../entity/Task';
import { CreateTaskDTO, UpdateTaskDTO } from '../dtos/TaskDTO';

jest.mock('../repositories/TaskRepository');

describe('TaskUseCases', () => {
  let useCases: TaskUseCases;

  beforeEach(() => {
    jest.clearAllMocks();
    useCases = new TaskUseCases();
  });

  describe('createTask', () => {
    it('should create and return a new task', async () => {
      const taskData: CreateTaskDTO = {
        titulo: 'New Task',
        descripcion: 'Description',
        estado: 'Creada',
        responsable: 'User'
      };

      const savedTask: Task = {
        id: 1,
        ...taskData,
        fechaCreacion: new Date()
      };

      (taskRepository.create as jest.Mock).mockReturnValue(taskData);
      (taskRepository.save as jest.Mock).mockResolvedValue(savedTask);

      const result = await useCases.createTask(taskData);

      expect(taskRepository.create).toHaveBeenCalledWith(taskData);
      expect(taskRepository.save).toHaveBeenCalledWith(taskData);
      expect(result).toEqual(savedTask);
    });
  });

  describe('getAllTasks', () => {
    it('should return all tasks', async () => {
      const tasks: Task[] = [
        {
          id: 1,
          titulo: 'Task 1',
          descripcion: 'Desc 1',
          estado: 'Creada',
          responsable: 'User 1',
          fechaCreacion: new Date()
        }
      ];

      (taskRepository.find as jest.Mock).mockResolvedValue(tasks);

      const result = await useCases.getAllTasks();

      expect(taskRepository.find).toHaveBeenCalled();
      expect(result).toEqual(tasks);
    });
  });

  // Tests similares para updateTask y deleteTask
});