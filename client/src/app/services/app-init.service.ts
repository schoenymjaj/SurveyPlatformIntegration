import { Injectable } from '@angular/core';

import { ConfigService } from './config.service';
import { HelperService } from '../services/helper.service';
import { ApiService } from './api.service';
import { HttpArgs } from '../classes/http-args';
//import { url } from 'inspector';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(private configService: ConfigService,
    private helperService: HelperService,
    private apiService: ApiService) {
  }

  public async Init() {

    return await new Promise<void>((resolve, reject) => {
      console.log("AppInitService.init() called");
      ////do your initialisation stuff here  

      this.configService.initConfig();
      resolve();

    });
  }


}


