import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../model/product.model';
import {ChannelApiService} from './api/channel-api.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient, private translate: TranslateService, private api: ChannelApiService) {}

  getProducts(channel: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.api.getProductsResource(channel), {
      params: {
        lang: this.translate.currentLang
      }
    });
  }
}
