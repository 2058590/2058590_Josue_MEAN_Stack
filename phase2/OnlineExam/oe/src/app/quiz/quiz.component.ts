import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Answers } from './Answers';
import { Exam } from './Exam';
import { ReviewComponent } from '../review/review.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  private data:string = "";

  private questionSet:string[] = [];
  static showExam = true;

  constructor(private http:HttpClient) {

  }

  ngOnInit(): void {
  }

  postExam(data:string)
  {
    let exam = JSON.parse(this.data);

    let html:string = "<div id='exam'>";

    let opts = ["a", "b", "c", "d"];

    for(var i in exam)
    {
      this.questionSet.push(i);
      html += `<form id="${i}"><table><tr>${i}: ${exam[i]["question"]}</tr><tr>`;
      for(var j in opts){
        var k = opts[j];
        html += `<td><input type="radio" name="${i}" value="${k}">${exam[i][k]}</td>`;
      }
      html += `</tr></table></form><br/>`;
      
    }

    html += '<a href="#" id="gradebutton">Grade</a></div>';
    
    let examEl = <HTMLElement>document.getElementById("exam");
    examEl.innerHTML = html;

    let buttonEl = <HTMLElement>document.getElementById("gradebutton");
    buttonEl.onclick = this.gradeExam;

    sessionStorage.setItem("questions", JSON.stringify(this.questionSet));
  }

  gradeExam()
  {
    let response = <HTMLFormElement>document.getElementById("Question 1");
    
    let qs = sessionStorage.getItem("questions");
    this.questionSet = qs != null? JSON.parse(qs) : [];

    let answers:Answers = {};

    for(var i in this.questionSet){
      let check = document.getElementsByName(this.questionSet[i]);
      
      answers[this.questionSet[i]] = "";
      for(var j in check){
        let el = (<HTMLInputElement>check[j]);
        if(el.checked == true){
          answers[this.questionSet[i]] = el.value;
        }
      }
    }

    sessionStorage.setItem("answers", JSON.stringify(answers));
    ReviewComponent.startReview();
  }

  

  getExam(){
    const url = "http://localhost:8080/exam1.json";
    //let data:Object;
    this.http.get(url).subscribe((res)=>{
      this.data = JSON.stringify(res);
      sessionStorage.setItem("quizdata",this.data);
      this.postExam(this.data);
    });

  }

}
