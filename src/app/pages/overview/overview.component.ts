import { AppHeaderService } from '../../layout/header/app.header.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit {

  constructor(private router: Router,
              private translate: TranslateService,
              private header: AppHeaderService) {
  }

  ngOnInit(): void {
    this.header.setTitle('microinsurance');
  }

}
