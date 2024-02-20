import { Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {


  private selectedNativeLanguageSubject = new BehaviorSubject<string>('');
 selectedNativeLanguage$ = this.selectedNativeLanguageSubject.asObservable();
setSelectedNativeLanguage(value:string):void{
  this.selectedNativeLanguageSubject.next(value)
  console.log('+++', value)
}

getSelectedNativeLanguage():string{
  console.log('---', this.selectedNativeLanguageSubject.value)
  return this.selectedNativeLanguageSubject.value;
}
  constructor() { }
}
