import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { FlashcardsComponent } from './components/flashcards/flashcards.component';
import { DictionaryComponent } from './components/dictionary/dictionary.component';
import { TestComponent } from './components/test/test.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppComponent,            // Импорт standalone AppComponent
    WelcomeComponent,        // Standalone WelcomeComponent
    LoginComponent,          // Standalone LoginComponent
    RegisterComponent,       // Standalone RegisterComponent
    MainComponent,           // Standalone MainComponent
    FlashcardsComponent,     // Standalone FlashcardsComponent
    DictionaryComponent,     // Standalone DictionaryComponent
    TestComponent            // Standalone TestComponent
  ],
  bootstrap: [AppComponent]   // Указываем root компонент
})
export class AppModule { }
