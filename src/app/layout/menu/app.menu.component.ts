import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  styleUrls: ['./app.menu.component.css'],
})
export class AppMenuComponent {

  constructor(private router: Router, private translate: TranslateService) {
    translate.addLangs(environment.languages);
    translate.setDefaultLang(environment.language);

    const lang = localStorage.getItem('lang');
    translate.use(lang != null ? lang : environment.language);
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  isLanguage(lang: string) {
    return this.translate.currentLang === lang;
  }

}
