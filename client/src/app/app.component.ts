import { Component, OnInit,PipeTransform, Pipe } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { HelperService } from './services/helper.service';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'risc';

  constructor(private helperService: HelperService) {
  }

  ngOnInit() {
    this.helperService.logComponent(this.constructor.name, 'OnInit');
  }

}
