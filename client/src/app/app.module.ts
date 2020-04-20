import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, SafePipe  } from './app.component';

// Material section
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'; //DUPed
import { HttpClientModule } from '@angular/common/http';

import {DemoMaterialModule} from './material-module';  //DUPed
//import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatListModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { CirdsNavComponent } from './cirds-nav/cirds-nav.component';

//Support configuration service
import { ConfigService } from './services/config.service';
import { AppInitService } from './services/app-init.service';

import { IngestDialogComponent } from './dashboard/main/ingest-dialog/ingest-dialog.component';
import { SynonymsDialogComponent } from './dashboard/main/synonyms-dialog/synonyms-dialog.component';


export function initializeApp1(appInitService: AppInitService) {
  return (): Promise<any> => { 
    return appInitService.Init();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
    CirdsNavComponent,
    IngestDialogComponent,
    SynonymsDialogComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    LayoutModule,
    HttpClientModule
  ],
  providers: [ 
    AppInitService,
    DecimalPipe,
    { provide: APP_INITIALIZER,useFactory: initializeApp1, deps: [AppInitService], multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [IngestDialogComponent, SynonymsDialogComponent],
  exports: [SafePipe]
})
export class AppModule { }
