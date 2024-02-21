import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings-service.service';
import { NgIf, NgSwitch, CommonModule } from '@angular/common';
//import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-go',
  standalone: true,
  imports: [NgIf, NgSwitch, CommonModule],
  templateUrl: './go.component.html',
  styleUrl: './go.component.css',
 // providers:[SettingsServiceService]
})


export class GoComponent implements OnInit {
  selectedNativeLanguage:string = '';
  constructor(private SettingsService:SettingsService){ }
  ngOnInit(): void {
    this.SettingsService.selectedNativeLanguage$.subscribe(value => {
      this.selectedNativeLanguage = value;
    });
  }
}
