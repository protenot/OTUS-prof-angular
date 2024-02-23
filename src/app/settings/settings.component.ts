import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings-service.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
//import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule, NgSwitch, NgFor } from '@angular/common';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { LANGUAGES, WORDS } from '../../fakeDB/database';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatFormFieldModule,
    NgSwitch,
    NgFor,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
 
})
export class SettingsComponent implements OnInit {
  selectedNativeLanguage = '';
  selectedLearningLanguage = '';
  languagesForLearning: string[] = [];
  wordsNumber: number = WORDS.length;
  selectedWordsQuantity = 0;

  constructor(
    private route: ActivatedRoute,
    private settingsService: SettingsService,
  ) {}

  ngOnInit(): void {
   // this.selectedNativeLanguage =localStorage.getItem('selectedLanguage') as string;
    const selectedLanguage= localStorage.getItem('selectedLanguage')?.toLowerCase();
   console.log('selectedLanguage ',selectedLanguage) 
   if(selectedLanguage){
    this.selectedNativeLanguage= selectedLanguage
    console.log('selectedNativeLanguage ', this.selectedNativeLanguage)
   }else{
    this.selectedNativeLanguage='russian'
   }
   this.settingsService.selectedNativeLanguage$.subscribe((value) => {
      this.selectedNativeLanguage = value;
      this.languagesForLearning = LANGUAGES.filter(
        (lang) => lang.toLowerCase() !== this.selectedNativeLanguage,
      );
      console.log('язык', this.languagesForLearning);
    });
  }

  onChangeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    console.log('selectElement ' + JSON.stringify(selectElement));
    this.selectedLearningLanguage = selectElement.value;
    //\
    this.settingsService.setSelectedLearningLanguage(
      this.selectedLearningLanguage,
    );
    console.log(
      'Выбранный язык для изучения: ' + this.selectedLearningLanguage,
    );
  }
  onChangeQuantity(event: Event) {
    const selectNumber = event.target as HTMLSelectElement;
    console.log(
      'Выбранное количество слов для изучения: ',
      this.selectedWordsQuantity,
    );
    this.selectedWordsQuantity = +selectNumber.value + 5;
    'Выбранное количество слов для изучения: ' + this.selectedWordsQuantity,
      this.settingsService.setSelectedWordsQuantity(this.selectedWordsQuantity);
    console.log(
      'Выбранное количество слов для изучения: ' + this.selectedWordsQuantity,
    );
  }
}

// private settingsServiceService:SettingsServiceService){}
