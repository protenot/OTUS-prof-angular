import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings-service.service';

@Component({
  selector: 'app-go',
  standalone: true,
  imports: [],
  templateUrl: './go.component.html',
  styleUrl: './go.component.css',
 // providers:[SettingsServiceService]
})

/* export class GoComponent{
@Input()
selectedLanguage!:'string';
} */
export class GoComponent implements OnInit {
  selectedNativeLanguage:string = '';
  constructor(private SettingsService:SettingsService){ }
  ngOnInit(): void {
    this.SettingsService.selectedNativeLanguage$.subscribe(value => {
      this.selectedNativeLanguage = value;
    });
  }
}
