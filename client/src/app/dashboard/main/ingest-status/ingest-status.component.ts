import { Component, OnInit, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { AppConstants } from '../../../app-constants';
import { ConfigService } from '../../../services/config.service';
import { HelperService } from '../../../services/helper.service';
import { ApiService } from '../../../services/api.service';
import { HttpArgs } from '../../../classes/http-args';

const STATUS_UNKNOWN = "UNKNOWN";

@Component({
  selector: 'app-ingest-status',
  templateUrl: './ingest-status.component.html',
  styleUrls: ['./ingest-status.component.css']
})
export class IngestStatusComponent implements OnInit {

  @Input('ingestType') ingestType: string;

  localConfig;
  generalDataQueryResponse: any;
  generalDataQueryResponseError;
  rtsGetIngestDateStatusResponse = {};
  rtsGetIngestDateStatusResponseError;
  rtsIngestStatusResponse = {};
  rtsIngestStatusResponseError;
  ucsfGetIngestDateStatusResponse = {};
  ucsfGetIngestDateStatusResponseError;
  ucsfIngestStatusResponse = {};
  ucsfIngestStatusResponseError;

  title: string = "";
  narrative = '';
  ingestDatePerformed;
  startLoadDateOfRecordsToIngest;
  statusLabel: string = '';
  ingestStatus;
  ingestRecordCount;
  harmonizedRecordCount;
  mostRecentIngestTaskId;

  constructor(private configService: ConfigService,
    private helperService: HelperService,
    private apiService: ApiService,
    private decimalPipe: DecimalPipe) {
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

    let localConfig = this.configService.getConfig();

    
    this.helperService.CallRestGeneralDataQuery()
      .subscribe((data) => {
        console.log(data);
        this.generalDataQueryResponse = data;

        let dialogParms = this.renderIngest(this.ingestType, this.generalDataQueryResponse);
        this.title = dialogParms['title'];
        this.narrative = dialogParms['narrative'];
        this.statusLabel = dialogParms['statusLabel'];

        console.log(this.constructor.name + ' - received general data');
      },
        (error) => {
          console.log(error.message);
          this.generalDataQueryResponseError = error;
          this.helperService.logError('ERROR receiving general data:', error);
        }
      );

    if (this.ingestType == 'rts') {

      this.helperService.CallRestRtsGetMostRecentIngestStatus()
        .subscribe((data) => {
          console.log(data);
          this.rtsGetIngestDateStatusResponse = data;
          this.ingestDatePerformed = new Date(this.helperService.ISOStringTrim(data["date"].toString()));
          this.mostRecentIngestTaskId = data["taskid"];
          console.log(this.constructor.name + ' - received rts most recent status data');

          this.helperService.CallRestRtsStatus(this.mostRecentIngestTaskId)
            .subscribe((data) => {
              console.log(data);

              this.rtsIngestStatusResponse = data;
              this.ingestStatus = this.helperService.GetIngestStatus(data["status"]);
              this.ingestRecordCount = data["ingested"];
              this.harmonizedRecordCount = data["harmonized"];
              console.log(this.constructor.name + ' - received rts status data');
            },
              (error) => {
                this.ingestStatus = STATUS_UNKNOWN;
                this.ingestRecordCount = "";
                this.harmonizedRecordCount = "";
                this.rtsIngestStatusResponseError = error;
                this.helperService.logError('ERROR receiving rts status data:', error);
              }
            );

        },
          (error) => {
            //this.ingestDatePerformed = DO NOT SET IF ERROR
            this.mostRecentIngestTaskId = STATUS_UNKNOWN;
            this.ingestStatus = STATUS_UNKNOWN
            this.ingestRecordCount = "";
            this.harmonizedRecordCount = "";
            this.rtsGetIngestDateStatusResponseError = error;
            this.helperService.logError('ERROR receiving rts get most recent status:', error);
          }
        );


    } else { //if (this.ingestType == 'rts') {

      this.helperService.CallRestUcsfGetMostRecentIngestStatus()
        .subscribe((data) => {
          console.log(data);
          this.ucsfGetIngestDateStatusResponse = data;
          this.ingestDatePerformed = new Date(this.helperService.ISOStringTrim(data["date"].toString()));
          this.mostRecentIngestTaskId = data["taskid"];
          console.log(this.constructor.name + ' - received ucsf most recent status data');

          this.helperService.CallRestUcsfStatus(this.mostRecentIngestTaskId)
            .subscribe((data) => {
              console.log(data);
              this.ucsfIngestStatusResponse = data;
              this.ingestStatus = this.helperService.GetIngestStatus(data["status"]);
              this.ingestRecordCount = data["ingested"];
              this.harmonizedRecordCount = data["harmonized"];
              console.log(this.constructor.name + ' - received ucsf status data');
            },
              (error) => {
                this.ingestStatus = STATUS_UNKNOWN;
                this.ingestRecordCount = "";
                this.harmonizedRecordCount = "";
                this.ucsfIngestStatusResponseError = error;
                this.helperService.logError('ERROR receiving ucsf status data:', error);
              }
            );
        },
          (error) => {
            //this.ingestDatePerformed = DO NOT SET IF ERROR
            this.mostRecentIngestTaskId = STATUS_UNKNOWN;
            this.ingestStatus = STATUS_UNKNOWN;
            this.ingestRecordCount = "";
            this.harmonizedRecordCount = "";
            this.ucsfGetIngestDateStatusResponseError = error;
            this.helperService.logError('ERROR receiving ucsf get most recent status:', error);
          }
        );

    } //else if (this.ingestType == 'rts') {

  } //RefreshData

  renderIngest(ingestType, dataSourceCounts) {
    let title = "";
    let narrative = "";
    let statusLabel = "";


    if (isNaN(ingestType)) {
      switch (ingestType) {
        case 'rts':
          title = "RTS Ingest";
          narrative = `CIRDs possesses ${this.decimalPipe.transform(dataSourceCounts['rts'],'2.')} projects and ${this.decimalPipe.transform(dataSourceCounts['rts-doc'],'2.')} RTS documents`;
          statusLabel = "RTS Ingest Status";
          break;
        case 'tckb':
          title = "TCKB Ingest";
          narrative = `CIRDs possesses ${this.decimalPipe.transform(dataSourceCounts['tckb'],'2.')} TCKB substances`;
          statusLabel = "TCKB Ingest Status";
          break;
        case 'ucsf':
          title = "UCSF Ingest";
          narrative = `RISC Activity Statistics`;
          statusLabel = "UCSF Ingest Status";
          break;
      }
    } else {
      console.log('An invalid ingest type was specified');
      alert('An invalid ingest type was specified');
    }

    return {
      title,
      narrative,
      statusLabel
    }

  } //renderIngest() {


}
