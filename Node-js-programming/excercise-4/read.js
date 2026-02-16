
import fs from "fs";
function readTasks(name) {
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
    console.log(user.todo);
}
export default readTasks;
