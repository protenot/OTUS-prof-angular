import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SettingsService } from '../services/settings-service.service';
import { CommonModule, NgFor } from '@angular/common';
import { LANGUAGES } from '../../fakeDB/database';
import {FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DictionaryService } from '../services/dictionary.service';
import { TranslatorService } from '../services/translator.service';
import { HttpClient, HttpClientModule} from '@angular/common/http';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatSelectModule,
     MatFormFieldModule,
      MatButtonModule,
      //BrowserAnimationsModule,
      CommonModule,
        FormsModule,
         HttpClientModule,
         ReactiveFormsModule,
        NgFor,
        
      ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [HttpClient, TranslatorService],
})
export class HomeComponent implements OnInit {
  
  disableSelect = new FormControl(false);
  selectedLanguage = '';
  selectedLearningLanguage = '';
  languages = LANGUAGES;
  wordToTranslate:string = '';
  translatedWord:string = '';
  information:string ='';
  lastWords:string[]=[];
  constructor(
    private settingService: SettingsService,
    private dictionaryService:DictionaryService,
    private translatorService:TranslatorService,
    private cdr: ChangeDetectorRef) {}
    
  ngOnInit(){
    const savedLanguage=localStorage.getItem('selectedLanguage')
    if (savedLanguage){
      this.selectedLanguage=savedLanguage;
      this.selectedLearningLanguage = this.settingService.getSelectedLearningLanguage();
      
    }
  }

  
  onCnangeNativeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedLanguage = selectElement.value;
    this.selectedLearningLanguage = this.settingService.getSelectedLearningLanguage()
    this.settingService.setSelectedNativeLanguage(this.selectedLanguage);
    localStorage.setItem('selectedLanguage', this.selectedLanguage)
    console.log('Выбранный язык : ' + this.selectedLanguage);
  }

  clearSelectedLanguage(){
    localStorage.removeItem('selectedLanguage');
    this.selectedLanguage = '';
    this.selectedLearningLanguage = '';
  }

  translateToEnglish(word:string){
    this.wordToTranslate = word;
    this.translatorService.translateRussianWord(this.wordToTranslate)
    .subscribe((translatedText)=>{
      this.translatedWord=translatedText.toLowerCase();
      console.log('слово',word, 'перевод',this.translatedWord);
     // this.dictionaryServise.addWord(this.translatedWord,'english');
     // this.cdr.detectChanges();
     // 
      
    }
      )
      }
      translateToRussian(word:string){
        this.wordToTranslate = word;
        this.translatorService.translateWord(this.wordToTranslate, 'russian')
        .subscribe((translatedText)=>{
          this.translatedWord=translatedText.toLowerCase();
          console.log('слово',word, 'перевод',this.translatedWord);
         // this.dictionaryServise.addWord(this.translatedWord,'english');
         // this.cdr.detectChanges();
         // 
          
        }
          )
          }

      addToDictionary(){
      const translatedWord:string=this.translatedWord.toLowerCase().trim();
      const wordsFromLS = this.dictionaryService.getWordsByLanguage(this.selectedLearningLanguage)
 
        if(!wordsFromLS.includes(translatedWord)){
      this.dictionaryService.addWord( this.translatedWord, this.selectedLearningLanguage)
       const wordsFromLS=this.dictionaryService.getWordsByLanguage(this.selectedLearningLanguage) 
       console.log(wordsFromLS)
       this.information='Слово успешно добавлено в словарь.'
       this.lastWords.push(this.translatedWord)
      }
       else{
        this.information = 'Это слово уже есть в словаре.'
       }
      
      }
}  
