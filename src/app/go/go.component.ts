import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings-service.service';
import { NgIf, NgSwitch, CommonModule } from '@angular/common';
import { FormComponent } from '../form/form.component';
//import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient  } from '@angular/common/http';
//import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslatorService } from '../services/translator.service';
import { RussianWords, WORDS } from '../../fakeDB/database';
@Component({
  selector: 'app-go',
  standalone: true,
  imports: [  HttpClientModule,FormComponent, NgIf, NgSwitch, CommonModule],
  templateUrl: './go.component.html',
  styleUrl: './go.component.css',
   providers:[HttpClient, TranslatorService],
   
})
export class GoComponent implements OnInit {
  selectedNativeLanguage: string = '';
  selectedLearningLanguage:string = '';
  wordNumber:number = 0;
  showForm: boolean = false;
  words:string[]=WORDS;
  russianWords:string[]=RussianWords;
  firstWord:string=''

  constructor(private SettingsService: SettingsService) {}
  placeFirstWord(){
    if (this.selectedLearningLanguage ==="english"){
    const randomIndex = Math.floor(Math.random()*this.words.length)
    this.firstWord = this.words[randomIndex];
    this.showForm=true
    }else{
      const randomIndex = Math.floor(Math.random()*this.words.length)
    this.firstWord = this.russianWords[randomIndex];
    this.showForm=true
    }
  }
  ngOnInit(): void {
    this.SettingsService.selectedNativeLanguage$.subscribe((value) => {
      this.selectedNativeLanguage = value;
    })
      this.SettingsService.selectedLearningLanguage$.subscribe((value) => {
        this.selectedLearningLanguage = value;
   
    });
    this.SettingsService.selectedWordsQuantity$.subscribe((number)=>{
      this.wordNumber=number
    })
  }
}
