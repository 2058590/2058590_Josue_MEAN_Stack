let readlines = require("readline-sync");

let name = readlines.question("Enter the name");
let id = readlines.questionInt("Enter id");
let salary = readlines.questionFloat("Enter salary");
console.log(`Your id = ${id}`);
console.log(`Your id = ${name}`);
console.log(`Your id = ${salary}`);