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
  {product: {nku: '409', brand: 'Sony', price: 6123.62, description: 'Smart TV 42 Polegadas Led 4K SNY7654'}, selected: false},
  {product: {nku: '111', brand: 'Philco', price: 5123.04, description: 'Smart TV 40 Polegadas Led 4K PH89898'}, selected: false},
  {product: {nku: '075', brand: 'LG', price: 7123.25, description: 'Smart TV 50 Polegadas Led 4K LG50231'}, selected: true},
  {product: {nku: '053', brand: 'Samsung', price: 9123.12, description: 'Smart TV 64 Polegadas Led 4K MU6400'}, selected: false}
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
  displayedDColumns = ['selection', 'name', 'price', 'description'];

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
    this.dataSource = new MatTableDataSource(this.createRows());
    this.dataSource.filterPredicate = (row: Object, filter: string) => {
      const product = this.getProduct(row);

      return this.filterAttr(product.nku, filter)
          || this.filterAttr(product.brand, filter)
          || this.filterAttr(product.description, filter);
    };
  }

  filterAttr(attribute: string, value: string): boolean {
    return attribute.toLowerCase().indexOf(value.toLowerCase()) > -1;
  }

  isProductRow(row: Object) {
    return !row.hasOwnProperty('parent');
  }

  getProduct(row: Object): Product {
    return this.isProductRow(row) ? row['product'] : row['parent']['product'];
  }

  filter(value: string) {
    this.dataSource.filter = value;
  }

  createRows() {
    const rows = [];
    data.forEach(row => rows.push(row, {parent: row, coverages: this.createCoverages(row.product) }));
    return rows;
  }

  createCoverages(product: Product) {
    const coverages = [];

    coverages.push({selected: false, nku: product.nku, name: 'Garantia Estendida', price: 93.34,
      description: 'Garantia adicional de 2 anos contra defeitos de fabricação'});

    coverages.push({selected: false, nku: product.nku, name: 'Proteção contra Danos', price: 52.10,
      description: 'Cobertura contra incêndio, raios e vendavais'});

    return coverages;
  }

  getName() {
    return this.name;
  }

  /**
   * Odd indexes are the coverage rows.
   */
  isCoverageRow = (index: number, row: Object) => {
    return (index + 1) % 2 === 0;
  }

}
