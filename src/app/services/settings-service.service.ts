import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {

  private selectedNativeLanguageSubject = new BehaviorSubject<string>('');
  selectedNativeLanguage$ = this.selectedNativeLanguageSubject.asObservable();
  setSelectedNativeLanguage(value: string): void {
    this.selectedNativeLanguageSubject.next(value);
    console.log('+++', value);
  }

  getSelectedNativeLanguage(): string {
    console.log('---', this.selectedNativeLanguageSubject.value);
    return this.selectedNativeLanguageSubject.value;
  }

  private selectedLearningLanguageSubject = new BehaviorSubject<string>('');
  selectedLearningLanguage$ =
    this.selectedLearningLanguageSubject.asObservable();
  
    setSelectedLearningLanguage(value: string): void {
    this.selectedLearningLanguageSubject.next(value);
  }

    getSelectedLearningLanguage():string{
        return this.selectedLearningLanguageSubject.value
    }

  private selectedWordsQuantitySubject=new BehaviorSubject<number>(0);
  selectedWordsQuantity$=
  this.selectedWordsQuantitySubject.asObservable();

  setSelectedWordsQuantity(number:number):void{
    this.selectedWordsQuantitySubject.next(number);
    console.log("number",number )
  }

  getSelectedWordsQuantity():number{
    return this.selectedWordsQuantitySubject.value
  }
  constructor() {}
}
