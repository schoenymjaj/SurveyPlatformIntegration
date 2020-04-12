import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { FormBuilder} from '@angular/forms'
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { HelperService } from '../../../services/helper.service';
import { ApiService } from '../../../services/api.service';
import { HttpArgs } from '../../../classes/http-args';
import { urlValidator } from '../../../shared/urlString.validator';

@Component({
  selector: 'app-exerciser',
  templateUrl: './exerciser.component.html',
  styleUrls: ['./exerciser.component.css']
})

export class ExerciserComponent implements OnInit {
  httpForm: FormGroup;
  urlFormControl: FormControl;
  protocolFormControl: FormControl;
  authTypeFormControl: FormControl;
  authStringFormControl: FormControl;
  responseTypeFormControl: FormControl;
  mlportFormControl: FormControl;
  urlChoiceFormControl: FormControl;
  jsonResponse = {};
  error = {};
  snackBarRef;
  
  protocols = ['GET', 'POST'];
  responseTypes = ['application/json', 'text/html', 'text/plain', 'text/xml'];
  authTypes = ['NO AUTH', 'BASIC AUTH'];
  ApiUrls: string[] = [
    'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=a1081749dc9b4ab3923b70b693ad7e50',
    'http://localhost:8085/read?parm1=parm1valuefromClient&parm2=parm2valuefromClient',
    'http://localhost:8085/create'
  ];

  //urlDefault = 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=a1081749dc9b4ab3923b70b693ad7e50';
  urlDefault = 'http://localhost:8085/read?parm1=parm1valuefromClient&parm2=parm2valuefromClient';

  selectFormControl = new FormControl('', Validators.required);
  
  get urlString() {
    return this.httpForm.get('urlFormControl');
  }

  get additionalContent() {
    return this.httpForm.get('additionalContent') as FormArray;
  }

  addAdditionalContent() {
    this.additionalContent.push(this.fb.control('What up?'));
  }

  constructor(private helperService: HelperService,
              private fb: FormBuilder,
              private dialog: MatDialog, 
              private snackBar: MatSnackBar, 
              private apiService: ApiService, 
              private router: Router) { }

  ngOnInit() {
    this.helperService.logComponent(this.constructor.name, 'OnInit');

    //var ctrl = new FormControl();

    this.httpForm = this.fb.group({
      urlFormControl: ['',[Validators.required, Validators.minLength(6), urlValidator(['http://','https://'])]],
      protocolFormControl: ['GET'],
      authTypeFormControl: ['NO AUTH'],
      authStringFormControl: [''],
      mlportFormControl: [''],
      responseTypeFormControl: ['application/json'],
      urlChoiceFormControl: [,Validators.required],
      additionalContent: this.fb.array([])
    });

    //this works 
    // this.httpForm.patchValue({
    //   urlFormControl: this.urlDefault
    // });

    //If I wanted to initialize the entire form - this works
    // this.httpForm.setValue(
    //   {
    //     urlFormControl: "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=a1081749dc9b4ab3923b70b693ad7e50",
    //     protocolFormControl: 'GET',
    //     authTypeFormControl: "NO AUTH",
    //     authStringFormControl: "",
    //     mlportFormControl: "",
    //     responseTypeFormControl: "application/json",
    //     urlChoiceFormControl: ["https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=a1081749dc9b4ab3923b70b693ad7e50"]
    //     additionalContent: 
    //   }
    // );



    // this.httpForm = new FormGroup({
    //   urlFormControl: new FormControl(this.urlDefault, [
    //     Validators.required]),
    //   protocolFormControl: new FormControl('GET', [
    //     Validators.required
    //   ]),
    //   authTypeFormControl: new FormControl('NO AUTH', [
    //     Validators.required
    //   ]),
    //   authStringFormControl: new FormControl('', [
    //   ]),
    //   mlportFormControl : new FormControl('', [
    //   ]),
    //   responseTypeFormControl : new FormControl('application/json', [
    //     Validators.required
    //   ]),
    //   urlChoiceFormControl:  new FormControl('',[
    //   Validators.required
    //   ])
    // });

    // this.httpForm.controls.urlFormControl = new FormControl(this.urlDefault, [
    //   Validators.required
    // ]);
    // this.httpForm.controls.protocolFormControl = new FormControl('GET', [
    //   Validators.required
    // ]);
    // this.httpForm.controls.authTypeFormControl = new FormControl('NO AUTH', [
    //   Validators.required
    // ]);
    // this.httpForm.controls.authStringFormControl = new FormControl('', [
    // ]);
    // this.httpForm.controls.responseTypeFormControl = new FormControl('application/json', [
    //   Validators.required
    // ]);
    // this.httpForm.controls.mlportFormControl = new FormControl('', [
    // ]);

    // this.urlChoiceFormControl = new FormControl('',[
    //   Validators.required
    // ]);

  }

