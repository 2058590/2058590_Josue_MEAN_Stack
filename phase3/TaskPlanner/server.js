let fs = require("fs");
let express = require("express");
let bodyParser = require("body-parser");
const { json } = require("body-parser");

let app = express();

app.use(bodyParser.urlencoded({extended:true}));

let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Planner</title>
</head>
<body>
    <h2>Task Planner</h2>
    <h3>Add Task</h3>
    <a href="index">Refresh</a> 
    <form action="addtask" method="POST">
        <label>Employee ID</label>
        <input type="text" name="empid" required/><br/>
        <label>Task ID</label>
        <input type="text" name="taskid" required/><br/>
        <label>Task</label>
        <input type="text" name="task" required/><br/>
        <label>Deadline</label>
        <input type="date" name="date" required/><br/>
        <input type="submit" value="Add Task"/>
    </form>
    <br/>

    <h3>Delete Tasks</h3>
    <form action="deletetask" method="POST">
        <label>Task ID</label>
        <input type="text" name="taskid" required/><br/>
        <input type="submit" value="Delete Task"/>
    </form>

    <br/>
    <h3>Task List</h3>
    <table id="tasks">
        {{TASKS}}
    </table>
</body>
</html>`;

let taskData = null;

app.get("/index", (request, response) => {
    writeTasks();
    response.sendFile(__dirname+"\\userhtml.html");
});

app.post("/addtask", (request, response) => {
    taskData = request.body;
    console.log(taskData);
    addTask(taskData);
    writeTasks();
    response.sendFile(__dirname+"\\userhtml.html");
    
});

app.post("/deletetask", (request, response) => {
    let taskid = request.body["taskid"];
    console.log(request.body.toString());
    if(taskid != undefined){
        deleteTask(taskid);
    }
    writeTasks();
    response.sendFile(__dirname+"\\userhtml.html");

});


function addTask(taskData){
    fs.readFile("data.json", (err, data) => {

        let json = {};
        
        if(data != undefined){
            console.log("data file exists");
            //console.log(JSON.parse(data));
            json = JSON.parse(data.toString());

            //add data
            if(taskData != null){
                taskid = taskData["taskid"];
                if(!(taskid in json)){
                    json[taskid] = taskData;
                } else {
                    console.log("Task ID already exists.");
                }
            }

        fs.writeFile("data.json", data=JSON.stringify(json), (err) => console.log(err));

        } else {
            console.log("data file does not exist");
        }

        console.log(json);

    });
}

function deleteTask(taskid){
    fs.readFile("data.json", (err, data) => {

        let json = {};
        
        if(data != undefined){
            console.log("data file exists");
            //console.log(JSON.parse(data));
            json = JSON.parse(data.toString());
        } else {
            console.log("data file does not exist");
        }

        console.log(json);

        //add data
        if(taskid != null){
            delete json[taskid];
        }

        fs.writeFile("data.json", data=JSON.stringify(json), (err) => console.log(err));
    });
}


function writeTasks(){
    
    let taskHTML = "<th>Employee ID</th><th>Task ID</th><th>Task</th><th>Date</th>";

    fs.readFile("index.html", (err, data) => {

        if(data != undefined){
            console.log("index file exists");
            html = data.toString();
            console.log(html);

            fs.readFile("data.json", (err, json) => {
                let tasks = {};
    
                if(json != undefined){
                    console.log("data file exists");
                    tasks = JSON.parse(json.toString());
                } else {
                    console.log("data file does not exist");
                }
        
                console.log("tasks to add "+tasks.toString());
    
                for(var i in tasks)
                {
                task = tasks[i];
                taskid = task["taskid"];
                empid = task["empid"];
                t = task["task"];
                date = task["date"];
                taskHTML += `<tr><td>${empid}</td><td>${taskid}</td><td>${t}</td><td>${date}</td></tr>`;
                }
    
                console.log(taskHTML);
    
                res = html.replace("{{TASKS}}",taskHTML);

                console.log("\n\nresponse HTML\n\n"+res);
    
                fs.writeFile("userhtml.html", data=res, (err) => console.log(err));
                
        });
            
        } else {
            console.log("data file does not exist");
        }

    });

}


app.listen(9090,()=>console.log("Server running on port number 9090"));