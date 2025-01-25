import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { FlashcardsComponent } from './components/flashcards/flashcards.component';
import { DictionaryComponent } from './components/dictionary/dictionary.component';
import { TestComponent } from './components/test/test.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'main', component: MainComponent },
  { path: 'flashcards', component: FlashcardsComponent },
  { path: 'dictionary', component: DictionaryComponent },
  { path: 'test', component: TestComponent },
];
