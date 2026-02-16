
import createTask from "./createstask.js";
import readTasks from "./readTasks.js";
import updateTask from "./updateTask.js";
import completeTask from "./completeTask.js";
import deleteTask from "./deleteTask.js";
createTask("vishal", "Learn fs module");
createTask("vishal", "Practice Node.js");
readTasks("vishal");
updateTask("vishal", 1770396223879, "Learn fs deeply");
completeTask("vishal", 1770396223879);
deleteTask("vishal", 1770396593728);
