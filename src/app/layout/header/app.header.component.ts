import {Component, OnInit} from '@angular/core';
import {TranslateService, LangChangeEvent} from '@ngx-translate/core';
import {AppHeaderService} from '../../shared/services/app.header.service';

@Component({
  selector: 'app-header',
  templateUrl: './app.header.component.html',
  styleUrls: ['./app.header.component.css'],
})
export class AppHeaderComponent implements OnInit {

  private title: string;

  constructor(private translate: TranslateService, private header: AppHeaderService) {
  }

  ngOnInit() {
    this.header.changeTitle.subscribe(title => {
      this.title = title;
    });
  }

  getTitle() {
    return this.title;
  }

}
