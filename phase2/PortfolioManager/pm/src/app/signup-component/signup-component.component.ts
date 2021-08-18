import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-signup-component',
  templateUrl: './signup-component.component.html',
  styleUrls: ['./signup-component.component.css']
})
export class SignupComponentComponent implements OnInit {

  //signup: boolean = false;
  //verified: boolean = false;

  nameError = "<div class='fieldError'>Required.</div>";
  usedNameError = "<div class='fieldError'>This username is already in use.</div>";
  strongPasswordError = "<div class='fieldError'>Password must be 8 or more characters.</div>";

  constructor() { }

  ngOnInit(): void {
  }

  nameChecks(name:string)
  {
    return name != undefined && name != null && name.trim() != ""; 
  }

  register(firstname:string, lastname:string, username:string, password:string)
  {
    if(!this.checks(firstname,lastname,username,password)){
      return;
    }

    this.registryAdd(firstname, lastname, username, password);

    this.loginPage();
  }

  checks(firstname:string, lastname:string, username:string, password:string)
  {
    //check firstname 
    if(!this.nameChecks(firstname)){
      let element = (<HTMLElement>document.getElementById("out1"));
      element.innerHTML = this.nameError;
      element.hidden = false;
    } else {
      let element = (<HTMLElement>document.getElementById("out1"));
      element.hidden = true;
    }

    //check lastname
    if(!this.nameChecks(lastname)){
      let element = (<HTMLElement>document.getElementById("out2"));
      element.innerHTML = this.nameError;
      element.hidden = false;
    } else {
      let element = (<HTMLElement>document.getElementById("out2"));
      element.hidden = true;
    }

    if(!this.nameChecks(username)){
      let element = (<HTMLElement>document.getElementById("out3"));
      element.innerHTML = this.nameError;
      element.hidden = false;
    }else if(!this.newUsername(username)) {
      let element = (<HTMLElement>document.getElementById("out3"));
      element.innerHTML = this.usedNameError;
      element.hidden = false;
    } else {
      let element = (<HTMLElement>document.getElementById("out3"));
      element.hidden = true;
    }

    if(!this.nameChecks(password)){
      let element = (<HTMLElement>document.getElementById("out4"));
      element.innerHTML = this.nameError;
      element.hidden = false;
    } else if(!this.strongPassword(password)) {
      let element = (<HTMLElement>document.getElementById("out4"));
      element.innerHTML = this.strongPasswordError;
      element.hidden = false;
    } else {
      let element = (<HTMLElement>document.getElementById("out4"));
      element.hidden = true;
    }

    return true;
  }

  reset()
  {
    let element = (<HTMLInputElement>document.getElementById("firstname"));
    element.value = "";
    element.placeholder = "First Name";
    element = (<HTMLInputElement>document.getElementById("lastname"));
    element.value = "";
    element.placeholder = "Last Name";
    element = (<HTMLInputElement>document.getElementById("username"));
    //element.value = "";
    element.placeholder = "Username";
    element = (<HTMLInputElement>document.getElementById("password"));
    //element.value = "";
    element.placeholder = "Password";
  }

  newUsername(username:string)
  {
    let names = sessionStorage.getItem("usernames_list");
    let nameslist: string[] = [];
    
    if (names != undefined && names != null) {
      nameslist = (<string[]>JSON.parse(names));
    }
    return nameslist.indexOf(username) < 0;
  }

  strongPassword(password:string)
  {
    return password.length >= 8;
  }

  loginPage()
  {
    sessionStorage.setItem("signup", JSON.stringify(false));
    sessionStorage.setItem("verified", JSON.stringify(false));
  }

  registryAdd(firstname:string, lastname:string, username:string, password:string)
  {
    let usernames = sessionStorage.getItem("usernames");
    let usernlist: string[] = [];
    if(usernames != undefined && usernames != null) {
      usernlist = (<string[]>JSON.parse(usernames));
      usernlist.push(username);
    }

    type Password = {[username:string]:string};
    let userPasswords = sessionStorage.getItem("userPasswords");
    let passwords:Password  = {};
    if(userPasswords != undefined && userPasswords != null) {
      passwords = <Password>JSON.parse(userPasswords);
      passwords[username] = password;
    }

    type UserObjs = {[usrname:string]:[string, string, string, string]};
    let userObjs = sessionStorage.getItem("userObs");
    let objects:UserObjs = {};
    if(userObjs != undefined && userObjs != null) {
      objects = <UserObjs>JSON.parse(userObjs);
      objects[username] = [username, password, firstname, lastname];
    }
    
    sessionStorage.setItem("usernames", JSON.stringify(usernlist));
    sessionStorage.setItem("userPasswords",JSON.stringify(passwords));
    sessionStorage.setItem("userObs", JSON.stringify(objects));

  }
} 
