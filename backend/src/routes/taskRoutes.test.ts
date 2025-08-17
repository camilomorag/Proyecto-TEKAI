// src/routes/taskRoutes.test.ts
import request from 'supertest';
import express from 'express';
import { Router } from 'express';

// Mock de TaskController completo
jest.mock('../controllers/TaskController', () => {
  return {
    TaskController: jest.fn().mockImplementation(() => ({
      create: jest.fn((req, res) => res.json({})),
      getAll: jest.fn((req, res) => res.json([])),
      update: jest.fn((req, res) => res.json({})),
      delete: jest.fn((req, res) => res.json({ message: 'Tarea eliminada' }))
    }))
  };
});

// Importar las rutas después de configurar el mock
import taskRoutes from './taskRoutes';

describe('Task Routes', () => {
  let app: express.Express;
  let server: any;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api/tareas', taskRoutes);
    server = app.listen(0); // Puerto aleatorio para tests
  });

  afterAll((done) => {
    server.close(done);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/tareas', () => {
    it('should create a task', async () => {
      const taskData = {
        titulo: 'Test Task',
        descripcion: 'Test Description',
        estado: 'Creada',
        responsable: 'Test User'
      };

      const response = await request(app)
        .post('/api/tareas')
        .send(taskData);

      expect(response.status).toBe(200);
    });
  });

  describe('GET /api/tareas', () => {
    it('should get all tasks', async () => {
      const response = await request(app)
        .get('/api/tareas');

      expect(response.status).toBe(200);
    });
  });

  describe('PATCH /api/tareas/:id', () => {
    it('should update a task', async () => {
      const taskId = 1;
      const updateData = {
        titulo: 'Updated Task'
      };

      const response = await request(app)
        .patch(`/api/tareas/${taskId}`)
        .send(updateData);

      expect(response.status).toBe(200);
    });
  });

  describe('DELETE /api/tareas/:id', () => {
    it('should delete a task', async () => {
      const taskId = 1;

      const response = await request(app)
        .delete(`/api/tareas/${taskId}`);

      expect(response.status).toBe(200);
    });
  });
});