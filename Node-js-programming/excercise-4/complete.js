
import fs from "fs";
function completeTask(name, id) {
    if (!fs.existsSync("todo.json")) {
        console.log("No data found");
        return;
    }
    const data = JSON.parse(fs.readFileSync("todo.json", "utf-8"));
    const user = data.find(u => u.name === name);

    if (!user) {
        console.log("User not found");
        return;
    }
    const task = user.todo.find(t => t.id === id);

    if (!task) {
        console.log("Task not found");
        return;
    }
    task.status = true;
    fs.writeFileSync("todo.json", JSON.stringify(data, null, 2));
    console.log("Task completed");
}
export default completeTask;
