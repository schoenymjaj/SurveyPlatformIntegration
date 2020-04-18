import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { Assessment } from '../../../../shared/assessment';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  Assessment: Assessment[]
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getassessment().subscribe(assessment => {
      this.Assessment = assessment
      this.dataService.assessmentData = assessment
    });
  }

  onSelectedOption(e) {
    this.getFilteredExpenseList();
  }

  getFilteredExpenseList() {
    if (this.dataService.searchOption.length > 0)
      this.Assessment = this.dataService.filteredListOptions();
    else {
      this.Assessment = this.dataService.assessmentData;
    }

    console.log(this.Assessment)
  }

}
