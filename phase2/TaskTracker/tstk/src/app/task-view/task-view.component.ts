import { Component, OnInit } from '@angular/core';
import { Tasks } from '../Tasks';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

  constructor() { 
    //this.loadTasks();
  }

  ngOnInit(): void {
    TaskViewComponent.loadTasks();
  }

  static loadTasks()
  {
    let storedTasks = sessionStorage.getItem("tasks");
    let tasklist:Tasks  = {};

    if(storedTasks != null){
      tasklist = (<Tasks>JSON.parse(storedTasks));
    } 

    let taskview = (<HTMLElement>document.getElementById("taskview"));
    let items = "<th>Emp. ID</th><th>Owner Name</th><th>Task</th><th>Deadline</th>";

    for(var i in tasklist){
      var t = tasklist[i];
      console.log(t);
      var taskid = t[0]
      var owner = t[1];
      var taskinfo = t[2];
      var deadline = t[3];
      items += `<tr><td>${taskid}</td><td>${owner}</td><td>${taskinfo}</td><td>${deadline}</td></tr>`;
    }

    taskview.innerHTML = items;

  }

}
