import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings-service.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
//import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule, NgSwitch, NgFor } from '@angular/common';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  ReactiveFormsModule } from '@angular/forms';
import { LANGUAGES } from '../../fakeDB/database';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ MatFormFieldModule, NgSwitch, NgFor, CommonModule, ReactiveFormsModule, MatSelectModule ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
 // providers:[SettingsServiceService],
})
export class SettingsComponent implements OnInit{

  selectedNativeLanguage='';
  selectedLearningLanguage = '';
  languagesForLearning:string[]=[];

constructor(private settingsService:SettingsService){}
 
ngOnInit(): void {
    this.settingsService.selectedNativeLanguage$.subscribe(
      value=>{
        this.selectedNativeLanguage=value
        this.languagesForLearning=LANGUAGES.filter(lang=>lang.toLowerCase() !== this.selectedNativeLanguage)
        console.log("язык",this.languagesForLearning)
      }
    )
}

onChangeLanguage(event:Event){
  const selectElement = event.target as HTMLSelectElement;
 console.log('selectElement '+ JSON.stringify(selectElement))
  this.selectedLearningLanguage= selectElement.value;
 //\
  this.settingsService.setSelectedLearningLanguage(this.selectedLearningLanguage);
 console.log('Выбранный язык для изучения: '+this.selectedLearningLanguage)
}
}
 // private settingsServiceService:SettingsServiceService){}