import {
  listTasks,
  createTask,
  findTaskById,
  completeTask,
  updateTaskTitle,
  deleteTask
} from "./taskService.js";

async function getTasks(request, response, next) {
  try {
    const tasks = await listTasks({
      completed: request.query.completed,
      sort: request.query.sort,
      page: request.query.page,
      limit: request.query.limit
    });

    response.json(tasks);
  } catch (error) {
    next(error);
  }
}

async function createTaskController(request, response, next) {
  try {
    const task = await createTask(request.body.title);
    response.status(201).json(task);
  } catch (error) {
    next(error);
  }
}

async function getTaskByIdController(request, response, next) {
  try {
    const id = Number(request.params.id);
    const task = await findTaskById(id);

    if (!task) {
      throw new Error("Task not found");
    }

    response.json(task);
  } catch (error) {
    next(error);
  }
}

async function completeTaskController(request, response, next) {
  try {
    const id = Number(request.params.id);
    const task = await completeTask(id);

    response.json(task);
  } catch (error) {
    next(error);
  }
}

async function updateTaskTitleController(request, response, next) {
  try {
    const id = Number(request.params.id);
    const newTitle = request.body.title;
    const task = await updateTaskTitle(id, newTitle);

    response.json(task);
  } catch (error) {
    next(error);
  }
}

async function deleteTaskController(request, response, next) {
  try {
    const id = Number(request.params.id);
    const task = await deleteTask(id);

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
  deleteTaskController,
};
