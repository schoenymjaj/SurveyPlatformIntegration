import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { isNullOrUndefined } from 'util';
import { HttpArgs } from '../classes/http-args';

const API_KEY = 'a1081749dc9b4ab3923b70b693ad7e50';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  
  //test site for http get
  //url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`;

  url = 'http://localhost:8085/read?parm1=parm1valuefromClient&parm2=parm2valuefromClient';

  constructor(private httpClient: HttpClient) { }

  //public getResponse(protocol: string, authType: string, authString: string, responseType: string, url?: string){
  public getResponse(httpArgs: HttpArgs, postBody?: any){

    //if the https args url is defined, then we set the url from http args passed in
    if (!isNullOrUndefined(httpArgs.url)) {
      this.url = httpArgs.url;
    }

    let headersFinal = new HttpHeaders();//.append('Accept',httpArgs.responseType);

    if (httpArgs.protocol == 'GET') {
      //let headerFinal;
        if (httpArgs.authType == 'BASIC AUTH') {
          headersFinal = headersFinal.append('Authorization', 'Basic ' + btoa(httpArgs.credentials));
        } else {
          headersFinal = headersFinal;
        }

        if (httpArgs.responseType == 'text/xml' || httpArgs.responseType == 'text/plan') {
          return this.httpClient.get(this.url, {headers: headersFinal, "responseType": 'text'});
        } else {
          return this.httpClient.get(this.url, {headers: headersFinal});
        }


    } else {
      //this would be a HTTP POST call
      this.url = 'http://localhost:8085/create';
      //let body = {"parm1": "bodyblow1", "parm2": "bodyblow2", "parm3": "bodyblow3"};
      let body = postBody;
      return this.httpClient.post(this.url, body, {headers: headersFinal});
    }
  
    //MNS - DEBUGGING
    // if (httpArgs.responseType == 'text/xml' || httpArgs.responseType == 'text/plan') {
    //   return this.httpClient.get(this.url, {'responseType': 'text'}); //returns text
    // } else {
    //   return this.httpClient.get(this.url); //returns json
    // }



  } //public getResponse(

}
