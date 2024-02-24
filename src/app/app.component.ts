import { Component, NgModule, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { SettingsService } from './services/settings-service.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NgSwitchCase, NgSwitch,NgIf, RouterOutlet, RouterLink, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [HttpClient],
})
export class AppComponent implements OnInit{
  title = 'OTUS-prof-angular';
  selectedNativeLanguage='russian';
 constructor(
  public settingsService:SettingsService
 ){}
  ngOnInit(): void {
    this.settingsService.setSelectedNativeLanguage(this.selectedNativeLanguage);
  }

}
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
   
    MatSlideToggleModule,

    CommonModule,
    HttpClientModule,
  ],
  exports: [RouterModule],
})
export class App {}
