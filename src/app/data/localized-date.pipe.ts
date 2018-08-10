import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Pipe({
  name: 'localizedDate',
  pure: false  // Required to update the value when currentLang is changed
})
export class LocalizedDatePipe implements PipeTransform {

  private value: string | null;
  private lastValue: string | null;
  private lastLang: string;

  constructor(private translate: TranslateService) {}

  transform(currentValue: any, pattern: string = 'mediumDate'): any {
    const currentLang = this.translate.currentLang;

    if (this.useCache(currentValue, currentLang)) {
      return this.value;
    }
    return this.updateCache(currentValue, currentLang, new DatePipe(currentLang).transform(currentValue, pattern));
  }

  private useCache(currentValue: any, currentLang: string) {
    return currentValue === this.lastValue && currentLang === this.lastLang;
  }

  private updateCache(currentValue: any, currentLang: string, value: string): string {
    this.value = value;
    this.lastValue = currentValue;
    this.lastLang = currentLang;
    return value;
  }
}
