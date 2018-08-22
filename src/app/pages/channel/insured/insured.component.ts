import {AppHeaderComponent} from '../../../layout/header/app.header.component';
import {Coverage} from '../../../model/coverage.model';
import {Insurance} from '../../../model/insurance.model';
import {AppHeaderService} from '../../../shared/services/app.header.service';
import {Product} from '../../../model/product.model';
import {InsuranceService} from '../../../shared/services/insurance.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {TranslateService, LangChangeEvent} from '@ngx-translate/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-channel-insured',
  templateUrl: './insured.component.html',
  styleUrls: ['./insured.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ChannelInsuredComponent implements OnInit {

  displayedColumns = ['product', 'insurance', 'date', 'billed', 'comission'];
  dataSource: MatTableDataSource<any>;

  pieChartLabel: string[] = [];
  pieChartData: number[] = [];
  barChartLabels: string[] = [];
  barChartData: any[] = [];

  private lastData: Insurance[];
  private billedAmount: number;
  private salesCommission: number;
  private id: number;

  constructor(private activatedRoute: ActivatedRoute,
    private header: AppHeaderService,
    private translate: TranslateService,
    private insuranceService: InsuranceService) {}

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
    this.insuranceService.getInsurances(this.id).subscribe(insurances => {
      this.updateData(insurances);
      this.updateCharts(insurances);
    });
  }

  private updateData(insurances: Insurance[]) {
    this.lastData = insurances;
    this.dataSource = new MatTableDataSource(this.createRows(insurances));
    this.dataSource.filterPredicate = (row: Object, value: string) => {

      return this.filterAttr(row['product'], value)
        || this.filterAttr(row['coverages'], value, 'name');
    };
    this.calculateTotal();
  }

  private filterAttr(attribute: any, value: string, attr?: string): boolean {
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

    for (const insurance of this.lastData) {
      billedResult += insurance.value;
      commissionResult += insurance.value / 23;
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

  createRows(insurances: Insurance[]) {
    const rows: object[] = [];

    insurances.forEach(insurance => {
      rows.push({
        product: insurance.product.description,
        coverages: this.createRowCoverages(insurance.coverages),
        date: new Date(insurance.timeInMilli),
        billed: insurance.value,
        comission: insurance.value / 23
      });
    });
    return rows;
  }

  createRowCoverages(coverages: Coverage[]) {
    const data: object[] = [];

    coverages.forEach(coverage => {
      data.push({
        name: coverage.name,
        billed: coverage.price,
        comission: coverage.price / 23
      });
    });
    return data;
  }

  private updateCharts(insurances: Insurance[]) {
    this.updatePieChart(insurances);
    this.updateBarChart(insurances);
  }

  private updatePieChart(insurances: Insurance[]) {
    if (insurances.length === 0) {
      return;
    }

    const labels: string[] = [];
    const values: number[] = [];

    for (const insurance of insurances) {
      for (const coverage of insurance.coverages) {
        const labelIndex = labels.indexOf(coverage.name);
        if (labelIndex === -1) {
          labels.push(coverage.name);
          values[labels.length - 1] = coverage.price;
        } else {
          values[labelIndex] += coverage.price;
        }
      }
    }
    this.pieChartLabel = labels;
    this.pieChartData = values;
  }

  private updateBarChart(insurances: Insurance[]) {
    if (insurances.length === 0) {
      return;
    }

    const yearsLabels: string[] = [];
    const insuranceLabels: string[] = [];
    const values: any[] = [];

    for (const insurance of insurances) {
      const year = this.getYear(insurance.timeInMilli);
      if (yearsLabels.indexOf(year) === -1) {
        yearsLabels.push(year);
      }
    }

    yearsLabels.sort();

    for (const insurance of insurances) {
      const yearIndex = yearsLabels.indexOf(this.getYear(insurance.timeInMilli));

      for (const coverage of insurance.coverages) {
        if (insuranceLabels.indexOf(insurance['name']) === -1) {
          insuranceLabels.push(insurance['name']);
        }
        this.updateValue(values, yearIndex, coverage.price, coverage.name);
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

  getYear(timeInMilli: number): string {
    return new Date(timeInMilli).getFullYear().toString();
  }

}
