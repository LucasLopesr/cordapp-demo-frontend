import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TranslationModule } from './translation.module';
import { RoutingModule } from './routing.module';
import { MaterialModule } from './material.module';

import { AppComponent } from '../app.component';
import { AppHeaderComponent } from '../layout/header/app.header.component';
import { AppMenuComponent } from '../layout/menu/app.menu.component';
import { AppFooterComponent } from '../layout/footer/app.footer.component';
import { AppHeaderService } from '../layout/header/app.header.service';

import { OverviewComponent } from '../pages/overview/overview.component';
import {InsurerInsuredComponent} from '../pages/insurer/insured/insured.component';
import {ChannelInsureComponent} from '../pages/channel/insure/insure.component';
import {ChannelInsuredComponent} from '../pages/channel/insured/insured.component';

import {PageNotFoundComponent} from '../pages/default/page-not-found.component';

@NgModule({
  declarations: [
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
  ],
  providers: [
    HttpClientModule,
    AppHeaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
