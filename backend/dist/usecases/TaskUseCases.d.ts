import { CreateTaskDTO, UpdateTaskDTO } from "../dtos/TaskDTO";
import { Task } from "../entity/Task";
export declare class TaskUseCases {
    createTask(data: CreateTaskDTO): Promise<Task>;
    getAllTasks(): Promise<Task[]>;
    updateTask(id: number, data: UpdateTaskDTO): Promise<Task | null>;
    deleteTask(id: number): Promise<void>;
}
//# sourceMappingURL=TaskUseCases.d.ts.map