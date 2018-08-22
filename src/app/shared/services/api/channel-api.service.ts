import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Injectable()
export class ChannelApiService {

    getCoveragesResource(channel: number): string {
      return environment.apiUrlChannel[channel] + '/v1/coverages';
    }

    getInsurancesResource(channel: number): string {
      return environment.apiUrlChannel[channel] + '/v1/insurances';
    }

    getProductsResource(channel: number): string {
      return environment.apiUrlChannel[channel] + '/v1/products';
    }
}
