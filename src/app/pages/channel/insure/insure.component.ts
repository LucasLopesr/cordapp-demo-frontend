import {AppHeaderComponent} from '../../../layout/header/app.header.component';
import {AppHeaderService} from '../../../layout/header/app.header.service';
import {Coverage} from '../../../model/coverage.model';
import {Product} from '../../../model/product.model';
import {CoverageService} from '../../../shared/services/insurance.service';
import {ProductService} from '../../../shared/services/product.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {TranslateService, LangChangeEvent} from '@ngx-translate/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-channel-insure',
  templateUrl: './insure.component.html',
  styleUrls: ['./insure.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ChannelInsureComponent implements OnInit {
  displayedProductColumns = ['nku', 'brand', 'price', 'description', 'selection'];
  displayedCoverageColumns = ['selection', 'name', 'price', 'description'];

  dataSource: MatTableDataSource<any>;

  private name: string;
  private total: number;

  constructor(private activatedRoute: ActivatedRoute,
    private header: AppHeaderService,
    private translate: TranslateService,
    private insuranceService: CoverageService,
    private productService: ProductService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.name = params['id'] === '1' ? 'A' : 'B';
    });
    this.header.setTitle('channelMicroinsurance', {name: this.name});
    this.initData();
  }

  initData() {
    this.requestData();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.requestData();
    });
  }

  requestData() {
    this.productService.getProducts().subscribe(products => {
      this.insuranceService.getCoverages().subscribe(insurances => {
        this.updateData(products, insurances);
      });
    });
  }

  updateData(products: Product[], coverages: Coverage[]) {
    this.dataSource = new MatTableDataSource(this.createRows(products, coverages));
    this.dataSource.filterPredicate = (row: Object, filter: string) => {
      const product = this.getProduct(row);

      return this.filterAttr(product.nku, filter)
        || this.filterAttr(product.brand, filter)
        || this.filterAttr(product.description, filter);
    };
    this.calculateTotal();
  }

  createRows(products: Product[], coverages: Coverage[]) {
    const rows = [];

    products.forEach(product => {
      const row = {product: product, selected: false};
      rows.push(row, {parent: row, coverages: this.cloneCoverages(coverages)});
    });

    return rows;
  }

  cloneCoverages(coverages: Coverage[]) {
    const data = [];

    coverages.forEach(coverage => {
      const clonned = Object.create(coverage);
      clonned['selected'] = false;
      data.push(clonned);
    });

    return data;
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

  getName(): string {
    return this.name;
  }

  getTotal(): number {
    return this.total;
  }

  calculateTotal() {
    let result = 0;
    for (let row of this.dataSource.data) {
      if (!this.isProductRow(row)) {
        if (row['parent']['selected'] === true) {
          result += this.calculateCoverages(row['coverages']);
        }
      }
    }
    this.total = result;
  }

  calculateCoverages(coverages: Coverage[]) {
    let result = 0;
    for (const coverage of coverages) {
      if (coverage['selected'] === true) {
        result += coverage.price;
      }
    }
    return result;
  }

  /**
   * Odd indexes are the coverage rows.
   */
  isCoverageRow = (index: number, row: Object) => {
    return (index + 1) % 2 === 0;
  }

}
