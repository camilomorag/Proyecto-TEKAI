"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRepository = void 0;
const data_source_1 = require("../data-source");
const Task_1 = require("../entity/Task");
exports.taskRepository = data_source_1.AppDataSource.getRepository(Task_1.Task);
//# sourceMappingURL=TaskRepository.js.map