import {AppHeaderComponent} from '../../../layout/header/app.header.component';
import {AppHeaderService} from '../../../layout/header/app.header.service';
import { Product } from '../../../model/product.model';
import { ProductSelection } from './product-selection.model';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material';

const data: ProductSelection[] = [
  {product: {nku: '409', brand: 'Sony', price: 1.0079, description: 'Smart TV'}, selected: false},
  {product: {nku: '030', brand: 'Sony', price: 4.0026, description: 'Smart TV'}, selected: false},
  {product: {nku: '010', brand: 'Sony', price: 6.941, description: 'Smart TV'}, selected: true},
  {product: {nku: '100', brand: 'Sony', price: 9.0122, description: 'Smart TV'}, selected: false},
  {product: {nku: '102', brand: 'Sony', price: 10.811, description: 'Smart TV'}, selected: false}
];

@Component({
  selector: 'app-channel-insure',
  templateUrl: './insure.component.html',
  styleUrls: ['./insure.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ChannelInsureComponent implements OnInit {

  displayedColumns = ['nku', 'brand', 'price', 'description', 'selection'];
  dataSource: MatTableDataSource<any>;

  private name: string;

  constructor(private activatedRoute: ActivatedRoute,
    private header: AppHeaderService,
    private translate: TranslateService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.name = params['id'] === '1' ? 'A' : 'B';
    });
    this.header.setTitle('channelMicroinsurance', {name: this.name});
    this.dataSource = new MatTableDataSource(this.getRows());
  }

  getRows() {
    const rows = [];
    data.forEach(product => rows.push(product, { detailRow: true, product }));
    return rows;
  }

  getName() {
    return this.name;
  }

  isExpansionDetailRow = (i: number, row: Object) => {
    console.log(row);
    return row.hasOwnProperty('detailRow');
  }

}
