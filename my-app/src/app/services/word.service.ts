import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  words: string[] = [];
  translations: string[] = [];

  addWord(word: string, translation: string): void {
    this.words.push(word);
    this.translations.push(translation);
  }

  getWords(): { word: string, translation: string }[] {
    return this.words.map((word, index) => ({
      word,
      translation: this.translations[index],
    }));
  }
}
