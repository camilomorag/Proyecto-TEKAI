"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const data_source_1 = require("./data-source");
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
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
            {
                url: 'http://localhost:3001',
                description: 'Servidor de desarrollo',
            },
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
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.ts'], // Solo busca en routes (o usa rutas absolutas si es necesario)
};
const specs = (0, swagger_jsdoc_1.default)(options);
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("📦 Base de datos conectada");
    app.use('/api/tareas', taskRoutes_1.default);
    // Ruta para la documentación Swagger UI
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    app.listen(3001, () => {
        console.log("🚀 Servidor backend en http://localhost:3001");
        console.log("📚 Documentación API en http://localhost:3001/api-docs");
    });
})
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map