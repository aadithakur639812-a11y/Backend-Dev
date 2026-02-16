
function runPromise() {
    Promise.resolve().then(() => {
        console.log("Promise");
    });
}

export default runPromise;
