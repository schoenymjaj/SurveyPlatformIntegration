import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DecimalPipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';

import {DemoMaterialModule} from '../material-module';  //DUPed
import { ChartsModule } from 'ng2-charts';

import { CirdsDashboardComponent } from './main/cirds-dashboard/cirds-dashboard.component';
import { CirdsPiechartComponent } from './main/cirds-piechart/cirds-piechart.component';
import { ExerciserComponent } from './main/exerciser/exerciser.component';
import { DatasourceCountsComponent } from './main/datasource-counts/datasource-counts.component';
import { IntegrityCheckComponent } from './main/integrity-check/integrity-check.component';
import { RtsDocsPiechartComponent } from './main/rts-docs-piechart/rts-docs-piechart.component';
import { IngestStatusComponent } from './main/ingest-status/ingest-status.component';
import { RiscCandy1PiechartComponent } from './main/risc-candy1-piechart/risc-candy1-piechart.component'
import { RiscCandy2PiechartComponent } from './main/risc-candy2-piechart/risc-candy2-piechart.component'
import { SurveyComponent } from './main/survey/survey.component';
import { JstreeComponent } from './main/jstree/jstree.component';

import { SearchBarComponent } from './main/assessment-library/search-bar/search-bar.component';
import { SearchPageComponent } from './main/assessment-library/search-page/search-page.component';


@NgModule({
  declarations: [MainComponent, CirdsDashboardComponent, CirdsPiechartComponent, 
                ExerciserComponent, DatasourceCountsComponent, IntegrityCheckComponent, RtsDocsPiechartComponent,
                RiscCandy1PiechartComponent, RiscCandy2PiechartComponent, IngestStatusComponent, SurveyComponent,
                JstreeComponent, SearchBarComponent, SearchPageComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DemoMaterialModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DecimalPipe]
})
export class DashboardModule { }
