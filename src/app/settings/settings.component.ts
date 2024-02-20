import { Component } from '@angular/core';
import { SettingsService } from '../services/settings-service.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
 // providers:[SettingsServiceService],
})
export class SettingsComponent {

  selectedLanguage='';
constructor(private settingsService:SettingsService){}
 


onChangeNativeLanguage(event:Event){
  const selectElement = event.target as HTMLSelectElement;
 console.log('selectElement '+ JSON.stringify(selectElement))
  this.selectedLanguage= selectElement.value;
 //\
  this.settingsService.setSelectedNativeLanguage(this.selectedLanguage);
 console.log('Выбранный язык : '+this.selectedLanguage)
}
}
 // private settingsServiceService:SettingsServiceService){}