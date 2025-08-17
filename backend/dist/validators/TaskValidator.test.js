"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TaskValidator_1 = require("./TaskValidator");
describe('TaskValidator', () => {
    it('should validate correct input', () => {
        const validInput = {
            titulo: 'Tarea válida',
            descripcion: 'Descripción válida',
            estado: 'Creada',
            responsable: 'Juan Henao'
        };
        expect(() => (0, TaskValidator_1.validateTaskInput)(validInput)).not.toThrow();
    });
    it('should throw error for missing fields', () => {
        const invalidInput = {
            titulo: 'Tarea inválida',
            // Faltan otros campos
        };
        expect(() => (0, TaskValidator_1.validateTaskInput)(invalidInput)).toThrow('Todos los campos son obligatorios');
    });
    it('should throw error for invalid estado', () => {
        const invalidInput = {
            titulo: 'Tarea inválida',
            descripcion: 'Descripción inválida',
            estado: 'EstadoInvalido',
            responsable: 'Juan Henao'
        };
        expect(() => (0, TaskValidator_1.validateTaskInput)(invalidInput)).toThrow('Estado inválido');
    });
    it('should throw error for title too long', () => {
        const invalidInput = {
            titulo: 'a'.repeat(101),
            descripcion: 'Descripción válida',
            estado: 'Creada',
            responsable: 'Juan Henao'
        };
        expect(() => (0, TaskValidator_1.validateTaskInput)(invalidInput)).toThrow('El título no puede exceder los 100 caracteres');
    });
});
//# sourceMappingURL=TaskValidator.test.js.map