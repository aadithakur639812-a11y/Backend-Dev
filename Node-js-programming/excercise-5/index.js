
import runTimeout from "./timeout.js";
import runImmediate from "./immediate.js";
import runNextTick from "./nextTick.js";
import runPromise from "./promiseTask.js";
console.log("Start");
runTimeout();
runImmediate();
runNextTick();
runPromise();
console.log("End");
