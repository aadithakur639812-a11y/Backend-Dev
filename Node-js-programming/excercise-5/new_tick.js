
function runNextTick() {
    process.nextTick(() => {
        console.log("process.nextTick");
    });
}
export default runNextTick;
    