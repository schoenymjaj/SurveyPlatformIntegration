import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { HelperService } from '../../services/helper.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  componentName = "MainComponent";
  //for ingest-status components
  rtsIngestType = 'rts';
  ucsfIngestType = 'ucsf';

  largeBreakpointGreaterInd;
  mediumBreakpointGreaterInd;
  maxColumnCount = 3;

  constructor(private helperService: HelperService,
              private configService: ConfigService,
              private breakpointObserver: BreakpointObserver) {
  }
  ngOnInit() {
    this.helperService.logComponent(this.constructor.name, 'OnInit');

    //display config. just for debug purposes
    console.log(this.configService.getConfig()); 

    this.breakpointObserver
      .observe(['(min-width: 1350px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log('Viewport is 1350px or over!');
          this.largeBreakpointGreaterInd = true;
          this.maxColumnCount = this.getColumnCount();
        } else {
          console.log('Viewport is getting smaller than 1350px!');
          this.largeBreakpointGreaterInd = false;
          this.maxColumnCount = this.getColumnCount();
        }
      });

      this.breakpointObserver
      .observe(['(min-width: 900px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log('Viewport is 900px or over!');
          this.mediumBreakpointGreaterInd = true;
          this.maxColumnCount = this.getColumnCount();
        } else {
          console.log('Viewport is getting smaller than 900px!');
          this.mediumBreakpointGreaterInd = false;
          this.maxColumnCount = this.getColumnCount();
        }
      });    

  }

  /*
    determine the responsive design - number of columns to render the dashboard cards
  */
  getColumnCount() {

    if (this.largeBreakpointGreaterInd) {
      return 3;
    } else {
      if (this.mediumBreakpointGreaterInd) {
        return 2;
      } else {
        return 1;
      }
    }

  } //getColumnCount()



}
