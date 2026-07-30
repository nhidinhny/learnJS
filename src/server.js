import express from "express";
import {
    getTasks,
    createTaskController,
    getTaskByIdController,
    completeTaskController,
    updateTaskTitleController,
    deleteTaskController
} from "./taskController.js";

const app = express();
app.use(express.json());
const PORT = 7777;

app.get("/health", (request, response) => {
    response.json({ status: "ok" });
});

app.get("/tasks", getTasks);

app.post("/tasks", createTaskController);

app.get("/tasks/:id", getTaskByIdController);

app.patch("/tasks/:id/complete", completeTaskController);

app.patch("/tasks/:id", updateTaskTitleController);

app.delete("/tasks/:id", deleteTaskController);

app.use((error, request, response, next) => {
    const status =
        error.message === "Task not found" ? 404 : 400;

    response.status(status).json({
        message: error.message
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
