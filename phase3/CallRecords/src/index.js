let fs = require("fs");

let mongoClient = require("mongodb").MongoClient;
 
let url ="mongodb://localhost:27017";

mongoClient.connect(url, (err,client) => {
    if(!err){
        console.log("Connected")
        let db = client.db("CallData");
       
        fs.readFile("call_data.json", (error, data) => {
        
            if(error) throw error;

            console.log(data.toString());
            let json = JSON.parse(data.toString());

            db.collection("callLog").insertMany(json, 
            (err,result)=> {
                if(!err){
                  console.log("Record inserted successfully")
                   console.log(result);
                }else {
                    console.log(err);
                }
                client.close();
            });
        });

    } else {
        console.log(err);
    }
});