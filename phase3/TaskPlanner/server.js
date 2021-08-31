let fs = require("fs");
let express = require("express");
let bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.urlencoded({extended:true}));

fs.readFile("data.json", (err, data) => {

    if(data != undefined){
        console.log("data file exists");
        console.log(JSON.parse(data));
        json = JSON.parse(data);
    } else {
        console.log("data file does not exist");
        json = [];
    }

    //add data

    fs.writeFile("data.json", data=JSON.stringify(json), (err) => console.log(err));
});


app.listen(9090,()=>console.log("Server running on port number 9090"));