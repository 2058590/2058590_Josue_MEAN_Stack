import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'This is the main component';

  constructor() 
  {
    /*sessionStorage.setItem("usernames",JSON.stringify([]));
    sessionStorage.setItem("userPasswords",JSON.stringify({}));
    sessionStorage.setItem("usersObs",JSON.stringify({}));
    sessionStorage.setItem("usersDetails",JSON.stringify({}));*/
  }
  
  isVerified()
  {
    let val = sessionStorage.getItem("verified");
    let ver:boolean = false;
    if(val != undefined)
      ver = JSON.parse(val);
    return ver;
  }

  signup()
  {
    let val = sessionStorage.getItem("signup");
    let ver:boolean = false;
    if(val != undefined)
      ver = JSON.parse(val);
    return ver;    
  }
}
