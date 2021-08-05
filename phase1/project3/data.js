
function printData()
{
    console.log(document.getElementById("data").innerText);
    items = JSON.parse(localStorage.getItem("data"));
    console.log(items);
    //document.getElementById("data").innerHTML = items;
    start = '<thead><tr><th scope="col"><h2>Client Name</h2></th><th scope="col"><h2>Project Name</h2></th><th scope="col"><h2>Budget</h2></th></tr></thead><tbody>';
    for(h in items){
        i = items[h];
        start += '<tr class="highlight"><td>'+i[0]+"</td><td>"+i[1]+"</td><td>$"+i[2]+"</td></tr>";
    }
    start += "</tbody>";
    document.getElementById("data").innerHTML = start;
}

function addData()
{
    clientName = document.getElementById("client").value;
    projectName = document.getElementById("project").value;
    budget = document.getElementById("budget").value;

    if(clientName != "" && projectName != "" && budget != ""){
        
        items = JSON.parse(localStorage.getItem("data"));
        if(items == null){
            items = []
        }
        items.push([clientName, projectName, budget])
        
        console.log([clientName, projectName, budget]);
        localStorage.setItem("data", JSON.stringify(items));

        clearData()
    } else {
        alert("Please fill out all the fields to add data.");
    }
}

function clearData()
{
    console.log("Clear");
    document.getElementById("client").value="";
    document.getElementById("project").value="";
    document.getElementById("budget").value="";
}

function back()
{
    window.history.back();
}