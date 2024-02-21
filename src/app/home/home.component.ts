import { Component } from '@angular/core';
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
export class HomeComponent {
  languages = LANGUAGES;
  selectedLanguage = '';
  constructor(private settingService: SettingsService) {}
  onCnangeNativeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedLanguage = selectElement.value;
    this.settingService.setSelectedNativeLanguage(this.selectedLanguage);
    console.log('Выбранный язык : ' + this.selectedLanguage);
  }
}
