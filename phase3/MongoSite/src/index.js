let fs = require("fs");
let express = require("express");
let bodyParser = require("body-parser");

const { json } = require("body-parser");

let app = express();

const http = require("http");
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);

let mongoClient = require("mongodb").MongoClient;
 
let url ="mongodb://localhost:27017";

io.on('connection', (socket)=>{
    console.log("user connected");
    socket.on("client fetch", (msg)=>{
        console.log("Client: "+msg);
        try{
            fs.exists("fetched.json", (ex) => {
                if(ex){
                    fs.readFile("fetched.json",(error,json)=> {
                        if(!error){
                            let data = JSON.parse("["+
                                json.toString().substring(0, json.length - 1) +
                                "]");
                                                        
                            socket.emit("fetch server", JSON.stringify(data));
                            
                            fs.unlinkSync("fetched.json");
                        }
                    });
                } else {
                    socket.emit("fetch server", "good");
                }
            })
        }catch(error){
            console.log(error);
        }
    });

    socket.on("client add", (msg)=>{
        console.log("Client: "+msg);
        try{
            if(msg.startsWith("check_id:")) {
                let check_id = msg.substring(9);
                let ex = false;

                mongoClient.connect(url, (err,client) => {
                    if(!err){
                        console.log("Connected")
                        let db = client.db("TestDB");
            
                        db.collection("TestCol").findOne({_id : check_id}, 
                            (err,result) => {
                                console.log("msg: "+msg);
                                console.log(check_id);
                                console.log(result);
                                if(!err){
                                    if(result != undefined && result != null){
                                        console.log("Record exists")
                                        console.log(result);     
                                        socket.emit("add server", "bad");
                                    } else {
                                        socket.emit("add server", "good");
                                    }
                                }else {
                                    console.log(err);
                                }
                                client.close();
                            }
                        );
                    }
                });
            }
        }catch(error){
            console.log(error);
        }
    });
    
});

app.use(bodyParser.urlencoded({extended:true}));

app.get("/index", (request, response) => {
   
    response.sendFile(__dirname+"\\index.html");
});

app.get("/add.html", (request, response) => {
   
    response.sendFile(__dirname+"\\add.html");
});

app.get("/update.html", (request, response) => {
   
    response.sendFile(__dirname+"\\update.html");
});

app.get("/delete.html", (request, response) => {
   
    response.sendFile(__dirname+"\\delete.html");
});

app.get("/action_fetch_update", (request, response) => {
   
    fetchDocuments();
    response.sendFile(__dirname+"\\fetched.html");
});

app.get("/action_fetch_refresh", (request, response) => {
    response.sendFile(__dirname+"\\fetched.html");
    fs.unlinkSync("fetched.html");
});

app.get("/fetched.json", (request, response) => {
    response.sendFile(__dirname+"\\fetched.json");
});

app.post("/action_add", (request, response) => {
    taskData = request.body;
    
    taskData["_id"] = taskData.couid;
    console.log(taskData);
    addDocument(taskData);
    response.sendFile(__dirname+"\\add.html");    
});

app.post("/action_update", (request, response) => {
    taskData = request.body;

    taskData["_id"] = taskData.couid;
    console.log(taskData);
    updateDocument(taskData);
    response.sendFile(__dirname+"\\update.html");    
});

app.post("/action_delete", (request, response) => {
    taskData = request.body;
    
    taskData["_id"] = taskData.couid;
    console.log(taskData);
    deleteDocument(taskData);
    response.sendFile(__dirname+"\\delete.html");    
});

app.get("/action_fetch", (request, response) => {
    
    fetchDocuments();

    response.sendFile(__dirname+"\\fetch.html");
    
});

function addDocument(data, dbname="TestDB", collection="TestCol")
{
    mongoClient.connect(url, (err,client) => {
        if(!err){
            console.log("Connected")
            let db = client.db(dbname);

            db.collection(collection).insertOne(data, 
                (err,result) => {
                    if(!err){
                      console.log("Record inserted successfully")
                       console.log(result);
                    }else {
                        console.log(err);
                    }
                    client.close();
                }
            );
        }
    });
}


function updateDocument(data, dbname="TestDB", collection="TestCol")
{
    mongoClient.connect(url, (err,client) => {
        if(!err){
            console.log("Connected")
            let db = client.db(dbname);
           
            db.collection(collection).updateOne({_id:data._id}, 
                {$set:data},
                (err,result) => {
                    if(!err){
                        if(result.modifiedCount>0){
                            console.log("Record updated successfully")
                        }else {
                            console.log("Record not present")
                        }
                       
                }else {
                    console.log(err);
                }

                client.close();
            });
        }
    });
}

function deleteDocument(data, dbname="TestDB", collection="TestCol")
{
    mongoClient.connect(url, (err,client) => {
        if(!err){
            console.log("Connected")
            let db = client.db(dbname);
           
            db.collection(collection).deleteOne({_id:data._id}, 
                (err,result) => {
                    if(!err){
                        if(result.deletedCount>0){
                            console.log("Record deleted successfully")
                        }else {
                            console.log("Record not present")
                        }
                       
                    }else {
                        console.log(err);
                    }

                    client.close();
            });
        }
    });
}

async function fetchDocuments( dbname="TestDB", collection="TestCol")
{

    mongoClient.connect(url, (err,client) => {
        if(!err){
            console.log("Connected")
            let db = client.db(dbname);
            
            let cursor = db.collection(collection).find();

            var i = 0;
            cursor.forEach(doc => { 
                
                console.log(JSON.stringify(doc));
                row = JSON.stringify(doc) + ",";
                console.log(""+i+": ");
                 client.close();
                i++;
                fs.writeFile("fetched.json",row,{flag:"a+"},(err)=> {
                    if(!err){
                        console.log("fetched.json appended")
                    }
                });
            }).catch(error => { console.log(error)});

            
        } else {
            console.log(err);
        }

    });
}

server.listen(9090,()=>console.log("Server running on port number 9090"));