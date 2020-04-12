import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var htmlText = $('iframe').html(); 
  }

  ngAfterContentInit() {
    var htmlText = $('.mnsclass').html();
    var frameObj = $('.mnsclass')
    var janetText = $('.jmsclass').html();
    var frameDOM = $('.mnsclass').contents();
    var questionTags = $('.mnsclass').attr('src')
  };

}
