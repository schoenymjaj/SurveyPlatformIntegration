import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  id: string; //id of the survey

  constructor(private sanitizer: DomSanitizer,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id); // Print the parameter to the console. 
    });      

  }

  ngAfterContentInit() {
    var htmlText = $('.mnsclass').html();
    var frameObj = $('.mnsclass')
    var janetText = $('.jmsclass').html();
    var frameDOM = $('.mnsclass').contents();
    var questionTags = $('.mnsclass').attr('src')
  };

  getSafeSource() {
  
    switch (this.id) {
      case '5': //hospital comprehensive
        var url = 'https://mitrepilot.iad1.qualtrics.com/jfe/form/SV_6VSaVseh1oYbBK5';
        break;
      case '6': //hospital lite
        var url = 'https://mitrepilot.iad1.qualtrics.com/jfe/form/SV_1RMpcqmsZtI9XIV';
        break;
      default:
        var url = "https://qfreeaccountssjc1.az1.qualtrics.com/jfe/form/SV_3L60R4gVcYmhkEd"
        break;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
