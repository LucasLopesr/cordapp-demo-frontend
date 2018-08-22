import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Coverage } from '../../model/coverage.model';
import { ChannelApiService } from './api/channel-api.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CoverageService {
    constructor(private http: HttpClient, private translate: TranslateService, private api: ChannelApiService) { }

    getCoverages(channel: number): Observable<Coverage[]> {
        return this.http.get<Coverage[]>(this.api.getCoveragesResource(channel), {
          params: {
            lang: this.translate.currentLang
          }
        });
    }
}
