import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../services/config.service';
import { HelperService } from '../../../services/helper.service';
import { ApiService } from '../../../services/api.service';
import { HttpArgs } from '../../../classes/http-args';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-datasource-counts',
  templateUrl: './datasource-counts.component.html',
  styleUrls: ['./datasource-counts.component.css']
})
export class DatasourceCountsComponent implements OnInit {

  localConfig;
  generalDataQueryResponse: any;

  generalDataQueryResponseError;

  constructor(private configService: ConfigService,
    private helperService: HelperService,
    private apiService: ApiService) {
  }
  ngOnInit() {
    this.helperService.logComponent(this.constructor.name, 'OnInit');

    //Refresh data - every XXX milliseconds defined in config file unless defined as 0
    this.localConfig = this.configService.getConfig();

    //if we've persisted the data general query result, lets initialize to this value
    if (this.helperService.retrieveData("GENERAL_DATA_QUERY") != null) {
      this.generalDataQueryResponse = this.helperService.retrieveData("GENERAL_DATA_QUERY");
    } else {
      this.generalDataQueryResponse = { "rts": "", "rts-doc": "", "tckb": "", "ucsf": "", "idat": "" };
    }

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

    this.helperService.CallRestGeneralDataQuery()
      .subscribe((data) => {
        console.log(data);
        this.generalDataQueryResponse = data;
        this.helperService.saveData("GENERAL_DATA_QUERY",data); //persist the general data query response.
        //this.generalDataQueryResponse["idat"] = 0; //just a placeholder for idat
        console.log(this.constructor.name + ' - received general data');
      },
        (error) => {
          console.log(error.message);
          this.generalDataQueryResponseError = error;
          this.helperService.logError('ERROR receiving general data:', error);
        }
      );

  }

  getTotalCirdsRecords() {
    if (this.generalDataQueryResponse.rts != "") {
      return Number.parseInt(this.generalDataQueryResponse.rts) +
        Number.parseInt(this.generalDataQueryResponse["rts-doc"]) +
        Number.parseInt(this.generalDataQueryResponse.tckb) +
        Number.parseInt(this.generalDataQueryResponse.ucsf);
    } else {
      return "";
    }
  }


}