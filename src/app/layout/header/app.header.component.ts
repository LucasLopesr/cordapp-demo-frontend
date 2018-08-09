import {Component, OnInit} from '@angular/core';
import {TranslateService, LangChangeEvent} from '@ngx-translate/core';
import {environment} from '../../../environments/environment';
import {AppHeaderService} from './app.header.service';

@Component({
  selector: 'app-header',
  templateUrl: './app.header.component.html',
  styleUrls: ['./app.header.component.css'],
})
export class AppHeaderComponent implements OnInit {

  private title: string;

  constructor(private translate: TranslateService, private header: AppHeaderService) {
    translate.addLangs(environment.languages);
    translate.setDefaultLang(environment.language);

    const lang = localStorage.getItem('lang');
    translate.use(lang != null ? lang : environment.language);
  }

  ngOnInit() {
    this.header.changeTitle.subscribe(title => {
      this.title = title;
    });
  }

  getTitle() {
    return this.title;
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  isLanguage(lang: string) {
    return this.translate.currentLang === lang;
  }

}
