import express from "express";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { AppDataSource } from "./data-source";
import taskRoutes from "./routes/taskRoutes";

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Kanban TEKAI',
      version: '1.0.0',
      description: 'Documentación de la API para el sistema Kanban de TEKAI',
    },
    servers: [
      { url: 'http://localhost:3001', description: 'Servidor de desarrollo' }
    ],
    components: {
      schemas: {
        Task: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            titulo: { type: 'string', example: 'Crear frontend' },
            descripcion: { type: 'string', example: 'Diseñar la interfaz Kanban' },
            estado: { 
              type: 'string',
              enum: ['Creada', 'En progreso', 'Bloqueada', 'Finalizada', 'Cancelada'],
              example: 'Creada'
            },
            responsable: { type: 'string', example: 'Juan Henao' },
            fechaCreacion: { type: 'string', format: 'date-time', example: '2025-08-14T10:00:00Z' }
          },
          required: ['titulo', 'descripcion', 'estado', 'responsable']
        }
      }
    }
  },
  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Base de datos conectada");

    app.use('/api/tareas', taskRoutes);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    app.listen(3001, () => {
      console.log("🚀 Servidor backend en http://localhost:3001");
      console.log("📚 Documentación API en http://localhost:3001/api-docs");
    });
  })
  .catch((error) => console.error("❌ Error al conectar la base de datos:", error));
