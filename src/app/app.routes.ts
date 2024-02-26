import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GoComponent } from './go/go.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'go', component: GoComponent },
  { path: 'settings/:selectedNativeLanguage', component: SettingsComponent },
  { path: 'settings', component: SettingsComponent },
];
