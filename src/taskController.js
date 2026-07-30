import {
    getAllTasks,
    createTask,
    findTaskById,
    completeTask,
    updateTaskTitle,
    deleteTask
} from "./taskService.js";

function getTasks(request, response) {
    const tasks = getAllTasks();
    response.json(tasks);
}

function createTaskController(request, response, next) {
    try {
        const task = createTask(request.body.title);
        response.status(201).json(task);
    } catch (error) {
        next(error);
    }
}

function getTaskByIdController(request, response, next) {
    try {
        const id = Number(request.params.id);
        const task = findTaskById(id);

        if (!task) {
            throw new Error("Task not found");
        }

        response.json(task);
    } catch (error) {
        next(error);
    }
}

function completeTaskController(request, response, next) {
    try {
        const id = Number(request.params.id);
        const task = completeTask(id);

        response.json(task);
    } catch (error) {
        next(error);
    }
}

function updateTaskTitleController(request, response, next) {
    try {
        const id = Number(request.params.id);
        const newTitle = request.body.title;
        const task = updateTaskTitle(id, newTitle);

        response.json(task);
    } catch (error) {
        next(error);
    }
}

function deleteTaskController(request, response, next) {
    try {
        const id = Number(request.params.id);
        const task = deleteTask(id);

        response.json(task);
    } catch (error) {
        next(error);
    }
}

export {
    getTasks,
    createTaskController,
    getTaskByIdController,
    completeTaskController,
    updateTaskTitleController,
    deleteTaskController
};
