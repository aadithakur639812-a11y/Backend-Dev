const fs=require('fs');
const path = require("path")
const filepath = path.resolve(__dirname,"input.txt")
const data = fs.readFileSync(filepath,"utf-8")
let word=data.split(" ");
let countWord=word.length;
let OutputText=`No of word: ${countWord}`;
console.log(OutputText);
fs.writeFileSync("./output.txt", OutputText);