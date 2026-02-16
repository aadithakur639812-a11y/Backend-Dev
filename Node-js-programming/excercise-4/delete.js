
import fs from "fs";
function deleteTask(name, id) {
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
    user.todo = user.todo.filter(t => t.id !== id);
    fs.writeFileSync("todo.json", JSON.stringify(data, null, 2));
    console.log("Task deleted");
}
export default deleteTask;
