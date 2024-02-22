import { CommonModule, NgIf, NgSwitch } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RussianWords, WORDS } from '../../fakeDB/database';
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
export class FormComponent implements OnInit{
  @Input() selectedLearningLanguage: string = ''; 
  @Input() wordNumber: number =0;
  @Input() firstWord: string = '';

  words:string[]=WORDS;
  russianWords:string[]=RussianWords;
  currentWord:string = '';
  userAnswer:string='';
  showResult: boolean = false;
  resultMessage: string='';
  timeSpent:number=0;
  exerciseFinished: boolean = false;

  private availableWords:string[]=[];
  constructor(
    private translatorService:TranslatorService,
   
    ){}
  ngOnInit(): void {
    this.startTimer();
    this.currentWord=this.firstWord;
    
    const copyOfWords = [...this.words];
    this.availableWords=[]
      
      while(this.availableWords.length<this.wordNumber-1 && copyOfWords.length>0){
        const randomIndex = Math.floor(Math.random()*copyOfWords.length)
      
      const randomWord = copyOfWords[randomIndex]
        this.availableWords.push(randomWord);
        copyOfWords.splice(randomIndex,1)
    }
  }
  nextWord():boolean{
    if(this.availableWords.length===0){
      this.resultMessage =`Вы выполнили упражнение за ${this.timeSpent} секунд!`
      this.exerciseFinished = true;
      return  this.exerciseFinished
    }    
    const randomIndex = Math.floor(Math.random() * this.availableWords.length);
    this.currentWord = this.availableWords[randomIndex];
    this.userAnswer = '';
    this.showResult = false;
    this.availableWords.splice(randomIndex,1)
    this.exerciseFinished = false;
    return  this.exerciseFinished
  }

  nextEnglishWord():boolean{
    if(this.availableWords.length===0){
      this.resultMessage =`You completed the exercise in ${this.timeSpent} seconds!`
      this.exerciseFinished = true;
      return  this.exerciseFinished
    }    
    const randomIndex = Math.floor(Math.random() * this.availableWords.length);
    this.currentWord = this.availableWords[randomIndex];
    this.userAnswer = '';
    this.showResult = false;
    this.availableWords.splice(randomIndex,1)
    this.exerciseFinished = false;
    return  this.exerciseFinished
  }
  checkAnswer(userAnswer:string){
    this.userAnswer=userAnswer;
   this.translatorService.translateWord(this.currentWord,'ru').
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

checkEnglishAnswer(userAnswer:string){
  this.userAnswer=userAnswer;
 this.translatorService.translateRussianWord(this.currentWord).
 subscribe(translatedText=>{
  if (this.translatorService.compareTranslation(
    translatedText, this.userAnswer
  )){
this.showResult = true;
this.resultMessage = 'Right!';
  }else{
    this.showResult=true;
    this.resultMessage = 'Wrong. Try again.'; 
  }
 },

)  }

startTimer() {
  
  const timer = setInterval(() => {
    if (!this.exerciseFinished) {
      this.timeSpent++;
    } else {
      clearInterval(timer); // Остановить таймер
    }
  }, 1000);
}

}
