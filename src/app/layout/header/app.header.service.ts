import {Injectable, Output, EventEmitter} from '@angular/core';
import {TranslateService, LangChangeEvent} from '@ngx-translate/core';

@Injectable()
export class AppHeaderService {

  @Output() changeTitle: EventEmitter<string> = new EventEmitter();

  private titleKeyName: string;
  private titleParams: Object;

  constructor(private translate: TranslateService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTitle(this.titleKeyName, this.titleParams);
    });
  }

  setTitle(keyName: string, params?: Object) {
    this.titleKeyName = keyName;
    this.titleParams = params;

    this.translate.get(keyName, params).subscribe(res => {
      this.changeTitle.emit(res);
    });
  }

}
