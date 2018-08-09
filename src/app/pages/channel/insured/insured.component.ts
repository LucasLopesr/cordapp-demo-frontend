import { AppHeaderService } from '../../../layout/header/app.header.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-channel-insured',
  templateUrl: './insured.component.html',
  styleUrls: ['./insured.component.css'],
})
export class ChannelInsuredComponent implements OnInit {

  private name: string;

  constructor(private activatedRoute: ActivatedRoute, private header: AppHeaderService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.name = params['id'] === '1' ? 'A' : 'B';
    });
    this.header.setTitle('channelMicroinsurance', {name: this.name});
  }

  getName() {
    return this.name;
  }

}
