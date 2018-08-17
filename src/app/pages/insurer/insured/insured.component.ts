import {AppHeaderComponent} from '../../../layout/header/app.header.component';
import {AppHeaderService} from '../../../layout/header/app.header.service';
import { Product } from '../../../model/product.model';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-insurer-insured',
  templateUrl: './insured.component.html',
  styleUrls: ['./insured.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InsurerInsuredComponent implements OnInit {

  displayedColumns = ['product', 'insurance', 'date', 'billed', 'comission'];
  dataSource: MatTableDataSource<any>;

  pieChartLabel: string[];
  pieChartData: number[];
  barChartLabels: string[];
  barChartData: any[];

  private billedAmount: number;
  private salesCommission: number;
  private name: string;

  constructor(private activatedRoute: ActivatedRoute,
    private header: AppHeaderService,
    private translate: TranslateService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.name = params['id'] === '1' ? 'A' : 'B';
    });
    this.header.setTitle('insurerMicroinsurance');
    this.dataSource = new MatTableDataSource(this.createRows());
    this.dataSource.filterPredicate = (row: Object, value: string) => {

      return this.filterAttr(row['product'], value)
          || this.filterAttr(row['insurances'], value, 'name')
          || this.filterAttr(row['date'], value);
    };
    this.calculateTotal();
    this.initCharts();
  }

  filterAttr(attribute: any, value: string, attr?: string): boolean {
    if (attribute instanceof Array) {
      for (const item of attribute) {
        if (item[attr].toLowerCase().indexOf(value.toLowerCase()) > -1) {
          return true;
        }
      }
    } else {
      return attribute.toLowerCase().indexOf(value.toLowerCase()) > -1;
    }
  }

  filter(value: string) {
    this.dataSource.filter = value;
  }

  calculateTotal() {
    let billedResult = 0;
    let commissionResult = 0;

    for (const item of this.dataSource.data) {
      billedResult += item['billed'];
      commissionResult += item['comission'];
    }
    this.billedAmount = billedResult;
    this.salesCommission = commissionResult;
  }

  getBilledAmount(): number {
    return this.billedAmount;
  }

  getSalesCommission(): number {
    return this.salesCommission;
  }

  createRows() {
    const data: object[] = [
      {product: 'Smart TV 64 Polegadas Led 4K MU6400',
        insurances: [{name: 'Garantia X', billed: 73.4, comission: 3.23},
                     {name: 'Garantia Y', billed: 20.54, comission: 2.44}],
        date: '2018-06-06', billed: 93.94, comission: 5.67 },

      {product: 'Smart TV 40 Polegadas', 
        insurances: [{name: 'Garantia Z', billed:123.4, comission: 8.56}],
        date: '2017-06-07', billed: 123.4, comission: 8.56 },

      {product: 'Smart TV 32 Polegadas FH5000', 
        insurances: [{name: 'Garantia Z', billed: 473.1, comission: 18.23},
                     {name: 'Garantia Y', billed: 209.04, comission: 15.63}],
        date: '2016-06-09', billed: 682.14, comission: 33.86 },

      {product: 'Smart TV 90 Polegadas Led 4K AXD', 
        insurances: [{name: 'Garantia X', billed: 278.0, comission: 84.5}],
        date: '2016-12-25', billed: 278.0, comission: 84.5 }
    ];
    return data;
  }

  initCharts() {
    this.initPieChart();
    this.initBarChart();
  }

  initPieChart() {
    const labels: string[] = [];
    const values: number[] = [];

    for (const row of this.dataSource.data) {
      for (const insurance of row['insurances']) {
        const labelIndex = labels.indexOf(insurance['name']);
        if (labelIndex === -1) {
          labels.push(insurance['name']);
          values[labels.length - 1] = insurance.billed;
        } else {
          values[labelIndex] += insurance.billed;
        }
      }
    }
    this.pieChartLabel = labels;
    this.pieChartData = values;
  }

  initBarChart() {
    const yearsLabels: string[] = [];
    const insuranceLabels: string[] = [];
    const values: any[] = [];

    for (const row of this.dataSource.data) {
      const year =  this.getYear(row.date);
      if (yearsLabels.indexOf(year) === -1) {
        yearsLabels.push(year);
      }
    }

    yearsLabels.sort();

    for (const row of this.dataSource.data) {
      const yearIndex = yearsLabels.indexOf(this.getYear(row.date));

      for (const insurance of row['insurances']) {
        if (insuranceLabels.indexOf(insurance['name']) === -1) {
          insuranceLabels.push(insurance['name']);
        }
        this.updateValue(values, yearIndex, insurance.billed, insurance.name);
      }
    }

    this.barChartLabels = yearsLabels;
    this.barChartData = values;
  }

  updateValue(array, yearIndex, value, insurance) {
    for (const item of array) {
      if (item.label === insurance) {
        item.data[yearIndex] = item.data[yearIndex] === undefined ? value : item.data[yearIndex] + value;
        return;
      }
    }
    const data: number[] = [];
    data[yearIndex] = value;
    const row = {data: data, label: insurance};
    array.push(row);
  }

  getYear(date: string): string {
    return date.substring(0, 4);
  }

}
