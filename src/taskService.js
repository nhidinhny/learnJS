import {
  createTask as createTaskInRepository,
  getTaskById as getTaskByIdFromRepository,
  completeTask as completeTaskInRepository,
  deleteTask as deleteTaskInRepository,
  updateTaskTitle as updateTaskTitleInRepository,
  listTasks as listTasksFromRepository,
} from "./taskRepository.js";

const tasks = [];
let nextId = 1;

// Keep this wrapper temporarily for older callers such as src/index.js.
async function getAllTasks() {
  return listTasks();
}

async function createTask(title) {
  if (typeof title !== "string") {
    throw new Error("Title must be a string");
  }
  const normalizedTitle = title.trim();

  if (normalizedTitle === "") {
    throw new Error("Title must not be empty");
  }

  const newTaskFromDb = await createTaskInRepository(normalizedTitle);

  return {
    id: newTaskFromDb.id,
    title: newTaskFromDb.title,
    completed: newTaskFromDb.completed,
    createdAt: newTaskFromDb.created_at
  };
}

async function listTasks({
  completed,
  sort = "asc",
  page,
  limit
} = {}) {
  // Validate the requested sorting direction.
  if (sort !== "asc" && sort !== "desc") {
    throw new Error("sort must be asc or desc");
  }

  let completedBoolean;

  // Query parameters are strings, so convert completed to a boolean.
  if (completed !== undefined) {
    if (completed !== "true" && completed !== "false") {
      throw new Error("completed must be true or false");
    }

    completedBoolean = completed === "true";
  }

  const hasPagination =
    page !== undefined || limit !== undefined;

  let limitNumber;
  let offset;

  if (hasPagination) {
    // page and limit must be supplied together.
    if (page === undefined || limit === undefined) {
      throw new Error("page and limit must be provided together");
    }

    const pageNumber = Number(page);
    limitNumber = Number(limit);

    if (!Number.isInteger(pageNumber) || pageNumber < 1) {
      throw new Error("page must be a positive integer");
    }

    if (!Number.isInteger(limitNumber) || limitNumber < 1) {
      throw new Error("limit must be a positive integer");
    }

    offset = (pageNumber - 1) * limitNumber;
  }

  const tasksFromDb = await listTasksFromRepository({
    completed: completedBoolean,
    sortOrder: sort === "desc" ? "DESC" : "ASC",
    limit: limitNumber,
    offset
  });

  return tasksFromDb.map((task) => ({
    id: task.id,
    title: task.title,
    completed: task.completed,
    createdAt: task.created_at
  }));
}

async function findTaskById(id) {
  const taskFromDb = await getTaskByIdFromRepository(id);

  if (!taskFromDb) {
    return undefined;
  }

  return {
    id: taskFromDb.id,
    title: taskFromDb.title,
    completed: taskFromDb.completed,
    createdAt: taskFromDb.created_at
  };
}

async function completeTask(id) {
  const taskFromDb = await completeTaskInRepository(id);

  if (!taskFromDb) {
    throw new Error("Task not found");
  }

  return {
    id: taskFromDb.id,
    title: taskFromDb.title,
    completed: taskFromDb.completed,
    createdAt: taskFromDb.created_at
  };
}

function getPendingTasks() {
  return tasks.filter((task) => task.completed === false);
}

async function getTaskTitles() {
  const tasksFromDb = await listTasksFromRepository();
  return tasksFromDb.map((task) => task.title);
}

function getPendingTaskTitles() {
  return tasks
    .filter((task) => task.completed === false)
    .map((task) => task.title);
}

async function deleteTask(id) {
  const taskFromDb = await deleteTaskInRepository(id);

  if (!taskFromDb) {
    throw new Error("Task not found");
  }

  return {
    id: taskFromDb.id,
    title: taskFromDb.title,
    completed: taskFromDb.completed,
    createdAt: taskFromDb.created_at
  };
}

async function updateTaskTitle(id, newTitle) {

  if (typeof newTitle !== "string") {
    throw new Error("Title must be a string");
  }

  const normalizedTitle = newTitle.trim();
  if (normalizedTitle === "") {
    throw new Error("Title must not be empty");
  }

  const taskFromDb = await updateTaskTitleInRepository(id, normalizedTitle);

  if (!taskFromDb) {
    throw new Error("Task not found");
  }

  return {
    id: taskFromDb.id,
    title: taskFromDb.title,
    completed: taskFromDb.completed,
    createdAt: taskFromDb.created_at
  };
}

export {
  listTasks,
  createTask,
  findTaskById,
  completeTask,
  getPendingTasks,
  getTaskTitles,
  getPendingTaskTitles,
  deleteTask,
  updateTaskTitle,
};
