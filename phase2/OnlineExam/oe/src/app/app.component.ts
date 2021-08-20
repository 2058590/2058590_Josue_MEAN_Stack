import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { QuizComponent } from './quiz/quiz.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'online exam';
  private data:any = [];

  constructor(private http:HttpClient) {

  }

  showExam()
  {
    return QuizComponent.showExam;
  }

  getData(){
    const url = "http://localhost:8080/exam1.json";
    this.http.get(url).subscribe((res)=>{
      this.data = res;
      console.log(this.data);
    })
  }
}
