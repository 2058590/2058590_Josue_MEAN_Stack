const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);

let mongoClient = require("mongodb").MongoClient;
 
let url ="mongodb://localhost:27017";

//app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname+"/index.html");
});

io.on('connection', (socket)=>{
    console.log("user connected");
    socket.on("client chat", (msg)=>{
        console.log("Client: "+msg);
        /*readline.question("Server: ", (answer)=>{
            io.emit("server chat", answer);
        });*/
        
    });
});



server.listen(9090, ()=>{
    console.log("listening in port 9090");
});