import axios from 'axios';
import { taskService } from './taskService';
import { Task, Estado } from '../types'; // Asegúrate de importar el tipo Estado

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('taskService', () => {
  const mockTask: Task = {
    id: 1,
    titulo: 'Test Task',
    descripcion: 'Test Description',
    estado: 'Creada', // Esto ya es válido porque mockTask usa el tipo Task
    responsable: 'Test User',
    fechaCreacion: new Date().toISOString()
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch tasks', async () => {
    mockedAxios.get.mockResolvedValue({ data: [mockTask] });
    
    const result = await taskService.list();
    
    expect(mockedAxios.get).toHaveBeenCalledWith('/api/tareas');
    expect(result).toEqual([mockTask]);
  });

  it('should create a task', async () => {
    const taskData = {
      titulo: 'Test Task',
      descripcion: 'Test Description',
      estado: 'Creada' as Estado, // Aquí está el cambio importante
      responsable: 'Test User'
    };

    mockedAxios.post.mockResolvedValue({ data: mockTask });
    
    const result = await taskService.create(taskData);
    
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/tareas', taskData);
    expect(result).toEqual(mockTask);
  });

  // Tests para update
  it('should update a task', async () => {
    const updateData = {
      titulo: 'Updated Task',
      estado: 'En progreso' as Estado // También aquí
    };

    mockedAxios.patch.mockResolvedValue({ data: { ...mockTask, ...updateData } });
    
    const result = await taskService.update(1, updateData);
    
    expect(mockedAxios.patch).toHaveBeenCalledWith('/api/tareas/1', updateData);
    expect(result).toEqual({ ...mockTask, ...updateData });
  });

  // Test para remove
  it('should delete a task', async () => {
    mockedAxios.delete.mockResolvedValue({ data: {} });
    
    await taskService.remove(1);
    
    expect(mockedAxios.delete).toHaveBeenCalledWith('/api/tareas/1');
  });
});