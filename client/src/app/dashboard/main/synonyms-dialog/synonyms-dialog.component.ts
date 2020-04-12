import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

//resize text area capability
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {NgZone, ViewChild} from '@angular/core';
import {take} from 'rxjs/operators';

import { ConfigService } from '../../../services/config.service';
import { HelperService } from '../../../services/helper.service';
import { ApiService } from '../../../services/api.service';
import { HttpArgs } from '../../../classes/http-args';

@Component({
  selector: 'app-synonyms-dialog',
  templateUrl: './synonyms-dialog.component.html',
  styleUrls: ['./synonyms-dialog.component.css']
})
export class SynonymsDialogComponent implements OnInit {
  localConfig;

  title = "CIRDs Synonyms"
  synonymsXML;

  constructor(private configService: ConfigService,
    private helperService: HelperService,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<SynonymsDialogComponent>,
    private _ngZone: NgZone
    ) {}

    //resize text area
    @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

    triggerResize() {
      // Wait for changes to be applied, then trigger textarea resize.
      this._ngZone.onStable.pipe(take(1))
          .subscribe(() => this.autosize.resizeToFitContent(true));
    }    

  ngOnInit() {
    this.helperService.logComponent(this.constructor.name, 'OnInit');

    //Refresh data - every XXX milliseconds defined in config file unless defined as 0
    this.localConfig = this.configService.getConfig();

    this.RefreshData();
    if (this.localConfig["refreshDataTimeinMsecs"] > 0) {
      setInterval(() => {
        this.RefreshData();
      }, this.localConfig["refreshDataTimeinMsecs"]);
    }

  }

  RefreshData() {
    let url;
    let httpArgs;

    let localConfig = this.configService.getConfig();

    url = this.helperService.getUrl(localConfig["getSynonymDocUrl"]);
    httpArgs = new HttpArgs('GET', 'NO AUTH', '', 'text/xml', url);
    this.apiService.getResponse(httpArgs)
      .subscribe((data) => {
        console.log(data);
        this.synonymsXML = data.toString();
        console.log(this.constructor.name + ' - received general data');
      },
        (error) => {
          console.log(JSON.stringify(error));
          this.synonymsXML = JSON.stringify(error);
          this.helperService.logError('ERROR receiving general data:', JSON.stringify(error));
        }
      );

  } //RefreshData()

  close() {
    this.dialogRef.close();
  }


}
