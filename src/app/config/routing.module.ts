import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {InsurerInsuredComponent} from '../pages/insurer/insured/insured.component';
import {OverviewComponent} from '../pages/overview/overview.component';
import {ChannelInsureComponent} from '../pages/channel/insure/insure.component';
import {ChannelInsuredComponent} from '../pages/channel/insured/insured.component';
import {PageNotFoundComponent} from '../pages/default/page-not-found.component';

const appRoutes: Routes = [

  {path: '', redirectTo: '/overview', pathMatch: 'full'},
  {path: 'overview', component: OverviewComponent, pathMatch: 'full'},
  {path: 'insurer/insured', component: InsurerInsuredComponent, pathMatch: 'full'},
  {path: 'channel/:id/insure', component: ChannelInsureComponent, pathMatch: 'full'},
  {path: 'channel/:id/insured', component: ChannelInsuredComponent, pathMatch: 'full'},
  {path: '404', component: PageNotFoundComponent, pathMatch: 'full'},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing: false})
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule {}
