import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  styleUrls: ['./app.menu.component.css'],
})
export class AppMenuComponent {

  constructor(private router: Router, private translate: TranslateService) {
  }

}
