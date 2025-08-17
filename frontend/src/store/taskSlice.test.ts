import taskSlice, {
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    moveTaskLocally,
    rollbackTaskMove
  } from './taskSlice';
  import type { TaskState } from './taskSlice';
  import { Task, Estado } from '../types'; // Asegúrate de importar Estado
  
  describe('taskSlice', () => {
    const initialState: TaskState = {
      items: [],
      status: 'idle',
      error: undefined
    };
  
    // Mock task con el tipo correcto para estado
    const mockTask: Task = {
      id: 1,
      titulo: 'Test Task',
      descripcion: 'Test Description',
      estado: 'Creada' as Estado, // Aquí está el cambio clave
      responsable: 'Test User',
      fechaCreacion: new Date().toISOString()
    };
  
    it('should handle initial state', () => {
      expect(taskSlice(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle moveTaskLocally', () => {
      const stateWithTask = {
        ...initialState,
        items: [mockTask]
      };
  
      const action = moveTaskLocally({ id: 1, newEstado: 'En progreso' as Estado });
      const result = taskSlice(stateWithTask, action);
  
      expect(result.items[0].estado).toBe('En progreso');
    });
  
    it('should handle rollbackTaskMove', () => {
      const stateWithMovedTask = {
        ...initialState,
        items: [{ ...mockTask, estado: 'En progreso' as Estado }]
      };
  
      const action = rollbackTaskMove({ id: 1, prevEstado: 'Creada' as Estado });
      const result = taskSlice(stateWithMovedTask, action);
  
      expect(result.items[0].estado).toBe('Creada');
    });
  
    describe('async thunks', () => {
      it('should set status to loading when fetching tasks', () => {
        const action = fetchTasks.pending('', undefined);
        const state = taskSlice(initialState, action);
        
        expect(state.status).toBe('loading');
      });
  
      it('should handle fetchTasks.fulfilled', () => {
        const action = fetchTasks.fulfilled([mockTask], '', undefined);
        const state = taskSlice(initialState, action);
        
        expect(state.status).toBe('idle');
        expect(state.items).toEqual([mockTask]);
      });
  
      it('should handle createTask.fulfilled', () => {
        const action = createTask.fulfilled(mockTask, '', {
          titulo: 'Test Task',
          descripcion: 'Test Description',
          estado: 'Creada' as Estado,
          responsable: 'Test User'
        });
        const state = taskSlice(initialState, action);
        
        expect(state.items).toContainEqual(mockTask);
      });
  
      it('should handle updateTask.fulfilled', () => {
        const updatedTask = { ...mockTask, titulo: 'Updated Task' };
        const action = updateTask.fulfilled(updatedTask, '', {
          id: 1,
          partial: { titulo: 'Updated Task' }
        });
        const state = taskSlice({ ...initialState, items: [mockTask] }, action);
        
        expect(state.items[0].titulo).toBe('Updated Task');
      });
  
      it('should handle deleteTask.fulfilled', () => {
        const action = deleteTask.fulfilled(1, '', 1);
        const state = taskSlice({ ...initialState, items: [mockTask] }, action);
        
        expect(state.items.length).toBe(0);
      });
    });
  });