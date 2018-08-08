import { AppHeaderComponent } from '../../../layout/header/app.header.component';
import { AppHeaderService } from '../../../layout/header/app.header.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-channel-insure',
  templateUrl: './insure.component.html',
  styleUrls: ['./insure.component.css'],
})
export class ChannelInsureComponent implements OnInit {

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
