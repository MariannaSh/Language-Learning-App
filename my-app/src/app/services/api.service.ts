import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiKey = '6c70285b-82de-4439-83ac-8a80b0865f56:fx';
  private apiUrl = 'https://api-free.deepl.com/v2/translate';

  constructor(private http: HttpClient) {}

  translateWord(word: string, sourceLang: string, targetLang: string): Observable<any> {
    const params = {
      auth_key: this.apiKey,
      text: word,
      source_lang: sourceLang,
      target_lang: targetLang
    };
    return this.http.get(this.apiUrl, { params });
  }

  getData(): Observable<any> {
    // Пример для демонстрации
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
}
