import {AppHeaderComponent} from '../../../layout/header/app.header.component';
import {AppHeaderService} from '../../../shared/services/app.header.service';
import {Coverage} from '../../../model/coverage.model';
import {Entity} from '../../../model/entity.model';
import {InsuranceRequest} from '../../../model/insurance.model';
import {Product} from '../../../model/product.model';
import {SnackbarService} from '../../../shared/services/snackbar.service';
import {CoverageService} from '../../../shared/services/coverage.service';
import {InsuranceService} from '../../../shared/services/insurance.service';
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

  private id: number;
  private total: number;

  constructor(private activatedRoute: ActivatedRoute,
    private header: AppHeaderService,
    private snackbarService: SnackbarService,
    private translate: TranslateService,
    private coverageService: CoverageService,
    private insuranceService: InsuranceService,
    private productService: ProductService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.header.setTitle('channelMicroinsurance', {name: this.id.toString() === '1' ? 'A' : 'B'});
    this.initData();
  }

  private initData() {
    this.requestData();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.requestData();
    });
  }

  private requestData() {
    this.productService.getProducts(this.id).subscribe(products => {
      this.coverageService.getCoverages(this.id).subscribe(insurances => {
        this.updateData(products, insurances);
      });
    });
  }

  private updateData(products: Product[], coverages: Coverage[]) {
    this.dataSource = new MatTableDataSource(this.createRows(products, coverages));
    this.dataSource.filterPredicate = (row: Object, filter: string) => {
      const product = this.getProduct(row);

      return this.filterAttr(product.nku, filter)
        || this.filterAttr(product.brand, filter)
        || this.filterAttr(product.description, filter);
    };
    this.calculateTotal();
  }

  private createRows(products: Product[], coverages: Coverage[]) {
    const rows = [];

    products.forEach(product => {
      const row = {product: product, selected: false};
      rows.push(row, {parent: row, coverages: this.cloneCoverages(coverages)});
    });

    return rows;
  }

  private cloneCoverages(coverages: Coverage[]) {
    const data = [];

    coverages.forEach(coverage => {
      const clonned = Object.create(coverage);
      clonned['selected'] = false;
      data.push(clonned);
    });

    return data;
  }

  private filterAttr(attribute: string, value: string): boolean {
    return attribute.toLowerCase().indexOf(value.toLowerCase()) > -1;
  }

  private isProductRow(row: Object) {
    return !row.hasOwnProperty('parent');
  }

  private getProduct(row: Object): Product {
    return this.isProductRow(row) ? row['product'] : row['parent']['product'];
  }

  filter(value: string) {
    this.dataSource.filter = value;
  }

  getTotal(): number {
    return this.total;
  }

  calculateTotal() {
    let result = 0;

    this.dataSource.data
      .filter(row => !this.isProductRow(row) && row['parent']['selected'] === true)
      .forEach(row => result += this.calculateCoverages(row['coverages']));

    this.total = result;
  }

  private calculateCoverages(coverages: Coverage[]) {
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

  hire() {
    const products = this.getSelectedProducts();

    if (products.length === 0) {
      this.translate.get('noProductSelected').subscribe(text => {
        this.snackbarService.error(text);
      });
      return;
    }

    products.forEach(product => {
      const coverages = this.getSelectedCoverages(product);
      if (coverages.length === 0) {
        this.translate.get('noCoverageHired', {nku: product.nku}).subscribe(text => {
          this.snackbarService.error(text);
        });
      } else {
        this.hireInsurance(product, coverages);
      }
    });
  }

  private getSelectedProducts(): Product[] {
    return this.dataSource.data
      .filter(row => {
        return this.isProductRow(row) && row['selected'] === true;
      })
      .map(function(row): Product {
        return row['product'];
      });
  }

  private clearSelection(product: Product) {
    this.dataSource.data
      .filter(row => this.isProductRow(row) && row['product'] === product)
      .forEach(row => row['selected'] = false);

    this.getCoveragesOfProduct(product)
      .forEach(row => row['selected'] = false);

    this.calculateTotal();
  }

  private getSelectedCoverages(product: Product): Coverage[] {
    return this.getCoveragesOfProduct(product)
      .filter(function(coverage: Coverage) {
        return coverage['selected'] === true;
      });
  }

  private getCoveragesOfProduct(product: Product): Coverage[] {
    return ([] as Coverage[])
      .concat(...this.dataSource.data
        .filter(row => {
          return !this.isProductRow(row)
            && row['parent']['product'] === product;
        })
        .map(function(row): Coverage[] {
          return row['coverages'];
        })
      );
  }

  private hireInsurance(product: Product, coverages: Coverage[]) {
    const insurance = new InsuranceRequest();
    insurance.insurer = 'O=Seguradora,L=London,C=GB';
    insurance.productId = product.id;
    insurance.coveragesIds = this.getIds(coverages);

    this.insuranceService.createInsurance(this.id, insurance).subscribe(resp => {
      this.clearSelection(product);
      this.translate.get('transactionDone', {id: resp.transactionId}).subscribe(text => {
        this.snackbarService.success(text);
      });
    }, err => {
      console.error(err);
    });
  }

  private getIds(entities: Entity[]): string[] {
    return entities.map(function(entity: Entity) {
      return entity.id;
    });
  }

}
