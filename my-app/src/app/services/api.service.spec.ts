import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { afterEach, beforeEach, describe, it } from 'node:test';
import { fail } from 'assert';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Убедимся, что никаких лишних запросов не осталось
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call translateWord and return translated text', () => {
    const mockResponse = {
      translations: [{ text: 'Witaj' }]
    };

    service.translateWord('Hello', 'en', 'pl').subscribe((response) => {
      expect(response.translations[0].text).toBe('Witaj');
    });

    // Проверка, что запрос отправляется с правильными параметрами
    const req = httpMock.expectOne((request) =>
      request.url === 'https://api-free.deepl.com/v2/translate' &&
      request.params.get('auth_key') === '6c70285b-82de-4439-83ac-8a80b0865f56:fx' &&
      request.params.get('text') === 'Hello' &&
      request.params.get('source_lang') === 'en' &&
      request.params.get('target_lang') === 'pl'
    );

    expect(req.request.method).toBe('GET');

    // Подделка ответа
    req.flush(mockResponse);
  });

  it('should handle errors when translateWord fails', () => {
    const mockError = { status: 500, statusText: 'Server Error' };

    service.translateWord('Hello', 'en', 'pl').subscribe(
      () => fail('should have failed with the 500 error'),
      (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Server Error');
      }
    );

    const req = httpMock.expectOne((request) =>
      request.url === 'https://api-free.deepl.com/v2/translate' &&
      request.params.get('text') === 'Hello'
    );

    req.flush(null, mockError);
  });
});
