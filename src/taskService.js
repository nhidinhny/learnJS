import {
  getAllTasks as getAllTasksFromRepository,
  createTask as createTaskInRepository,
  getTaskById as getTaskByIdFromRepository,
  completeTask as completeTaskInRepository,
  deleteTask as deleteTaskInRepository,
  updateTaskTitle as updateTaskTitleInRepository
} from "./taskRepository.js";

const tasks = [];
let nextId = 1;

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

async function getAllTasks() {
  const tasksFromDb = await getAllTasksFromRepository();
  return tasksFromDb.map((task) => ({
    id: task.id,
    title: task.title,
    completed: task.completed,
    createdAt: task.created_at
  }
  ));
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
  const tasksFromDb = await getAllTasksFromRepository();
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
  createTask,
  getAllTasks,
  findTaskById,
  completeTask,
  getPendingTasks,
  getTaskTitles,
  getPendingTaskTitles,
  deleteTask,
  updateTaskTitle,
};
