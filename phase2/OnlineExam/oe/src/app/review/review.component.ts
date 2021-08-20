import { Component, OnInit } from '@angular/core';
import { ResultComponent } from '../result/result.component';
import { HttpClient, HttpHandler } from "@angular/common/http";

import { Exam } from '../quiz/Exam';
import { Answers } from '../quiz/Answers';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  static setShow(arg0: boolean) {
    throw new Error('Method not implemented.');
  }


  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  static startReview()
  {
    
    //console.log("starting review");

    let answersdata = sessionStorage.getItem("answers");

    let quizdata = sessionStorage.getItem("quizdata");

    let questions = JSON.parse(quizdata != null ? quizdata : ""); //:(Exam | null) = <Exam>JSON.parse(quizdata != null ? quizdata : "");

    let answers = JSON.parse(answersdata != null ? answersdata : "");

    //console.log(answers);

    //console.log(questions);

    let html:string = "<div id='exam'>";

    let opts = ["a", "b", "c", "d"];

    let total = 0;

    let correct = 0;

    for(var i in questions)
    {
      total += 1;
      //console.log(i);
      //console.log(questions[i]);
      
      html += `<table><tr>${i}: ${questions[i]["question"]}</tr><tr>`;
      for(var j in opts){
        var k = opts[j];
        var ans = answers[i];
        //console.log("user answer "+ans);
        var color = "";
        if(k == ans){
          if(ans == questions[i]["answer"]){
            //console.log("corret answer "+questions[i]["answer"]);
            color = "highlight";
            correct += 1;
          } else {
            color = "wrong";
          }

        }
        html += `<td class="${color}">${questions[i][k]}</td>`;
      }
      html += `</tr></table><br/>`;
      //console.log(`${i}: ${questions[i]["question"]}`);
    }

    html += '<a href="http://localhost:4200" id="restart">Restart</a></div>';
    
    let examEl = <HTMLElement>document.getElementById("exam");
    examEl.innerHTML = html;

    ResultComponent.displayResult(correct, total);    
  }

}

