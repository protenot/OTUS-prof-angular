import { CommonModule, NgIf, NgSwitch } from '@angular/common';
import { Component, Input } from '@angular/core';
import { WORDS } from '../../fakeDB/database';
import { TranslatorService } from '../services/translator.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
//import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule,  NgIf, NgSwitch],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  providers: [HttpClient]
})
export class FormComponent {
  @Input() selectedLearningLanguage: string = ''; 
  @Input() wordNumber: number =0;

  words:string[]=WORDS;
  currentWord:string = 'tree';
  userAnswer:string='';
  showResult: boolean = false;
  resultMessage: string='';

  constructor(private translatorService:TranslatorService){}
  nextWord(){
    const randomIndex = Math.floor(Math.random()*this.words.length)
    this.currentWord = this.words[randomIndex];
    this.userAnswer = '';
    this.showResult = false;
  }
  checkAnswer(userAnswer:string){
    this.userAnswer=userAnswer;
   this.translatorService.translateWord(this.userAnswer,'ru').
   subscribe(translatedText=>{
    if (this.translatorService.compareTranslation(
      translatedText, this.userAnswer
    )){
this.showResult = true;
this.resultMessage = 'Верно!';
    }else{
      this.showResult=true;
      this.resultMessage = 'Неверно. Попробуйте еще раз.'; 
    }
   },
   /* error=>{
   console.error('Произошла ошибка при переводе:', error);
   } */
)  }

}
