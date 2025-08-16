import { AppDataSource } from "../data-source";
import { Task } from "../entity/Task";

export const taskRepository = AppDataSource.getRepository(Task);
