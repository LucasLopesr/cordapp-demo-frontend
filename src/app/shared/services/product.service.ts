import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Product } from '../../model/product.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ProductService {
    constructor(private http: HttpClient, private translate: TranslateService) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(environment.apiUrlChannel1 + '/v1/products', {
          params: {
            lang: this.translate.currentLang
          }
        });
    }
}
