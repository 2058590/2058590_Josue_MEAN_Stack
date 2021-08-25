let readline = require("readline-sync");
let fs = require("fs");


let firstname = readline.question("Enter first name ");
let lastname = readline.question("Enter last name ");
let gender = readline.question("Enter gender ");
let email = readline.question("Enter email ");

let json = [];

fs.readFile("data.json", (err, data)=>{
    //json = data;

    if(data != undefined){
        console.log("file exists");
        console.log(JSON.parse(data));
        json = JSON.parse(data);
    } else {
        console.log("file does not exist");
        json = []
    }

    json.push({firstname:firstname, lastname:lastname, gender:gender, email:email,"date":Date.now()});

    fs.writeFile("data.json", data=JSON.stringify(json), (err)=>{console.log(err)});

});