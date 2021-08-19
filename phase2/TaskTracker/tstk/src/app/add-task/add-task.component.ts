import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskViewComponent } from '../task-view/task-view.component';
import { Tasks } from '../Tasks';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
 
  constructor() { 
  }

  ngOnInit(): void {
  }


  addTask(ngForm:HTMLFormElement)
  {
    let storedTasks = sessionStorage.getItem("tasks");
    let tasklist:Tasks  = {};

    if(storedTasks != null && storedTasks != "{}"){
      tasklist = JSON.parse(storedTasks);
    } 

    let taskidEl = document.getElementById("taskid");
    let ownerEl = document.getElementById("owner");
    let taskinfoEl = document.getElementById("taskinfo");
    let deadlineEl = document.getElementById("deadline");

    console.log(taskidEl);
    console.log(ownerEl);
    console.log(taskinfoEl);
    console.log(deadlineEl);

    if(taskidEl == null || ownerEl == null || taskinfoEl == null || deadlineEl == null){
      alert("Missing element error. Please reload page.");
      return;
    }

    let taskid = (<HTMLInputElement>taskidEl).value;
    let owner = (<HTMLInputElement>ownerEl).value;
    let taskinfo = (<HTMLInputElement>taskinfoEl).value;
    let deadline = (<HTMLInputElement>deadlineEl).value;

    if(taskid == ""){
      alert("please enter a Task ID number.");
    }

    if(owner == ""){
      alert("please enter a Owner Name.");
    }

    if(taskinfo == ""){
      alert("please enter a Task information.");
    }

    if(deadline == ""){
      alert("please enter a Deadline date.");
    }

    tasklist[taskid] = [taskid, owner, taskinfo, deadline];

    sessionStorage.setItem("tasks", JSON.stringify(tasklist));

    TaskViewComponent.loadTasks();

  }

  reset(ngForm:HTMLFormElement)
  {
    let taskidEl = document.getElementById("taskid");
    let ownerEl = document.getElementById("owner");
    let taskinfoEl = document.getElementById("taskinfo");
    let deadlineEl = document.getElementById("deadline");

    console.log(taskidEl);
    console.log(ownerEl);
    console.log(taskinfoEl);
    console.log(deadlineEl);

    if(taskidEl == null || ownerEl == null || taskinfoEl == null || deadlineEl == null){
      alert("Missing element error. Please reload page.");
      return;
    }

    let taskid = (<HTMLInputElement>taskidEl).value = "";
    let owner = (<HTMLInputElement>ownerEl).value = "";
    let taskinfo = (<HTMLInputElement>taskinfoEl).value = "";
    let deadline = (<HTMLInputElement>deadlineEl).value = "";
 
  }

}
