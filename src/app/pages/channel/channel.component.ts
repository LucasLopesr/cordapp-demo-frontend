import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
})
export class ChannelComponent implements OnInit {

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
