import test from "node:test";
import assert from "node:assert/strict";

import {
  completeTask,
  createTask,
  deleteTask,
  findTaskById,
  getAllTasks,
  updateTaskTitle
} from "../src/taskService.js";

test("task service supports the core CRUD flow", () => {
  const createdTask = createTask("  Build portfolio project  ");

  assert.equal(createdTask.title, "Build portfolio project");
  assert.equal(createdTask.completed, false);
  assert.equal(findTaskById(createdTask.id), createdTask);
  assert.ok(getAllTasks().includes(createdTask));

  const updatedTask = updateTaskTitle(createdTask.id, "Publish portfolio");
  assert.equal(updatedTask.title, "Publish portfolio");

  const completedTask = completeTask(createdTask.id);
  assert.equal(completedTask.completed, true);

  const deletedTask = deleteTask(createdTask.id);
  assert.equal(deletedTask, createdTask);
  assert.equal(findTaskById(createdTask.id), undefined);
});

test("task service rejects invalid input and missing tasks", () => {
  assert.throws(() => createTask("   "), /Title must not be empty/);
  assert.throws(() => createTask(null), /Title must be a string/);
  assert.throws(() => completeTask(999999), /Task not found/);
  assert.throws(() => deleteTask(999999), /Task not found/);
});
