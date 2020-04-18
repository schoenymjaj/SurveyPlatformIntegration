import { Component, OnInit, ViewChild, ElementRef,EventEmitter,Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../../../../services/data.service';
import { Assessment } from '../../../../shared/assessment';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  allassessment: Assessment[];
  autoCompleteList: any[]

  @ViewChild('autocompleteInput', {static: true}) autocompleteInput: ElementRef;
  @Output() onSelectedOption = new EventEmitter();

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getassessment().subscribe(assessment => {
      this.allassessment = assessment

    });

    this.myControl.valueChanges.subscribe(userInput => {
      this.autoCompleteExpenseList(userInput);
    })
  }

  private autoCompleteExpenseList(input) {
    let categoryList = this.filterCategoryList(input)
    this.autoCompleteList = categoryList;
  }

  filterCategoryList(val) {
    var categoryList = []
    if (typeof val != "string") {
      return [];
    }
    if (val === '' || val === null) {
      return [];
    }
    return val ? this.allassessment.filter(s => s.title.toLowerCase().indexOf(val.toLowerCase()) != -1)
      : this.allassessment;
  }

  displayFn(Assessment: Assessment) {
    let k = Assessment ? Assessment.title : Assessment;
    return k;
  }

  filterPostList(event) {
    var assessment= event.source.value;
        if(!assessment) {
          this.dataService.searchOption=[]
        }
        else {
          console.log("not")

            this.dataService.searchOption.push(assessment);
            this.onSelectedOption.emit(this.dataService.searchOption)
        }
        
        this.focusOnPlaceInput();

       
        
  }


  removeOption(option) {
        
    let index = this.dataService.searchOption.indexOf(option);
    if (index >= 0)
        this.dataService.searchOption.splice(index, 1);
        this.focusOnPlaceInput();

        this.onSelectedOption.emit(this.dataService.searchOption)
}

focusOnPlaceInput() {
  this.autocompleteInput.nativeElement.focus();
  this.autocompleteInput.nativeElement.value = '';
}


}
