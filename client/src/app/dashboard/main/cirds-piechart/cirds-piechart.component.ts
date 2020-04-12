import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../../services/helper.service';

import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-cirds-piechart',
  templateUrl: './cirds-piechart.component.html',
  styleUrls: ['./cirds-piechart.component.css']
})

export class CirdsPiechartComponent implements OnInit {
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
  public pieChartLabels: Label[] = [['RTS', 'Projects'], ['RTS', 'Documents'], 'UCSF', 'TCKB'];
  public pieChartData: number[] = [300, 500, 100, 200];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,1.0)', 'rgba(0,255,0,1.0)', 'rgba(0,0,255,1.0)', 'rgba(255,0,255,1.0)'],
    },
  ];

  constructor(private helperService: HelperService) { }

  ngOnInit() {
    this.helperService.logComponent(this.constructor.name, 'OnInit');
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