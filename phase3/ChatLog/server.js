const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);
let bodyParser = require("body-parser");

let mongoClient = require("mongodb").MongoClient;
 
let url ="mongodb://localhost:27017";

app.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser.json());   

app.get('/', (req, res) => {
    res.sendFile(__dirname+"/index.html");
});

io.on('connection', (socket)=>{
    console.log("user connected");
    socket.on("client chat", (msg)=>{
        console.log("Client: "+msg);
        try{
            let data = JSON.parse(msg);
            console.log(data);
        }catch(error){
            console.log(error);
        }
    });
});

function addDocument(data, dbname="TestChat", collection="ChatLogs")
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

server.listen(9090, ()=>{
    console.log("listening in port 9090");
});