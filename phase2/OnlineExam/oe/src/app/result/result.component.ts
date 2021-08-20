import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  static displayResult(correct:number, total:number)
  {
    let el = document.getElementById("result");
    let htmlEl;
    if(el != null){
      htmlEl = <HTMLElement>el;
      let color = "wrong";
      let msg = "(FAIL)";
      if(correct >= 7){
        color = "highlight";
        msg = "(PASS)";
      }
      htmlEl.innerHTML = `<p class="${color}">Result: ${correct} / ${total} ${msg}</p>`;
    }
  }

}
