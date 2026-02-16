
function runImmediate(){
    setImmediate(()=>{
        console.log("setImmediate");
    });
}

export default runImmediate;
