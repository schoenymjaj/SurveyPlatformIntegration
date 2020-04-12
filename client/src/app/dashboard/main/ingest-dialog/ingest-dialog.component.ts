import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup, AbstractControl } from "@angular/forms";
import * as moment from 'moment'; //Not sure what this is?
import { MatSnackBar } from '@angular/material';

import { ConfigService } from '../../../services/config.service';
import { HelperService } from '../../../services/helper.service';
import { ApiService } from '../../../services/api.service';
import { HttpArgs } from '../../../classes/http-args';
//import { url } from 'inspector';


@Component({
  selector: 'ingest-dialog',
  templateUrl: './ingest-dialog.component.html',
  styleUrls: ['./ingest-dialog.component.css']
})
export class IngestDialogComponent implements OnInit {
  localConfig;
  refreshDataPeriodic;

  startLoadDateMinDate;
  initiallyLoadedStartLoadDate: boolean = false;

  //persist status
  generalDataQueryResponse: any;
  generalDataQueryResponseError;
  rtsGetIngestDateStatusResponse = {};
  rtsGetIngestDateStatusResponseError;
  rtsIngestStatusResponse = {};
  rtsIngestStatusResponseError;
  ucsfGetIngestDateStatusResponse = {};
  ucsfGetIngestDateStatusResponseError;
  ucsfIngestStatusResponse = {};
  ucsfIngestStatusResponseError;

  //persist start/stop responses
  rtsStartIngestResponse;
  rtsStartIngestResponseError;
  rtsStopIngestResponse;
  rtsStopIngestResponseError;
  ucsfStartIngestResponse;
  ucsfStartIngestResponseError;
  ucsfStopIngestResponse;
  ucsfStopIngestResponseError;

  ingestType: string;
  title: string = "";
  narrative = '';
  ingestDatePerformedValue = new Date('1/1/1969');
  startLoadDateOfRecordsToIngest = new Date('1/1/1969');
  statusLabel: string = '';

  ingestStatus;
  mostRecentIngestTaskId

  form: FormGroup;

  constructor(private configService: ConfigService,
    private helperService: HelperService,
    private apiService: ApiService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<IngestDialogComponent>,
    private snackBar: MatSnackBar,
    private decimalPipe: DecimalPipe,
    @Inject(MAT_DIALOG_DATA) { ingestType/*, title, narrative, statusLabel, ingestDate*/ }) {

    this.ingestType = ingestType;

    this.form = fb.group({
      narrativeFormControl: [this.narrative, Validators.required],
      ingestDatePerformedFormControl: ['/1/1969', Validators.required],
      startLoadDateOfRecordsToIngestFormControl: [this.startLoadDateOfRecordsToIngest,
      [Validators.required]],
      statusFormControl: ["no activity", Validators.required]
    });

  }

