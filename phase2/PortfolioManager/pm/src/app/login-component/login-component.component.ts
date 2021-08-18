import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  username = "";
  password = "";

  constructor() { }

  ngOnInit(): void {
  }

  verify(username:string, password:string) {
    console.log(`Username ${username}`);
    this.username = username;
    console.log(`Password ${password}`);
    this.password = this.password;

    //check if registered
    type Password = {[username:string]:string};
    let userPasswords = sessionStorage.getItem("userPasswords");
    let passwords:Password  = {};
    if(userPasswords != undefined && userPasswords != null) {
      passwords = <Password>JSON.parse(userPasswords);

      if(passwords[username] == password){
        console.log("Sign in successful.");
        sessionStorage.setItem("verified", JSON.stringify(true));
        sessionStorage.setItem("verifiedUser", username);
      } else {
        alert("Username and passwords do not exist.");
        console.log("Username and passwords do not exist.");
        sessionStorage.setItem("verified", JSON.stringify(false));
      }
    }
    
  }

  goSignup()
  {
    sessionStorage.setItem("signup", JSON.stringify(true));
  }

}
