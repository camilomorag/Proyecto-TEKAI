import { Request, Response } from "express";
export declare class TaskController {
    create(req: Request, res: Response): Promise<void>;
    getAll(_: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}
export declare const taskController: TaskController;
//# sourceMappingURL=TaskController.d.ts.map