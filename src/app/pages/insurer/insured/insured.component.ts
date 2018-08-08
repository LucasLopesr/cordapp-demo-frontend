import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-insurer-insured',
  templateUrl: './insured.component.html',
  styleUrls: ['./insured.component.css'],
})
export class InsurerInsuredComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
  }

}
