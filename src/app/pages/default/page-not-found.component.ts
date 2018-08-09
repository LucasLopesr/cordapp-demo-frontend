import {AppHeaderService} from '../../layout/header/app.header.service';
import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private location: Location, private header: AppHeaderService) {}

  ngOnInit() {
    this.header.setTitle('microinsurance');
  }

  goBack() {
    this.location.back();
  }

}
