import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-port-component',
  templateUrl: './port-component.component.html',
  styleUrls: ['./port-component.component.css']
})
export class PortComponentComponent implements OnInit {

  username = "";

  constructor() { 
    let username = sessionStorage.getItem("verifiedUser");
    if(username != undefined && username != null) {
      this.username = username;
    }
  }

  ngOnInit(): void {
  }

  loadRecords()
  {
    let userObjs = sessionStorage.getItem(this.username);
    //let objects:UserObjs = [];
    
    if(userObjs != undefined && userObjs != null) {
      let objects = <[string, number][]>JSON.parse(userObjs);
      
      var items:string = "";
      for(var e in objects)
      {
       let a = objects[e][0];
       let b = objects[e][1];
       items += `<tr><td>${a}</td><td>${b}</td></tr>`;
      }

     let tableObj = document.getElementById("records");
     if(tableObj != undefined && tableObj != null){
       let tableObjEl = <HTMLElement>tableObj;
       tableObjEl.innerHTML = items;
     }
   }

  }

  record(contactname:string, phoneno:string)
  {
    //type Contact = [string,number];
    let userObjs = sessionStorage.getItem(this.username);

    if(userObjs != undefined && userObjs != null) {
      let objects = JSON.parse(userObjs);
      let val = [contactname, parseInt(phoneno)];
      let obs = [];
      for(var o in objects){
        obs.push(o);
      }
      obs.push(val);
      console.log(objects);
      sessionStorage.setItem(this.username, JSON.stringify(obs));
    } else {
      let val = [contactname, parseInt(phoneno)];
      let obs = [];
      obs.push(val);
      console.log(obs);
      sessionStorage.setItem(this.username, JSON.stringify(obs));
    }
    
    console.log("record: "+contactname);

    this.loadRecords();
  }

  logout() 
  {
    sessionStorage.setItem("verified", JSON.stringify(false));
  }


}
