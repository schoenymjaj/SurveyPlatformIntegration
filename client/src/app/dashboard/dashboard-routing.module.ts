import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { ExerciserComponent } from './main/exerciser/exerciser.component';
import { SurveyComponent } from './main/survey/survey.component';
import { JstreeComponent } from './main/jstree/jstree.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'exerciser',
    component: ExerciserComponent
  },
  {
    path: 'survey',
    component: SurveyComponent
  },
  {
    path: 'jstree',
    component: JstreeComponent
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
