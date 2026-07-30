import {
    completeTask,
    createTask,
    findTaskById,
    getPendingTasks,
    getAllTasks,
    getTaskTitles,
    getPendingTaskTitles,
    deleteTask
} from "./taskService.js";

const firstTask = createTask("Learn JavaScript");
console.log("First task:", firstTask);

try {
    createTask("     ");
} catch (error) {
    console.error("Could not create task:", error.message);
}

createTask("Learn React");
createTask("Learn Flutter");
createTask("Learn React Native");
createTask("Learn Java");

console.log("Before completion:", findTaskById(2));

console.log("Completion result:", completeTask(2));

console.log("After completion:", findTaskById(2));

console.log("Find a missing ID:", findTaskById(999));

try {
    completeTask(999);
} catch (error) {
    console.error("Could not complete task:", error.message);
}

console.log("Pending tasks:", getPendingTasks());

console.log("All tasks:", getAllTasks());

console.log("Task titles:", getTaskTitles());

console.log("Pending task titles:", getPendingTaskTitles());

console.log("Deleted task:", deleteTask(2));

console.log("All tasks after deletion:", getAllTasks());

try {
    deleteTask(999);
} catch (error) {
    console.error("Could not delete task:", error.message);
}
