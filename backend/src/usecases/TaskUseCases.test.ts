import { TaskUseCases } from './TaskUseCases';
import { taskRepository } from '../repositories/TaskRepository';
import { Task } from '../entity/Task';
import { CreateTaskDTO, UpdateTaskDTO } from '../dtos/TaskDTO';
import { Estado } from '../dtos/TaskDTO';

jest.mock('../repositories/TaskRepository');

describe('TaskUseCases', () => {
  let useCases: TaskUseCases;
  const mockTask: Task = {
    id: 1,
    titulo: 'Test Task',
    descripcion: 'Test Description',
    estado: 'Creada',
    responsable: 'Test User',
    fechaCreacion: new Date()
  };

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
      const tasks: Task[] = [mockTask];

      (taskRepository.find as jest.Mock).mockResolvedValue(tasks);

      const result = await useCases.getAllTasks();

      expect(taskRepository.find).toHaveBeenCalled();
      expect(result).toEqual(tasks);
    });
  });

  describe('updateTask', () => {
    it('should update a task and return the updated task', async () => {
      const taskId = 1;
      const updateData: UpdateTaskDTO = {
        titulo: 'Updated Task',
        estado: 'En progreso'
      };

      const updatedTask = {
        ...mockTask,
        ...updateData
      };

      (taskRepository.update as jest.Mock).mockResolvedValue({ affected: 1 });
      (taskRepository.findOneBy as jest.Mock).mockResolvedValue(updatedTask);

      const result = await useCases.updateTask(taskId, updateData);

      expect(taskRepository.update).toHaveBeenCalledWith(taskId, updateData);
      expect(taskRepository.findOneBy).toHaveBeenCalledWith({ id: taskId });
      expect(result).toEqual(updatedTask);
    });

    it('should return null when task is not found', async () => {
      const taskId = 999;
      const updateData: UpdateTaskDTO = {
        titulo: 'Non-existent Task'
      };

      (taskRepository.update as jest.Mock).mockResolvedValue({ affected: 0 });
      (taskRepository.findOneBy as jest.Mock).mockResolvedValue(null);

      const result = await useCases.updateTask(taskId, updateData);

      expect(taskRepository.update).toHaveBeenCalledWith(taskId, updateData);
      expect(result).toBeNull();
    });

    it('should handle partial updates', async () => {
      const taskId = 1;
      const updateData: UpdateTaskDTO = {
        descripcion: 'Updated Description Only'
      };

      const updatedTask = {
        ...mockTask,
        ...updateData
      };

      (taskRepository.update as jest.Mock).mockResolvedValue({ affected: 1 });
      (taskRepository.findOneBy as jest.Mock).mockResolvedValue(updatedTask);

      const result = await useCases.updateTask(taskId, updateData);

      expect(taskRepository.update).toHaveBeenCalledWith(taskId, updateData);
      expect(result).toEqual(updatedTask);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task successfully', async () => {
      const taskId = 1;
      (taskRepository.delete as jest.Mock).mockResolvedValue({ affected: 1 });

      await useCases.deleteTask(taskId);

      expect(taskRepository.delete).toHaveBeenCalledWith(taskId);
    });

    it('should not throw error when deleting non-existent task', async () => {
      const taskId = 999;
      (taskRepository.delete as jest.Mock).mockResolvedValue({ affected: 0 });

      await expect(useCases.deleteTask(taskId)).resolves.not.toThrow();
      expect(taskRepository.delete).toHaveBeenCalledWith(taskId);
    });

    it('should throw error when database operation fails', async () => {
      const taskId = 1;
      (taskRepository.delete as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(useCases.deleteTask(taskId)).rejects.toThrow('Database error');
    });
  });
});