
localStorage.setItem("blogs", 
JSON.stringify([["Dogs!", "Dogs are great and it's hard to disagree.", "https://www.mcohio.org/3%20dogs%20outside.jpg", "8/4/2021 @ 15:16:3"],
                ["Cats?", "Cats are great too...if you're not allergic, I guess.", "https://www.prestigeanimalhospital.com/sites/default/files/styles/blog_teaser/public/interesting-cat-facts.jpg?itok=NRF56Pl9", "8/5/2021 @ 16:19:10"],
                ["IMO", "This is just a random opinion. Nothing much.", null, "8/5/2021 @ 19:35:31"],
                ["How to take notes.", "Type into a notepad app. Or use pen and paper.", null, "8/5/2021 @ 1:08:25"]
]));

blogThumbnail = '<div class="col-md-4"><div class="card mb-4 box-shadow"><img class="card-img-top"'+
        'style="height: 225px; width: 100%; display: block;" src="${BLOGIMG}" data-holder-rendered="true">'+
    '<div class="card-body"><strong>${BLOGTITLE}</strong><p class="card-text">${BLOGTXT}</p>'+
    '<div class="d-flex justify-content-between align-items-center"><div class="btn-group">'+
    '<button type="button" class="btn btn-sm btn-outline-secondary" onclick="viewBlog(${ID})">View/Edit</button>'+
    '<button type="button" class="btn btn-sm btn-outline-secondary" onclick="deleteBlog(${ID})">Delete</button>' +
    '</div><small class="text-muted">${BLOGDATE}</small></div></div></div></div>';


missingImage = "https://image.flaticon.com/icons/png/512/468/468900.png";

var blogBlock = document.getElementById("blogBlock").innerHTML;


function getDate() {
    var currentdate = new Date(); 
    var datetime = "" + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    return datetime;
}

function loadData()
{
    data = localStorage.getItem("blogs");
    if(data == null){
        data = [];
        localStorage.setItem("blogs", JSON.stringify(data));
    }
    data = JSON.parse(data);
    return data;
}

function storeData(data)
{
    localStorage.setItem("blogs", JSON.stringify(data));
}

function addBlog()
{
    olddata = loadData();
    title = document.getElementById("blogtitle").value;
    text = document.getElementById("blogtext").value;
    image = document.getElementById("blogimage").value;

    if(title.trim() == "" || text.trim() == ""){
        alert("Blog need a title and some text. :)");
        return;
    }

    if(!image.endsWith(".png") || !image.endsWith(".jpg") || !image.endsWith(".jpeg")){
        image = missingImage;
    }
    time = getDate();
    data = [[title, text, image, time]];

    for(i in olddata){
        data.push(olddata[i]);
    }

    console.log(data);

    storeData(data);
    loadBlogs();
}

function hideBlogBlock()
{
    a = document.getElementById("blogblock");
    a.hidden = !a.hidden;
}

function clearData()
{
    document.getElementById("blogtitle").value = "";
    document.getElementById("blogtext").value = "";
    document.getElementById("blogimage").value = "";
}

function loadBlogs()
{
    data = loadData();

    finalString = "";

    for(i in data) {
        console.log(i);
        console.log(data[i]);
        blogTitle = data[i][0];
        blogText = data[i][1];
        blogImg = data[i][2];
        blogDate = data[i][3];
        if(blogImg == null) {
            blogImg = missingImage;
        }
        blogItem = blogThumbnail.replace("${BLOGTITLE}", blogTitle);
        blogItem = blogItem.replace("${BLOGIMG}", blogImg);
        blogItem = blogItem.replace("${BLOGTXT}", blogText);
        blogItem = blogItem.replace("${ID}", i);
        blogItem = blogItem.replace("${ID}", i);
        blogItem = blogItem.replace("${BLOGDATE}", blogDate);
        console.log(blogItem);
        finalString += blogItem;
    }

    document.getElementById("content").innerHTML = finalString;
}

function viewBlog(idx)
{
    a = document.getElementById("blogblock");
    if(a.hidden == true){
        a.hidden = false;
    }
    console.log("show blog #"+idx);
    data = loadData();
    item = data[idx];

    document.getElementById("blogtitle").value = item[0];
    document.getElementById("blogtext").value = item[1];
    document.getElementById("blogimage").value = item[2];

}


function deleteBlog(idx)
{
    data = loadData();
    data.splice(idx, 1);
    console.log("delete blog #"+idx);
    storeData(data);
    loadBlogs();
}

function printAbout()
{
    a = document.getElementById("blogblock");
    if(a.hidden == true){
        a.hidden = false;
    }
    document.getElementById("blogblock").innerHTML = '<h3>Josue "Joe" Madrid</h3><p>TCS Trainee. Training and refreshing in web developments knowedge.</p>';
}

function printContact()
{
    a = document.getElementById("blogblock");
    if(a.hidden == true){
        a.hidden = false;
    }
    document.getElementById("blogblock").innerHTML = '<h3>Josue "Joe" Madrid</h3><p>j.madrid@tcs.com</p>';
}

function newBlog()
{
    a = document.getElementById("blogblock");
    if(a.hidden == true){
        a.hidden = false;
    }
    document.getElementById("blogBlock").innerHTML = '<div class="container"><input type="text" value=\'Add Title Here\' class="jumbotron-heading" id="blogtitle"/>'+
    '<p class="lead text-muted"><textarea style="margin-top: 30px; margin-bottom: 5px; height: 99px;" class="blogblock" id="blogtext">' +
    'This blog text area can contain your opinion, research, stories, notes or any sort of writing you want to store for later access.'+
    '</textarea></p><input type="text" value=\'Add Image Source Here (.jpg, .png, etc)\' class="blogimg" id="blogimage"/>' +
    '<p><a href="#" onclick="addBlog()" class="btn btn-primary my-2">Add Blog</a><a href="#" onclick="clearData()" class="btn btn-secondary my-2">Clear</a>'+
    '<a href="#" onclick="hideBlogBlock()" class="btn btn-secondary my-2">Hide</a></p></div>';
}