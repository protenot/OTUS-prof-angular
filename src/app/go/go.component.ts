import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings-service.service';
import { NgIf, NgSwitch, CommonModule } from '@angular/common';
import { FormComponent } from '../form/form.component';
//import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient  } from '@angular/common/http';
//import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslatorService } from '../services/translator.service';
@Component({
  selector: 'app-go',
  standalone: true,
  imports: [  HttpClientModule,FormComponent, NgIf, NgSwitch, CommonModule],
  templateUrl: './go.component.html',
  styleUrl: './go.component.css',
   providers:[HttpClient, TranslatorService]
})
export class GoComponent implements OnInit {
  selectedNativeLanguage: string = '';
  selectedLearningLanguage:string = '';
  wordNumber:number = 0;
  showForm: boolean = false;

  constructor(private SettingsService: SettingsService) {}
 
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