  ngOnInit() {
    this.helperService.logComponent(this.constructor.name, 'OnInit');

    //Refresh data - every XXX milliseconds defined in config file unless defined as 0
    this.localConfig = this.configService.getConfig();

    //if we've persisted the data general query result, lets initialize to this value
    if (this.helperService.retrieveData("GENERAL_DATA_QUERY") != null) {
      this.generalDataQueryResponse = this.helperService.retrieveData("GENERAL_DATA_QUERY");
      this.populateDialog(this.generalDataQueryResponse);
    } else {
      this.generalDataQueryResponse = { "rts": "", "rts-doc": "", "tckb": "", "ucsf": "", "idat": "" };
    }

    this.RefreshData();
    if (this.localConfig["refreshDataTimeinMsecs"] > 0) {

      this.refreshDataPeriodic = setInterval(() => {
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

        this.populateDialog(data);

        //MNS-Think this is the issue for resetting UI erroniously 
        // this.form = this.fb.group({
        //   narrativeFormControl: [this.narrative, Validators.required],
        //   ingestDatePerformedFormControl: ['1/1/1969', Validators.required],
        //   startLoadDateOfRecordsToIngestFormControl: [this.startLoadDateOfRecordsToIngest,
        //   [Validators.required]],
        //   statusFormControl: ["no activity", Validators.required]
        // });

        console.log(this.constructor.name + ' - received general data');
      },
        (error) => {
          console.log(error.message);
          this.generalDataQueryResponseError = error;
          this.helperService.logError('ERROR receiving general data:', error);
        }
      );


    if (this.ingestType == 'rts') {
      this.helperService.CallRestRtsGetMostRecentIngestStatus()
        .subscribe((data) => {
          console.log(data);
          this.rtsGetIngestDateStatusResponse = data;
          this.form.controls.ingestDatePerformedFormControl.reset(new Date(this.helperService.ISOStringTrim(data["date"].toString())));
          this.mostRecentIngestTaskId = data["taskid"];
          console.log(this.constructor.name + ' - received rts most recent status data');

          this.helperService.CallRestRtsStatus(this.mostRecentIngestTaskId)
            .subscribe((data) => {
              console.log(data);
              this.rtsIngestStatusResponse = data;

              let statusTotalStr: string = this.displayStatusForIngestDialog(data);;
              this.form.controls.statusFormControl.reset(statusTotalStr);
              console.log(this.constructor.name + ' - received rts status data');
            },
              (error) => {
                console.log(error.message);
                this.rtsIngestStatusResponseError = error;
                this.form.controls.statusFormControl.reset(JSON.stringify(error));
                this.helperService.logError('ERROR receiving rts status data:', error);
              }
            );

        },
          (error) => {
            console.log(error.message);
            this.rtsGetIngestDateStatusResponseError = error;
            this.helperService.logError('ERROR receiving rts get most recent status:', error);
          }
        );

    } else { //if (this.ingestType == 'rts') {

      this.helperService.CallRestUcsfGetMostRecentIngestStatus()
        .subscribe((data) => {
          console.log(data);
          this.ucsfGetIngestDateStatusResponse = data;
          this.ingestDatePerformedValue = new Date(data["date"]);

          //this is set to ensure that the user does not select a start load date at and before the last time an ingest was performed.
          this.startLoadDateMinDate = new Date(this.ingestDatePerformedValue.getTime() + 86400000);

          this.form.controls.ingestDatePerformedFormControl.reset(new Date(this.helperService.ISOStringTrim(data["date"].toString())));

          //only load once: the start load date based on the most recent ingest date + 1 day. After that if it's changed within the 
          //UI, then we act on the new value. We do not reinitialize it.
          if (!this.initiallyLoadedStartLoadDate) {
          this.startLoadDateOfRecordsToIngest = new Date(this.ingestDatePerformedValue.getTime() + 86400000);
          this.form.controls.startLoadDateOfRecordsToIngestFormControl.reset(this.startLoadDateOfRecordsToIngest);
          this.initiallyLoadedStartLoadDate = true;
          }

          this.mostRecentIngestTaskId = data["taskid"];
          console.log(this.constructor.name + ' - received ucsf most recent status data');

          this.helperService.CallRestUcsfStatus(this.mostRecentIngestTaskId)
            .subscribe((data) => {
              console.log(data);
              this.ucsfIngestStatusResponse = data;

              let statusTotalStr: string = this.displayStatusForIngestDialog(data);
              this.form.controls.statusFormControl.reset(statusTotalStr);

              console.log(this.constructor.name + ' - received ucsf status data');
            },
              (error) => {
                console.log(error.message);
                this.ucsfIngestStatusResponseError = error;
                this.form.controls.statusFormControl.reset(JSON.stringify(error));
                this.helperService.logError('ERROR receiving ucsf status data:', error);
              }
            );

        },
          (error) => {
            console.log(error.message);
            this.ucsfGetIngestDateStatusResponseError = error;
            this.helperService.logError('ERROR receiving ucsf get most recent status:', error);
          }
        );

    } //else //if (this.ingestType == 'rts') {

  } //renderIngest

  private populateDialog(generalDataQueryResponse: any) {

    let dialogParms = this.renderIngest(this.ingestType, this.generalDataQueryResponse);
    this.title = dialogParms['title'];
    this.narrative = dialogParms['narrative'];
    this.statusLabel = dialogParms['statusLabel'];

    this.form.controls.narrativeFormControl.reset(this.narrative);

  } //populateDialog

  private renderIngest(ingestType, dataSourceCounts) {
    let title = "";
    let narrative = "";
    let statusLabel = "";


    if (isNaN(ingestType)) {
      switch (ingestType) {
        case 'rts':
          title = "RTS Ingest";
          narrative = `CIRDs possesses ${this.decimalPipe.transform(dataSourceCounts['rts'], '2.')} projects and ${this.decimalPipe.transform(dataSourceCounts['rts-doc'], '2.')} documents for RTS`;
          statusLabel = "RTS Ingest Status";
          break;
        case 'tckb':
          title = "TCKB Ingest";
          narrative = `CIRDs possesses ${this.decimalPipe.transform(dataSourceCounts['tckb'], '2.')} substances for TCKB`;
          statusLabel = "TCKB Ingest Status";
          break;
        case 'ucsf':
          title = "UCSF Ingest";
          narrative = `CIRDs possesses ${this.decimalPipe.transform(dataSourceCounts['ucsf'], '2.')} documents for UCSF`;
          statusLabel = "UCSF Ingest Status";
          break;
      }
    } else {
      console.log('An invalid ingest type was specified');
      alert('An invalid ingest type was specified');
    }

    return {
      title,
      narrative,
      statusLabel
    }

  } //renderIngest() {

  startIngest() {
    switch (this.ingestType) {
      case 'rts':
        this.startRtsIngest();
        break;
      case 'ucsf':
        this.startUcsfIngest();
        break;
    }

  } //startIngest

  private startRtsIngest() {

    /*
    check to see if ingest has been started already
    If yes: then display message and go no further
    If no:  the start ingest, wait a few seconds, then get ingest status
    */

    const snackBarRef = this.snackBar.open('Do you want to start the RTS ingest?', 'YES', {
      duration: 10000,
      horizontalPosition: 'end'
    });

    snackBarRef.onAction().subscribe(() => {
      console.log('start rts ingest');

      let url: string;

      let localConfig = this.configService.getConfig();

      //get most recent status
      this.helperService.CallRestRtsGetMostRecentIngestStatus()
        .subscribe((data) => {
          console.log(data);
          console.log(this.constructor.name + ' - received rts get most recent ingest status data');

          this.ingestDatePerformedValue = new Date(this.helperService.ISOStringTrim(data["date"].toString()));
          this.mostRecentIngestTaskId = data["taskid"];

          //Check current ingest status
          this.helperService.CallRestRtsStatus(this.mostRecentIngestTaskId)
            .subscribe((data) => {
              console.log(data);
              console.log(this.constructor.name + ' - received rts status data for taskid:' + this.mostRecentIngestTaskId);

              this.rtsIngestStatusResponse = data;
              let statusTotalStr: string = this.displayStatusForIngestDialog(data);
              this.form.controls.statusFormControl.reset(statusTotalStr);

              //if there is activity then we are done.
              if (!this.helperService.isIngestActive(data)) {
                //rts ingest is NOT active, let's start one.

                //we are going to start a rts ingest with a start date
                this.helperService.CallRestRtsStart()
                  .subscribe((data) => {
                    console.log(data);
                    console.log(this.constructor.name + ' - received rts start ingest response data');

                    this.rtsStartIngestResponse = data;

                    //Ingest started. Everything looks look.
                    if (this.helperService.isIngestActionSuccess(data)) {
                      const snackBarRef = this.snackBar.open('The RTS ingest has started...', '', {
                        duration: 3000,
                        horizontalPosition: 'end'
                      });

                      //get task id for the started ingest
                      this.mostRecentIngestTaskId = this.helperService.getIngestTaskId(data);

                      //Lets wait a five seconds below checking status. give ingest a few seconds to start and update status
                      setTimeout(() => {

                        this.helperService.CallRestRtsStatus(this.mostRecentIngestTaskId)
                          .subscribe((data) => {
                            console.log(data);
                            console.log(this.constructor.name + ' - received rts status data for taskid:' + this.mostRecentIngestTaskId);

                            this.rtsIngestStatusResponse = data;
                            let statusTotalStr: string = this.displayStatusForIngestDialog(data);
                            this.form.controls.statusFormControl.reset(statusTotalStr);
                          },
                            (error) => {
                              console.log(error.message);
                              this.rtsIngestStatusResponseError = error;
                              this.form.controls.statusFormControl.reset(JSON.stringify(error));
                              this.helperService.logError('ERROR receiving rts status data:', error);
                            }
                          );

                      }, localConfig["startIngestTimeout"]);


                    } else {
                      const snackBarRef = this.snackBar.open('RTS ingest start has failed: ' + JSON.stringify(data), '', {
                        duration: 3000,
                        horizontalPosition: 'end'
                      });

                    }

                  }, //Handling error if RTS start ingest fails
                    (error) => {
                      console.log(error.message);
                      this.rtsStartIngestResponse = error;
                      this.form.controls.statusFormControl.reset(JSON.stringify(error));
                      this.helperService.logError('ERROR receiving rts start ingest data:', error);
                    }
                  );

              } else {
                //rts ingest already active
                const snackBarRef = this.snackBar.open('The RTS ingest is active already', '', {
                  duration: 3000,
                  horizontalPosition: 'end'
                });

              }

            }, //error for CallRestRtsStatus
              (error) => {
                this.rtsIngestStatusResponseError = error;
                this.form.controls.statusFormControl.reset(JSON.stringify(error));
                this.helperService.logError('ERROR receiving rts status data:', error);
              }
            );

        }, //error for CallRestRtsGetMostRecentIngestStatus()
          (error) => {
            this.helperService.logError('ERROR receiving rts get most recent status:', error);
          }
        );

    }); //snackBarRef.onAction().subscribe(() 


  } //startRtsIngest()

  private startUcsfIngest() {

    /*
    check to see if ingest has been started already
    If yes: then display message and go no further
    If no:  the start ingest, wait a few seconds, then get ingest status
    */

    const snackBarRef = this.snackBar.open('Do you want to start the UCSF ingest - will ingest records from UCSF with a load date of ' +
      this.startLoadDateOfRecordsToIngest.toLocaleDateString() +
      ' and after?', 'YES', {
        duration: 10000,
        horizontalPosition: 'end'
      });

    snackBarRef.onAction().subscribe(() => {
      console.log('start ucsf ingest');

      let url: string;


      let localConfig = this.configService.getConfig();


      this.helperService.CallRestUcsfGetMostRecentIngestStatus()
        .subscribe((data) => {
          console.log(data);
          console.log(this.constructor.name + ' - received ucsf get most recent ingest status data');

          this.ingestDatePerformedValue = new Date(this.helperService.ISOStringTrim(data["date"].toString()));
          this.mostRecentIngestTaskId = data["taskid"];

          //Check current ingest status
          this.helperService.CallRestUcsfStatus(this.mostRecentIngestTaskId)
            .subscribe((data) => {
              console.log(data);
              console.log(this.constructor.name + ' - received ucsf status data for taskid:' + this.mostRecentIngestTaskId);

              this.ucsfIngestStatusResponse = data;
              let statusTotalStr: string = this.displayStatusForIngestDialog(data);
              this.form.controls.statusFormControl.reset(statusTotalStr);

              //if there is activity then we are done.
              if (!this.helperService.isIngestActive(data)) {
                //ucsf ingest is NOT active, let's start one.

                let startDateISOString = "";
                if (this.form.controls.startLoadDateOfRecordsToIngestFormControl.value != null) {
                  startDateISOString = this.helperService.ISOStringDateOnly(this.form.controls.startLoadDateOfRecordsToIngestFormControl.value);
                }
                ///example: AutoIngest/IngestUcsf?action=start&startdate=2018-12-01

                //we are going to start a ucsf ingest with a start date
                this.helperService.CallRestUcsfStart(startDateISOString)
                  .subscribe((data) => {
                    console.log(data);
                    this.ucsfStartIngestResponse = data;
                    console.log(this.constructor.name + ' - received ucsf start ingest response data - start date:' + startDateISOString);

                    if (this.helperService.isIngestActionSuccess(data)) {
                      const snackBarRef = this.snackBar.open('The UCSF ingest has started...', '', {
                        duration: 3000,
                        horizontalPosition: 'end'
                      });

                      //get task id for the started ingest
                      this.mostRecentIngestTaskId = this.helperService.getIngestTaskId(data);

                      //Lets wait a five seconds below checking status. give ingest a few seconds to start and update status
                      setTimeout(() => {

                        this.helperService.CallRestUcsfStatus(this.mostRecentIngestTaskId)
                          .subscribe((data) => {
                            console.log(data);
                            this.ucsfIngestStatusResponse = data;
                            let statusTotalStr: string = this.displayStatusForIngestDialog(data);
                            this.form.controls.statusFormControl.reset(statusTotalStr);
                            console.log(this.constructor.name + ' - received ucsf status data for taskid:' + this.mostRecentIngestTaskId);
                          },
                            (error) => {
                              console.log(error.message);
                              this.ucsfIngestStatusResponseError = error;
                              this.form.controls.statusFormControl.reset(JSON.stringify(error));
                              this.helperService.logError('ERROR receiving ucsf status data:', error);
                            }
                          );

                      }, localConfig["startIngestTimeout"]);

                    } else {
                      const snackBarRef = this.snackBar.open('UCSF ingest start has failed: ' + JSON.stringify(data), '', {
                        duration: 3000,
                        horizontalPosition: 'end'
                      });

                    }

                  }, //Handling error if UCSF start ingest fails
                    (error) => {
                      console.log(error.message);
                      this.ucsfStartIngestResponse = error;
                      this.form.controls.statusFormControl.reset(JSON.stringify(error));
                      this.helperService.logError('ERROR receiving ucsf start ingest data:', error);
                    }
                  );

              } else {
                //ucsf ingest already active
                const snackBarRef = this.snackBar.open('The UCSF ingest is active already', '', {
                  duration: 3000,
                  horizontalPosition: 'end'
                });

              }

            }, //error handling for ucsfStatusUrl REST API call
              (error) => {
                console.log(error.message);
                this.ucsfIngestStatusResponseError = error;
                this.form.controls.statusFormControl.reset(JSON.stringify(error));
                this.helperService.logError('ERROR receiving ucsf status data:', error);
              }
            );

        }, //error for CallRestUcsfGetMostRecentIngestStatus()
          (error) => {
            this.helperService.logError('ERROR receiving ucsf get most recent status:', error);
          }
        );


    }); //snackBarRef.onAction().subscribe(() 


  } //startUcsfIngest()

  stopIngest() {
    switch (this.ingestType) {
      case 'rts':
        this.stopRtsIngest();
        break;
      case 'ucsf':
        this.stopUcsfIngest();
        break;
    }
  } //stopIngest

  private stopRtsIngest() {

    /*
    check the status of the active ingest.
    If not active anymore: then display message and go no further
    If active: then stop ingest, wait a few seconds, then get ingest status
    */

    const snackBarRef = this.snackBar.open('RTS Current Status: "' + this.helperService.GetIngestStatus(this.rtsIngestStatusResponse["status"]) + '". Do you still want to stop the RTS ingest?', 'YES', {
      duration: 10000,
      horizontalPosition: 'end'
    });

    snackBarRef.onAction().subscribe(() => {
      console.log('stop rts ingest');

      let url: string;

      let localConfig = this.configService.getConfig();

      //get most recent status
      this.helperService.CallRestRtsGetMostRecentIngestStatus()
        .subscribe((data) => {
          console.log(data);
          console.log(this.constructor.name + ' - received rts get most recent ingest status data');

          this.ingestDatePerformedValue = new Date(this.helperService.ISOStringTrim(data["date"].toString()));
          this.mostRecentIngestTaskId = data["taskid"];

          //Check current ingest status
          this.helperService.CallRestRtsStatus(this.mostRecentIngestTaskId)
            .subscribe((data) => {
              console.log(data);
              console.log(this.constructor.name + ' - received rts status data for taskid:' + this.mostRecentIngestTaskId);

              this.rtsIngestStatusResponse = data;
              let statusTotalStr: string = this.displayStatusForIngestDialog(data);
              this.form.controls.statusFormControl.reset(statusTotalStr);

              //if there is activity then we are done.
              if (this.helperService.isIngestActive(data)) {
                //rts ingest is  active, let's stop this one.

                //we are going to start a rts ingest with a start date
                this.helperService.CallRestRtsStop(this.mostRecentIngestTaskId)
                  .subscribe((data) => {
                    console.log(data);
                    console.log(this.constructor.name + ' - received rts stop ingest response data');

                    this.rtsStartIngestResponse = data;

                    //Ingest started. Everything looks look.
                    if (this.helperService.isIngestActionSuccess(data)) {
                      const snackBarRef = this.snackBar.open('The RTS ingest is stopping...', '', {
                        duration: 3000,
                        horizontalPosition: 'end'
                      });

                      //Lets wait a five seconds below checking status. give ingest a few seconds to start and update status
                      setTimeout(() => {

                        this.helperService.CallRestRtsStatus(this.mostRecentIngestTaskId)
                          .subscribe((data) => {
                            console.log(data);
                            console.log(this.constructor.name + ' - received rts status data for taskid:' + this.mostRecentIngestTaskId);

                            this.rtsIngestStatusResponse = data;
                            let statusTotalStr: string = this.displayStatusForIngestDialog(data);
                            this.form.controls.statusFormControl.reset(statusTotalStr);
                          },
                            (error) => {
                              console.log(error.message);
                              this.rtsIngestStatusResponseError = error;
                              this.form.controls.statusFormControl.reset(JSON.stringify(error));
                              this.helperService.logError('ERROR receiving rts status data:', error);
                            }
                          );

                      }, localConfig["startIngestTimeout"]);


                    } else {
                      const snackBarRef = this.snackBar.open('RTS ingest stop has failed: ' + JSON.stringify(data), '', {
                        duration: 3000,
                        horizontalPosition: 'end'
                      });

                    }

                  }, //Handling error if RTS start ingest fails
                    (error) => {
                      console.log(error.message);
                      this.rtsStartIngestResponse = error;
                      this.form.controls.statusFormControl.reset(JSON.stringify(error));
                      this.helperService.logError('ERROR receiving rts start ingest data:', error);
                    }
                  );

              } else {
                //rts ingest is not active
                const snackBarRef = this.snackBar.open('The RTS ingest is not active. There is no need to stop it.', '', {
                  duration: 3000,
                  horizontalPosition: 'end'
                });

              }

            }, //error for CallRestRtsStatus
              (error) => {
                this.rtsIngestStatusResponseError = error;
                this.form.controls.statusFormControl.reset(JSON.stringify(error));
                this.helperService.logError('ERROR receiving rts status data:', error);
              }
            );

        }, //error for CallRestRtsGetMostRecentIngestStatus()
          (error) => {
            this.helperService.logError('ERROR receiving rts get most recent status:', error);
          }
        );

    }); //snackBarRef.onAction().subscribe(() 


  } //stopRtsIngest()

  private stopUcsfIngest() {

    /*
    check the status of the active ingest.
    If not active anymore: then display message and go no further
    If active: then stop ingest, wait a few seconds, then get ingest status
    */

    const snackBarRef = this.snackBar.open('UCSF Current Status: "' + this.helperService.GetIngestStatus(this.ucsfIngestStatusResponse["status"]) + '". Do you still want to stop the UCSF ingest?', 'YES', {
      duration: 10000,
      horizontalPosition: 'end'
    });

    snackBarRef.onAction().subscribe(() => {
      console.log('stop ucsf ingest');

      let url: string;

      let localConfig = this.configService.getConfig();

      //get most recent status
      this.helperService.CallRestUcsfGetMostRecentIngestStatus()
        .subscribe((data) => {
          console.log(data);
          console.log(this.constructor.name + ' - received ucsf get most recent ingest status data');

          this.ingestDatePerformedValue = new Date(this.helperService.ISOStringTrim(data["date"].toString()));
          this.mostRecentIngestTaskId = data["taskid"];

          //Check current ingest status
          this.helperService.CallRestUcsfStatus(this.mostRecentIngestTaskId)
            .subscribe((data) => {
              console.log(data);
              console.log(this.constructor.name + ' - received ucsf status data for taskid:' + this.mostRecentIngestTaskId);

              this.ucsfIngestStatusResponse = data;
              let statusTotalStr: string = this.displayStatusForIngestDialog(data);
              this.form.controls.statusFormControl.reset(statusTotalStr);

              //if there is activity then we are done.
              if (this.helperService.isIngestActive(data)) {
                //ucsf ingest is  active, let's stop this one.

                //we are going to start a ucsf ingest with a start date
                this.helperService.CallRestUcsfStop(this.mostRecentIngestTaskId)
                  .subscribe((data) => {
                    console.log(data);
                    console.log(this.constructor.name + ' - received ucsf stop ingest response data');

                    this.ucsfStartIngestResponse = data;

                    //Ingest started. Everything looks look.
                    if (this.helperService.isIngestActionSuccess(data)) {
                      const snackBarRef = this.snackBar.open('The UCSF ingest is stopping...', '', {
                        duration: 3000,
                        horizontalPosition: 'end'
                      });

                      //Lets wait a five seconds below checking status. give ingest a few seconds to start and update status
                      setTimeout(() => {

                        this.helperService.CallRestUcsfStatus(this.mostRecentIngestTaskId)
                          .subscribe((data) => {
                            console.log(data);
                            console.log(this.constructor.name + ' - received ucsf status data for taskid:' + this.mostRecentIngestTaskId);

                            this.ucsfIngestStatusResponse = data;
                            let statusTotalStr: string = this.displayStatusForIngestDialog(data);
                            this.form.controls.statusFormControl.reset(statusTotalStr);
                          },
                            (error) => {
                              console.log(error.message);
                              this.ucsfIngestStatusResponseError = error;
                              this.form.controls.statusFormControl.reset(JSON.stringify(error));
                              this.helperService.logError('ERROR receiving ucsf status data:', error);
                            }
                          );

                      }, localConfig["startIngestTimeout"]);


                    } else {
                      const snackBarRef = this.snackBar.open('UCSF ingest stop has failed: ' + JSON.stringify(data), '', {
                        duration: 3000,
                        horizontalPosition: 'end'
                      });

                    }

                  }, //Handling error if UCSF start ingest fails
                    (error) => {
                      console.log(error.message);
                      this.rtsStartIngestResponse = error;
                      this.form.controls.statusFormControl.reset(JSON.stringify(error));
                      this.helperService.logError('ERROR receiving ucsf start ingest data:', error);
                    }
                  );

              } else {
                //ucsf ingest is not active
                const snackBarRef = this.snackBar.open('The UCSF ingest is not active. There is no need to stop it.', '', {
                  duration: 3000,
                  horizontalPosition: 'end'
                });

              }

            }, //error for CallRestUcsfStatus
              (error) => {
                this.ucsfIngestStatusResponseError = error;
                this.form.controls.statusFormControl.reset(JSON.stringify(error));
                this.helperService.logError('ERROR receiving ucsf status data:', error);
              }
            );

        }, //error for CallRestUcsfGetMostRecentIngestStatus()
          (error) => {
            this.helperService.logError('ERROR receiving ucsf get most recent status:', error);
          }
        );

    }); //snackBarRef.onAction().subscribe(() 


  } //stopUcsfIngest()

  /*
    returns true or false.
  */
  canIngestStart() {
    if (this.ingestType == 'rts') {

      if (this.generalDataQueryResponse["rts"] != "") {

        if (JSON.stringify(this.rtsIngestStatusResponse) != "{}") {

          if (this.helperService.isIngestActive(this.rtsIngestStatusResponse)) {
            return false;
          } else {
            return true;
          }

        } else {
          return false;
        }
      } else {
        return false;
      }

    } else {

      if (this.generalDataQueryResponse["ucsf"] != "") {

        if (JSON.stringify(this.ucsfIngestStatusResponse) != "{}") {

          if (this.helperService.isIngestActive(this.ucsfIngestStatusResponse)) {
            return false;
          } else {

            if(this.form.controls.startLoadDateOfRecordsToIngestFormControl.errors == null) {
              return true;
            } else {
              return false;
            }
          }

        } else {
          return false;
        }
      } else {
        return false;
      }


    } //if (this.ingestType == )

  }

  isIngestActive() {

    if (this.ingestType == 'rts') {
      return this.helperService.isIngestActive(this.rtsIngestStatusResponse);
    } else {
      return this.helperService.isIngestActive(this.ucsfIngestStatusResponse);
    }
  }

  private displayStatusForIngestDialog(returnFromStatusCall: any) {
    return this.helperService.GetIngestStatus(returnFromStatusCall["status"]) +
    String.fromCharCode(13) +
    "Number of Records Ingested: " + returnFromStatusCall["ingested"] +
    String.fromCharCode(13) +
    "Number of Records Harmonized: " + returnFromStatusCall["harmonized"];
  }

  close() {
    clearInterval(this.refreshDataPeriodic);
    this.dialogRef.close();
  }

}


