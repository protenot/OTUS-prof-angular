import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings-service.service';
import { CommonModule } from '@angular/common';
import { LANGUAGES } from '../../fakeDB/database';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  languages = LANGUAGES;
  selectedLanguage = '';
  selectedLearningLanguage = '';
  constructor(private settingService: SettingsService) {}
  
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

}  
