import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SettingsService } from '../services/settings-service.service';
import { CommonModule } from '@angular/common';
import { LANGUAGES } from '../../fakeDB/database';
import { FormsModule } from '@angular/forms';
import { DictionaryService } from '../services/dictionary.service';
import { TranslatorService } from '../services/translator.service';
import { HttpClient, HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [HttpClient, TranslatorService],
})
export class HomeComponent implements OnInit {
  
  
  selectedLanguage = '';
  selectedLearningLanguage = '';
  languages = LANGUAGES;
  wordToTranslate = '';
  translatedWord = '';
  information ='';
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
      const translatedWord=this.translatedWord.toLowerCase().trim();
      const wordsFromLS = this.dictionaryService.getWordsByLanguage(this.selectedLearningLanguage)
 
        if(!wordsFromLS.includes(translatedWord)){
      this.dictionaryService.addWord( this.translatedWord, this.selectedLearningLanguage)
       const wordsFromLS=this.dictionaryService.getWordsByLanguage(this.selectedLearningLanguage) 
       console.log(wordsFromLS)
       this.information='Слово успешно добавлено в словарь.'}
       else{
        this.information = 'Это слово уже есть в словаре.'
       }
      }
}  
