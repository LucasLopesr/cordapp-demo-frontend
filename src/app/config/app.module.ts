import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {TranslationModule} from './translation.module';
import {RoutingModule} from './routing.module';
import {MaterialModule} from './material.module';

import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {LocalizedCurrencyPipe} from '../shared/pipe/localized-currency.pipe';
import {LocalizedDatePipe} from '../shared/pipe/localized-date.pipe';

import {ChartsModule} from 'ng2-charts';

import {AppComponent} from '../app.component';
import {AppHeaderComponent} from '../layout/header/app.header.component';
import {AppMenuComponent} from '../layout/menu/app.menu.component';
import {AppFooterComponent} from '../layout/footer/app.footer.component';
import {AppHeaderService} from '../shared/services/app.header.service';
import {SnackbarService} from '../shared/services/snackbar.service';

import {ChannelApiService} from '../shared/services/api/channel-api.service';
import {InsurerApiService} from '../shared/services/api/insurer-api.service';
import {CoverageService} from '../shared/services/coverage.service';
import {InsuranceService} from '../shared/services/insurance.service';
import {ProductService} from '../shared/services/product.service';

import {OverviewComponent} from '../pages/overview/overview.component';
import {InsurerInsuredComponent} from '../pages/insurer/insured/insured.component';
import {ChannelInsureComponent} from '../pages/channel/insure/insure.component';
import {ChannelInsuredComponent} from '../pages/channel/insured/insured.component';

import {PageNotFoundComponent} from '../pages/default/page-not-found.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    LocalizedCurrencyPipe,
    LocalizedDatePipe,

    AppComponent,
    AppHeaderComponent,
    AppMenuComponent,
    AppFooterComponent,
    OverviewComponent,
    InsurerInsuredComponent,
    ChannelInsureComponent,
    ChannelInsuredComponent,
    PageNotFoundComponent
  ],
  imports: [
    RoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    TranslationModule,
    ReactiveFormsModule,
    ChartsModule,
  ],
  providers: [
    HttpClientModule,
    AppHeaderService,
    SnackbarService,
    ChannelApiService,
    InsurerApiService,
    CoverageService,
    InsuranceService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
