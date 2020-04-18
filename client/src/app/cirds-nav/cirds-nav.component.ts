import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { IngestDialogComponent } from "../dashboard/main/ingest-dialog/ingest-dialog.component";
import { SynonymsDialogComponent } from "../dashboard/main/synonyms-dialog/synonyms-dialog.component";
import { ApiService } from '../services/api.service';
import { HttpArgs } from '../classes/http-args';
import { ConfigService } from '../services/config.service';
import { HelperService } from '../services/helper.service';

declare var $: any;

@Component({
  selector: 'app-cirds-nav',
  templateUrl: './cirds-nav.component.html',
  styleUrls: ['./cirds-nav.component.css']
})
export class CirdsNavComponent implements OnInit {
  title = 'ASPR RISC Next Gen';
  localConfig;

  constructor(private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private apiService: ApiService,
    private configService: ConfigService,
    private router: Router, 
    private helperService: HelperService) { }

  ngOnInit(): void {

    //this.initialTree("/assets/data/jstreeLibrary/assessment-lib-jstree-value.json", this.initialSelectTreeView);
    this.initialTree("/assets/data/jstreeLibrary/initial-jstree-value.json", this.initialSelectTreeView);

  } //ngInit

  viewAssessmentLibrary() {

    this.router.navigate(['/dashboard/search-page']);

    // $('#frmt').empty();

    // let httpArgs = new HttpArgs('GET', 'NO AUTH', '', 'application/json', "/assets/data/jstreeLibrary/initial-jstree-value.json");
    // this.apiService.getResponse(httpArgs)
    //   .subscribe((data) => {
    //       console.log(data);

    //       $('#frmt').html('<span>Bills!</span>');
    //       //.jstree(data);


    //   });
            
    //this.initialTree("/assets/data/jstreeLibrary/assessment-lib-jstree-value.json", this.initialSelectTreeView);
  } //viewAssessmentLibrary() {

  initialSelectTreeView (categoryName: string, router: Router) {
    switch (categoryName) {
      case "RISC NextGen":
        router.navigate(['/dashboard/main']);
        break;
      case "Dashboard":
        router.navigate(['/dashboard/main']);
        break;
      case "Exerciser":
        router.navigate(['/dashboard/exerciser']);
        break;
      case "Jstree Sandbox":
        router.navigate(['/dashboard/jstree']);
        break;
      default:
        router.navigate(['/dashboard/survey']);
        break;
    }
  } //var selectTreeView = function ()


  initialTree(treeJasonUrl: string, treeFunctionView: any) {

    //tree branch/leaf selection

    let httpArgs = new HttpArgs('GET', 'NO AUTH', '', 'application/json', treeJasonUrl);
    this.apiService.getResponse(httpArgs)
      .subscribe((data) => {
          console.log(data);

          var conduit = { "functionName": treeFunctionView, "router": this.router}

          // render category tree view
          $('#frmt')
              .on("changed.jstree", conduit, function (e, data) {
                  if (data.selected.length) {
                      conduit.functionName(data.instance.get_node(data.selected[0]).text, conduit.router);
                  }
              })
              .jstree(data);
      }); //this.apiService.getResponse(httpArgs)

  } //initialTree()


  openTab(url) {
    window.open(url, "_blank");
  }

  doJQuery() {
    //class: QuestionText
    var htmlText = $('body').html();
    alert(htmlText);
  }

/*
  async openIngest(ingestType) {
    let localConfig = this.configService.getConfig();


    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      ingestType
    };
    dialogConfig.width = "500px";

    const dialogRef = this.dialog.open(IngestDialogComponent,
      dialogConfig);


    dialogRef.afterClosed().subscribe(
      val => console.log("Dialog closed")
    );

  } //openIngest

  async openSynonyms() {
    let localConfig = this.configService.getConfig();

    let synonymType = "UNKNOWN";

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      synonymType
    };
    dialogConfig.width = "500px";
    dialogConfig.height = "500px";

    const dialogRef = this.dialog.open(SynonymsDialogComponent,
      dialogConfig);


    dialogRef.afterClosed().subscribe(
      val => console.log("Dialog closed")
    );

  } //openSynonyms
*/

}
