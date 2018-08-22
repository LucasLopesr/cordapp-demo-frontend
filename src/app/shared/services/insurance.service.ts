import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {InsuranceRequest, Insurance} from '../../model/insurance.model';
import {ChannelApiService} from './api/channel-api.service';
import {InsurerApiService} from './api/insurer-api.service';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class InsuranceService {
  constructor(private http: HttpClient,
    private translate: TranslateService,
    private insurerApi: InsurerApiService,
    private channelApi: ChannelApiService) {}

  createInsurance(channel: number, insurance: InsuranceRequest): Observable<any> {
    return this.http.post(this.channelApi.getInsurancesResource(channel), insurance, {
      params: {
        lang: this.translate.currentLang
      }
    });
  }

  getInsurances(channel: number): Observable<Insurance[]> {
    return this.http.get<Insurance[]>(this.channelApi.getInsurancesResource(channel), {
      params: {
        lang: this.translate.currentLang
      }
    });
  }

  getInsurancesFromInsurer(): Observable<Insurance[]> {
    return this.http.get<Insurance[]>(this.insurerApi.getInsurancesResource(), {
      params: {
        lang: this.translate.currentLang
      }
    });
  }
}
