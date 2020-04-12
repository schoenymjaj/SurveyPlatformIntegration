import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../services/config.service';
import { HelperService } from '../../../services/helper.service';
import { ApiService } from '../../../services/api.service';
import { HttpArgs } from '../../../classes/http-args';

import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-integrity-check',
  templateUrl: './integrity-check.component.html',
  styleUrls: ['./integrity-check.component.css']
})
export class IntegrityCheckComponent implements OnInit {
  localConfig;

  
  generalDataQueryResponse: any; 
  
  generalDataQueryResponseError;
  integrityCheckResponse: any = "";
  integrityCheckResponseError;
  badRtsDocsRecords = 0;

  // Pie
  //pieChartOptions: left, top, right?, bottom
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };

  public pieChartLabels: Label[] = ['Hurricane', 'Flood'];
  public pieChartData: number[] = [70, 20]; //set to just look decent while waiting for real data.
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(0,255,0,1.0)', 'rgba(255,0,0,1.0)', 'rgba(0,0,155,1.0)', 'rgba(0,255,255,1.0)', 'rgba(255,0,255,1.0)'],
      /*borderColor: '#000',
      weight: 1,*/
    },
  ];

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
      this.pieChartData = [this.generalDataQueryResponse["rts-doc"],75]  //just an initialization
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
        this.helperService.saveData("GENERAL_DATA_QUERY",data); //persist the general data query response.
        this.pieChartData = [this.generalDataQueryResponse["rts-doc"], 75];
        this.pieChartLabels = ['Hurricane', 'Flood'];
        console.log(this.constructor.name + ' - received general data');
      },
        (error) => {
          console.log(error.message);
          this.generalDataQueryResponseError = error;
          this.helperService.logError('ERROR receiving general data:', error);
        }
      );

    this.helperService.CallRestIntegrityCheck()
      .subscribe((data) => {
        console.log(data);
        this.integrityCheckResponse = data;
        this.badRtsDocsRecords = this.getNbrOfBadRtsDocsRecords(this.integrityCheckResponse);
        this.pieChartData = [3.17, 2.10, 3.75, 3.36, 2.98];
        this.pieChartLabels = ['Flood', 'Hurricane', 'Influenza', 'Xtrme Heat', 'Propty Crime'];
        console.log(this.constructor.name + ' - received integrity check data');
      },
        (error) => {
          console.log(error.message);
          this.integrityCheckResponseError = error;
          this.helperService.logError('ERROR receiving integrity check data:', error);
        }
      );

  }

  getNbrOfBadRtsDocsRecords(integrityCheckData: string) {
    return integrityCheckData.length;
    // if (integrityCheckData.length == 0) {
    //   return 0;
    // } else
    //   return integrityCheckData.split("\r\n").length;
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  changeLabels() {
    const words = ['hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
      'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
      'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
      'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
      'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny'];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    //this.pieChartLabels = Array.apply(null, { length: 3 }).map(_ => randomWord());
    //this.pieChartLabels = ["RTS","UCSF","TCKB"];
    this.pieChartLabels = [['RTS', 'Projects'], ['RTS', 'Documents'], 'UCSF', 'TCKB'];

  }

  addSlice() {
    this.pieChartLabels.push(['Line 1', 'Line 2', 'Line 3']);
    this.pieChartData.push(400);
    this.pieChartColors[0].backgroundColor.push('rgba(196,79,244,0.3)');
  }

  removeSlice() {
    this.pieChartLabels.pop();
    this.pieChartData.pop();
    this.pieChartColors[0].backgroundColor.pop();
  }

  changeLegendPosition() {
    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  }

}
