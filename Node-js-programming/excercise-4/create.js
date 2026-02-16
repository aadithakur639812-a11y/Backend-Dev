
import fs from "fs";
function createTask(name, task) {
    let data = [];
    if (fs.existsSync("todo.json")) {
        data = JSON.parse(fs.readFileSync("todo.json", "utf-8"));
    }
    const todoObj = {
        id: Date.now(),
        createTime: new Date(),
        task,
        status: false
    };
    let user = data.find(u => u.name === name);
    if (user) {
        user.todo.push(todoObj);
    } else {
        data.push({
            name,
            todo: [todoObj]
        });
    }
    fs.writeFileSync("todo.json", JSON.stringify(data, null, 2));
    console.log("Task created");
}
export default createTask;
