import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Injectable()
export class InsurerApiService {

    getInsurancesResource(): string {
      return environment.apiUrlInsurer + '/v1/insurances';
    }
}
