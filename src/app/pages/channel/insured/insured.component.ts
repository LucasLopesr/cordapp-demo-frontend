import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-channel-insured',
  templateUrl: './insured.component.html',
  styleUrls: ['./insured.component.css'],
})
export class ChannelInsuredComponent implements OnInit {

  private name: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.name = params['id'] === '1' ? 'A' : 'B';
    });
  }

  getName() {
    return this.name;
  }

}
