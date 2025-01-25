import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss']
})
export class FlashcardsComponent {
  wordInput = '';
  language = 'en';
  flashcards: { front: string; back: string }[] = [];
  currentIndex = 0;

  constructor(private apiService: ApiService) {}

  addWord() {
    this.apiService.translateWord(this.wordInput, this.language, this.language === 'en' ? 'pl' : 'en').subscribe(
      (response: any) => {
        const translation = response.translations[0].text;
        this.flashcards.push({ front: this.wordInput, back: translation });
        this.wordInput = '';
      },
      (error) => {
        console.error('Ошибка перевода:', error);
      }
    );
  }

  showNextFlashcard() {
    if (this.flashcards.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.flashcards.length;
    }
  }

  get currentFlashcard() {
    return this.flashcards[this.currentIndex];
  }
}
