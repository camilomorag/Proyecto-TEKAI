import request from 'supertest';
import express from 'express';
import taskRoutes from './taskRoutes';
import { TaskController } from '../controllers/TaskController';
import { TaskUseCases } from '../usecases/TaskUseCases';

jest.mock('../controllers/TaskController');
jest.mock('../usecases/TaskUseCases');

describe('Task Routes', () => {
  let app: express.Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api/tareas', taskRoutes);
  });

  it('POST /api/tareas should create a task', async () => {
    const mockTask = {
      id: 1,
      titulo: 'Test Task',
      descripcion: 'Test Description',
      estado: 'Creada',
      responsable: 'Test User',
      fechaCreacion: new Date().toISOString()
    };

    (TaskController as jest.Mock).mockImplementation(() => ({
      create: jest.fn().mockImplementation((req, res) => res.json(mockTask))
    }));

    const response = await request(app)
      .post('/api/tareas')
      .send({
        titulo: 'Test Task',
        descripcion: 'Test Description',
        estado: 'Creada',
        responsable: 'Test User'
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTask);
  });

  it('GET /api/tareas should return all tasks', async () => {
    const mockTasks = [
      {
        id: 1,
        titulo: 'Task 1',
        descripcion: 'Desc 1',
        estado: 'Creada',
        responsable: 'User 1',
        fechaCreacion: new Date().toISOString()
      }
    ];

    (TaskController as jest.Mock).mockImplementation(() => ({
      getAll: jest.fn().mockImplementation((req, res) => res.json(mockTasks))
    }));

    const response = await request(app).get('/api/tareas');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTasks);
  });

  // Tests similares para PATCH y DELETE
});