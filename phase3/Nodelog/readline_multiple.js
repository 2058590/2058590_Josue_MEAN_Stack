let obj = require("readline");
var r1 = obj.createInterface({
    input:process.stdin,
    output:process.stdout
});

r1.question("Enter name", (name) => {
    r1.question("Enter id",(id)=>{
        r1.question("Enter age",(age)=>{
            console.log("Name is" + name);
            console.log("id is "+id);
            console.log("age is "+age);
        })
    })
});