import { validateTaskInput } from './TaskValidator';
import { CreateTaskDTO } from '../dtos/TaskDTO';

describe('TaskValidator', () => {
  it('should validate correct input', () => {
    const validInput: CreateTaskDTO = {
      titulo: 'Tarea válida',
      descripcion: 'Descripción válida',
      estado: 'Creada',
      responsable: 'Juan Henao'
    };

    expect(() => validateTaskInput(validInput)).not.toThrow();
  });

  it('should throw error for missing fields', () => {
    const invalidInput = {
      titulo: 'Tarea inválida',
      // Faltan otros campos
    } as CreateTaskDTO;

    expect(() => validateTaskInput(invalidInput)).toThrow('Todos los campos son obligatorios');
  });

  it('should throw error for invalid estado', () => {
    const invalidInput: CreateTaskDTO = {
      titulo: 'Tarea inválida',
      descripcion: 'Descripción inválida',
      estado: 'EstadoInvalido' as any,
      responsable: 'Juan Henao'
    };

    expect(() => validateTaskInput(invalidInput)).toThrow('Estado inválido');
  });

  it('should throw error for title too long', () => {
    const invalidInput: CreateTaskDTO = {
      titulo: 'a'.repeat(101),
      descripcion: 'Descripción válida',
      estado: 'Creada',
      responsable: 'Juan Henao'
    };

    expect(() => validateTaskInput(invalidInput)).toThrow('El título no puede exceder los 100 caracteres');
  });
});