  resetForm() {
    //this.ngOnInit();
    this.httpForm.controls.urlFormControl = new FormControl('', [
      Validators.required
    ]);
    this.httpForm.controls.protocolFormControl = new FormControl('GET', [
      Validators.required
    ]);
    this.httpForm.controls.authTypeFormControl = new FormControl('NO AUTH', [
      Validators.required
    ]);
    this.httpForm.controls.authStringFormControl = new FormControl('', [
    ]);
    this.httpForm.controls.responseTypeFormControl = new FormControl('application/json', [
      Validators.required
    ]);
    this.httpForm.controls.mlportFormControl = new FormControl('', [
    ]);

    this.urlChoiceFormControl = new FormControl('',[
      Validators.required
    ]);

    this.jsonResponse = {};
  }

  performRestAPICall() {

    //this.httpForm.controls.protocolFormControl.value;
    //this.httpForm.controls.urlFormControl.value;

    let urlSansProtocol = this.httpForm.controls.urlFormControl.value.replace('http://','').replace('https://','');
    let parmCount = Object.keys(this.router.parseUrl(urlSansProtocol).queryParams).length;
    let url = '';
    if (parmCount == 0)
    {
      url = this.httpForm.controls.urlFormControl.value + (this.httpForm.controls.mlportFormControl.value != ''?  '?mlport=' + this.httpForm.controls.mlportFormControl.value: '')
    } else {
      url = this.httpForm.controls.urlFormControl.value + (this.httpForm.controls.mlportFormControl.value != ''?  '&mlport=' + this.httpForm.controls.mlportFormControl.value: '')
    }


    this.jsonResponse = {}; //initialize before API call


    let httpArgs = new HttpArgs(this.httpForm.controls.protocolFormControl.value,
                                this.httpForm.controls.authTypeFormControl.value,
                                this.httpForm.controls.authStringFormControl.value,
                                this.httpForm.controls.responseTypeFormControl.value,
                                url);

    this.apiService.getResponse(httpArgs,this.httpForm.value)
      .subscribe((data)=>{
                    console.log(data);
                    this.jsonResponse = data;
                    this.openSnackBar('REST API Call Success!');                
                  },
                 (error) =>{
                  console.log(error.message);
                  this.error = error;
                  this.openSnackBar(error.message);                
                  }
                );



    };

    openSnackBar(message) {
      const snackBarRef = this.snackBar.open(message,'OK', {
        //horizontalPosition: 'end',
        duration: 5000
      });
  
      snackBarRef.onAction().subscribe(() => {
        //alert('YES!');
      });    
    }    

    selectNewUrlChoice(event) {
      this.httpForm.controls.urlFormControl.setValue(event.option.value);
      this.httpForm.controls.urlChoiceFormControl.setValue([event.option.value]);
      //this.httpForm.controls.urlChoiceFormControl.setValue([]);

    }

    displayFormValue(event) {
      console.log(this.httpForm.value);
    }

}  //export class ExerciserComponent implements OnInit {


