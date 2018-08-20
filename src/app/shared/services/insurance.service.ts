import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Coverage } from '../../model/coverage.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CoverageService {
    constructor(private http: HttpClient, private translate: TranslateService) { }

    getCoverages(): Observable<Coverage[]> {
        return this.http.get<Coverage[]>(environment.apiUrlChannel1 + '/v1/coverages', {
          params: {
            lang: this.translate.currentLang
          }
        });
    }
}
