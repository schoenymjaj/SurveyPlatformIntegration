import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../../services/helper.service';

@Component({
  selector: 'app-rep-dialog',
  templateUrl: './rep-dialog.component.html',
  styleUrls: ['./rep-dialog.component.css']
})
export class RepDialogComponent implements OnInit {
  rep: string;

  constructor(private helperService: HelperService) { }

  ngOnInit() {
    this.helperService.logComponent(this.constructor.name, 'OnInit');
  }

}
