import {Pipe, PipeTransform} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Pipe({
  name: 'localizedCurrency',
  pure: false  // Required to update the value when currentLang is changed
})
export class LocalizedCurrencyPipe implements PipeTransform {

  private value: string | null;
  private lastValue: number | null;
  private lastLang: string;

  constructor(private translate: TranslateService) {}

  transform(currentValue: number): string {
    const currentLang = this.translate.currentLang;
    
    /*
     * Para efeitos de demonstração, valores são alterados junto à internacionalização
     */
    if (currentLang === 'en-US') {
      currentValue = currentValue / 4;
    }

    if (this.useCache(currentValue, currentLang)) {
      return this.value;
    }
    
    return this.updateCache(currentValue, currentLang, new CurrencyPipe(currentLang)
          .transform(currentValue, this.getCurrencyCode(currentLang)));
  }
  
  private getCurrencyCode(lang: string) {
    return lang === 'pt-BR' ? 'BRL' : 'USD';
  }

  private useCache(currentValue: number | null, currentLang: string) {
    return currentValue === this.lastValue && currentLang === this.lastLang;
  }

  private updateCache(currentValue: any, currentLang: string, value: string): string {
    this.value = value;
    this.lastValue = currentValue;
    this.lastLang = currentLang;
    return value;
  }
}
