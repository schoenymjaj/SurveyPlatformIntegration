import { Injectable } from '@angular/core';
import { Assessment } from '../shared/assessment';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  searchOption=[]
  public assessmentData: Assessment[] 
  postUrl : string = "../assets/data/assessment-library/assessment-library.json"; 

  constructor(
    private http: HttpClient
  ) { }


  getassessment(): Observable<Assessment[]>{
    return this.http.get<Assessment[]>(this.postUrl);
    
  }

  filteredListOptions() {
    let assessment = this.assessmentData;
        let filteredassessmentList = [];
        for (let Assessment of assessment) {
            for (let options of this.searchOption) {
                if (options.title === Assessment.title) {
                  filteredassessmentList.push(Assessment);
                }
            }
        }
        console.log(filteredassessmentList);
        return filteredassessmentList;
  }
}
