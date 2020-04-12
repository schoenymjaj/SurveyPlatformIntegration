import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { ConfigService } from './config.service';
import { HttpArgs } from '../classes/http-args';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HelperService {
  localConfig;

  constructor(private configService: ConfigService,
    private helperService: HelperService,
    private apiService: ApiService) {
    this.localConfig = configService.getConfig();
  }


  /*
    GENERAL FUNCTIONS
  */
  getUrl(urlTypeName: object) {

    if (urlTypeName["poc"]) {
      return urlTypeName["domain"] + urlTypeName["url"];
    } else {
      return urlTypeName["dummy"];
    }

  } //getUrl

  ISOStringDateOnly(date: Date) {
    return new Date(date).toISOString().substring(0, 10);
  }

  ISOStringTrim(dateString: string) {
    return dateString.substring(0, 10);
  }

  saveData(placeHolder: string, data: any) {
    localStorage.setItem(placeHolder, JSON.stringify(data));
  }

  retrieveData(placeHolder: string) {
    if (localStorage.getItem(placeHolder) == null) {
      return [];
    } else {
      return JSON.parse(localStorage.getItem(placeHolder));
    }
  }


  /*
   INGEST FUNCTIONS
  */

  isIngestActive(statusResponse: any): boolean {
    if (
      (statusResponse["status"] == "ingest-complete" && statusResponse["ingested"] == 0) ||
      (statusResponse["status"] == "ingestion-cancelled") ||
      (statusResponse["status"] == "ingestion-failed") ||
      (statusResponse["status"] == "harmonize-complete")
    ) {
      return false;
    } else {
      return true;
    }
  }

  isIngestActionSuccess(statusResponse: any): boolean {
    if (statusResponse["status"] == "success") {
      return true;
    } else {
      return false;
    }
  }

  getIngestTaskId(statusResponse: any): number {
    return parseInt(statusResponse["taskid"]);
  }

  GetIngestStatus(MLStatus: string) {
    let ingestStatusDisplay = {
      "no-activity": "No Activity",
      "ingesting": "Ingest in Progress",
      "ingest-complete": "Ingest Complete",
      "ingestion-cancelled": "Ingest Cancelled",
      "ingestion-failed": "Ingest Failed",
      "harmonizing": "Harmonize in Progress",
      "harmonize-complete": "Harmonize Complete",
    };

    try {
      return ingestStatusDisplay[MLStatus];
    } catch {
      return "Error Determining Status";
    }
  }

  /*
    SPECIFIC REST API CALLS
  */
  CallRestGeneralDataQuery(): Observable<Object> {
    let localConfig = this.configService.getConfig();
    let url = this.getUrl(localConfig["generalDataQueryUrl"]);
    let httpArgs = new HttpArgs('GET', 'NO AUTH', '', 'application/json', url);
    return this.apiService.getResponse(httpArgs)
  }

  CallRestIntegrityCheck(): Observable<Object> {
    let localConfig = this.configService.getConfig();
    let url = this.getUrl(localConfig["integrityCheckUrl"]);
    let httpArgs = new HttpArgs('GET', 'NO AUTH', '', 'application/json', url);
    return this.apiService.getResponse(httpArgs)
  }

  CallRestRtsGetMostRecentIngestStatus(): Observable<Object> {
    let localConfig = this.configService.getConfig();
    let url = this.getUrl(localConfig["ingest"]["CallRestRtsGetMostRecentIngestStatus"]);
    let httpArgs = new HttpArgs('GET', 'NO AUTH', '', 'application/json', url);
    return this.apiService.getResponse(httpArgs)
  }

  CallRestUcsfGetMostRecentIngestStatus(): Observable<Object> {
    let localConfig = this.configService.getConfig();
    let url = this.getUrl(localConfig["ingest"]["CallRestUcsfGetMostRecentIngestStatus"]);
    let httpArgs = new HttpArgs('GET', 'NO AUTH', '', 'application/json', url);
    return this.apiService.getResponse(httpArgs)
  }

  CallRestRtsStatus(taskid: number): Observable<Object> {
    let localConfig = this.configService.getConfig();
    let url = this.getUrl(localConfig["ingest"]["rtsStatusUrl"]);
    url = url.replace("TASKIDPLACEHOLDER", taskid.toString());
    let httpArgs = new HttpArgs('GET', 'NO AUTH', '', 'application/json', url);
    return this.apiService.getResponse(httpArgs)
  }

  CallRestUcsfStatus(taskid: number): Observable<Object> {
    let localConfig = this.configService.getConfig();
    let url = this.getUrl(localConfig["ingest"]["ucsfStatusUrl"]);
    url = url.replace("TASKIDPLACEHOLDER", taskid.toString());
    let httpArgs = new HttpArgs('GET', 'NO AUTH', '', 'application/json', url);
    return this.apiService.getResponse(httpArgs)
  }

  CallRestRtsStart(): Observable<Object> {
    let localConfig = this.configService.getConfig();
    let url = this.getUrl(localConfig["ingest"]["rtsStartUrl"]);
    let httpArgs = new HttpArgs('GET', 'NO AUTH', '', 'application/json', url);
    return this.apiService.getResponse(httpArgs)
  }

  CallRestRtsStop(taskid: number): Observable<Object> {
    let localConfig = this.configService.getConfig();
    let url = this.getUrl(localConfig["ingest"]["rtsStopUrl"]);
    url = url.replace("TASKIDPLACEHOLDER", taskid.toString());
    let httpArgs = new HttpArgs('GET', 'NO AUTH', '', 'application/json', url);
    return this.apiService.getResponse(httpArgs)
  }

  /*
  args: startDateISOString: if empty, then we will not tack on a start date to the URL.
  */
  CallRestUcsfStart(startDateISOString: string): Observable<Object> {
    let localConfig = this.configService.getConfig();
    let url = this.getUrl(localConfig["ingest"]["ucsfStartwithStartDateUrl"]);
    if (startDateISOString != "") {
      url = url.replace("STARTDATEPLACEHOLDER", "&startdate=" + startDateISOString);
    } else {
      url = url.replace("STARTDATEPLACEHOLDER", "");
    }
    let httpArgs = new HttpArgs('GET', 'NO AUTH', '', 'application/json', url);
    return this.apiService.getResponse(httpArgs)
  }

  CallRestUcsfStop(taskid: number): Observable<Object> {
    let localConfig = this.configService.getConfig();
    let url = this.getUrl(localConfig["ingest"]["ucsfStopUrl"]);
    url = url.replace("TASKIDPLACEHOLDER", taskid.toString());
    let httpArgs = new HttpArgs('GET', 'NO AUTH', '', 'application/json', url);
    return this.apiService.getResponse(httpArgs)
  }

  /*
    LOGGING HELPER FUNCTIONS
  */
  logComponent(componentName: string, eventName: string) {
    console.log(componentName + ' ' + eventName)
  }

  logError(context: string, error: any) {
    console.log(context + ' ' + JSON.stringify(error));
    alert(context + ' ' + JSON.stringify(error));
  }


}
