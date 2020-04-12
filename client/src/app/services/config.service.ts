import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import * as configdata from '../../assets/config/config.json';

@Injectable({
  providedIn: 'root'
})
export class ConfigService implements OnInit {
  public config = {};

  constructor(private httpClient: HttpClient) {
   }

  ngOnInit() {
  }
  //this works - async
  async initConfig(): Promise<{}> {

    this.config = JSON.parse(JSON.stringify(configdata["default"]));
    //console.log('getConfig: ' + JSON.stringify(this.config));
    return this.config;
     
      // let data = await this.httpClient.get('/assets/data/config.json')
      // .toPromise();
      //.subscribe((data)=>{
      //   console.log(data);
      //   this.config;
      // });
  }

  getConfig() {
    return this.config;
  }

}
