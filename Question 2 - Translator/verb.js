const fs = require("fs");
const data = fs.readFileSync("verb.in.txt", "utf8");
const wordsArray = data.split("\n").map((word) => word.replace("\r", ""));

console.log(wordsArray)