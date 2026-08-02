import {
  getAllTasks as getAllTasksFromRepository
} from "./taskRepository.js";

const tasks = [];
let nextId = 1;

function createTask(title) {
  if (typeof title !== "string") {
    throw new Error("Title must be a string");
  }
  const normalizedTitle = title.trim();

  if (normalizedTitle === "") {
    throw new Error("Title must not be empty");
  }

  const task = {
    id: nextId,
    title: normalizedTitle,
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(task);
  nextId += 1;
  return task;
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

function findTaskById(id) {
  return tasks.find((task) => task.id === id);
}

function completeTask(id) {
  const task = findTaskById(id);

  if (!task) {
    throw new Error("Task not found");
  }

  task.completed = true;
  return task;
}

function getPendingTasks() {
  return tasks.filter((task) => task.completed === false);
}

function getTaskTitles() {
  return tasks.map((task) => task.title);
}

function getPendingTaskTitles() {
  return tasks
    .filter((task) => task.completed === false)
    .map((task) => task.title);
}

function deleteTask(id) {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    throw new Error("Task not found");
  }

  const removedItems = tasks.splice(index, 1);

  return removedItems[0];
}

function updateTaskTitle(id, newTitle) {
  const task = findTaskById(id);

  if (!task) {
    throw new Error("Task not found");
  }

  if (typeof newTitle !== "string") {
    throw new Error("Title must be a string");
  }

  const normalizedTitle = newTitle.trim();

  if (normalizedTitle === "") {
    throw new Error("Title must not be empty");
  }

  task.title = normalizedTitle;
  return task;
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
  updateTaskTitle
};
