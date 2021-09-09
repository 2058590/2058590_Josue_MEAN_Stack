let fs = require("fs");
let express = require("express");
let bodyParser = require("body-parser");
const { json } = require("body-parser");

let app = express();

let mongoClient = require("mongodb").MongoClient;
 
let url ="mongodb://localhost:27017";

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

app.get("/fetch.html", (request, response) => {
   
    response.sendFile(__dirname+"\\fetch.html");
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

app.post("/action_fetch", (request, response) => {
    taskData = 'fetching courses';//= request.body;
    
    //taskData["_id"] = taskData.couid;
    console.log(taskData);
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

app.listen(9090,()=>console.log("Server running on port number 9090"));