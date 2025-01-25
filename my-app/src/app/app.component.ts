import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  apiKey: string = '6c70285b-82de-4439-83ac-8a80b0865f56:fx';
  words: string[] = [];
  translations: string[] = [];
  currentFlashcardIndex: number = 0;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.loadWords();
    this.updateDashboard();
  }

  loadWords(): void {
    const storedWords = this.localStorageService.getItem('words');
    const storedTranslations = this.localStorageService.getItem('translations');
    
    if (storedWords && storedTranslations) {
      this.words = JSON.parse(storedWords);
      this.translations = JSON.parse(storedTranslations);
    }
  }

  saveWords(): void {
    if (typeof window !== 'undefined') {
      this.localStorageService.setItem('words', JSON.stringify(this.words));
      this.localStorageService.setItem('translations', JSON.stringify(this.translations));
    }
  }

  showSection(sectionId: string): void {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.add('hidden'));
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.remove('hidden');
    }
  }

  showMainSection(): void {
      this.showSection('main-section');
  }

  showFlashcardSection(): void {
      this.showSection('flashcard-section');
  }

  showTestSection(): void {
      this.showSection('test-section');
  }

  showDictionarySection(): void {
      this.showSection('dictionary-section');
  }

  showLoginSection(): void {
    this.toggleSectionVisibility("login-section", ["welcome-section", "register-section"]);
  }

  showRegisterSection(): void {
    this.toggleSectionVisibility("register-section", ["welcome-section", "login-section"]);
  }

  showWelcomeSection(): void {
    this.toggleSectionVisibility("welcome-section", ["login-section", "register-section"]);
  }

  toggleSectionVisibility(visibleSection: string, hiddenSections: string[]): void {
    document.getElementById(visibleSection)?.classList.remove("hidden");
    hiddenSections.forEach(section => {
      document.getElementById(section)?.classList.add("hidden");
    });
  }

  showTest(): void {
    this.setVisibility('none', ['wordListSection', 'flashcardsSection', 'userDashboard']);
    this.setVisibility('block', ['testSection']);
  }

  showDashboard(): void {
    this.setVisibility('none', ['wordListSection', 'flashcardsSection', 'testSection']);
    this.setVisibility('block', ['userDashboard']);
  }

  setVisibility(displayStyle: string, elements: string[]): void {
    elements.forEach(elementId => {
      document.getElementById(elementId)?.style.setProperty('display', displayStyle);
    });
  }

  logout(): void {
    alert('Wylogowano.');
    this.toggleSectionVisibility("welcome-section", [
      "main-section", "test-section", "dictionary-section", 
      "flashcard-section", "userDashboard", "wordListSection", "flashcardsSection"
    ]);
}


  loginUser(): void {
    const username = (document.getElementById('login-username') as HTMLInputElement).value;
    const password = (document.getElementById('login-password') as HTMLInputElement).value;

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
      alert(`Witaj, ${username}!`);
      this.showMainSection();
    } else {
      alert('Proszę wprowadzić poprawne dane logowania.');
    }
  }

  registerUser(): void {
    const username = (document.getElementById('register-username') as HTMLInputElement).value;
    const password = (document.getElementById('register-password') as HTMLInputElement).value;
    const confirmPassword = (document.getElementById('confirm-password') as HTMLInputElement).value;
    const learningGoals = (document.getElementById('learning-goals') as HTMLInputElement).value;
    const termsAccepted = (document.getElementById('terms-checkbox') as HTMLInputElement).checked;

    if (!username || !password || !confirmPassword || !learningGoals) {
      alert('Proszę wypełnić wszystkie pola.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Hasła nie są zgodne! Spróbuj ponownie.');
      return;
    }

    if (!termsAccepted) {
      alert('Musisz zaakceptować warunki, aby się zarejestrować.');
      return;
    }

    alert(`Gratulacje, ${username}! Twoje konto zostało utworzone. Teraz możesz rozpocząć naukę!`);
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    this.showMainSection();
  }

  addWord(): void {
    const wordInput = document.getElementById('wordInput') as HTMLInputElement;
    const word = wordInput.value.trim();
    const languageSelect = document.getElementById('languageSelect') as HTMLSelectElement;
    const selectedLanguage = languageSelect.value;
  
    if (word === "") {
      alert("Proszę wpisać słowo.");
      return;
    }
  
    const targetLanguage = (selectedLanguage === 'en') ? 'pl' : 'en';
    this.translateWord(word, selectedLanguage, targetLanguage).then(translation => {
      this.words.push(word);
      this.translations.push(translation);
  
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('words', JSON.stringify(this.words));
        localStorage.setItem('translations', JSON.stringify(this.translations));
      }
  
      wordInput.value = '';
      this.updateWordList();
    }).catch(error => {
      console.error("Błąd при tłumaczeniu:", error);
      alert("Wystąpił błąd podczas tłumaczenia słowa.");
    });
  }  

  async translateWord(word: string, selectedLanguage: string, targetLanguage: string): Promise<string> {
    const url = `https://api-free.deepl.com/v2/translate?auth_key=${this.apiKey}&text=${word}&source_lang=${selectedLanguage}&target_lang=${targetLanguage}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    return data.translations[0].text;
  }


  updateWordList(): void {
    const wordList = document.getElementById('wordList')!;
    wordList.innerHTML = '';

    this.words.forEach((word, index) => {
      const translation = this.translations[index];
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <span class="word">${word}</span> - <span class="translation">${translation}</span>
        <button class="delete-btn">Usuń</button>
      `;
      listItem.querySelector('.delete-btn')?.addEventListener('click', () => {
        this.deleteWord(listItem, word, translation);
      });
      wordList.appendChild(listItem);
    });
  }

  deleteWord(listItem: HTMLElement, word: string, translation: string): void {
    const wordList = document.getElementById('wordList');
    if (wordList) {
      wordList.removeChild(listItem);
      const wordIndex = this.words.indexOf(word);
      if (wordIndex > -1) {
        this.words.splice(wordIndex, 1);
        this.translations.splice(wordIndex, 1);
        localStorage.setItem('words', JSON.stringify(this.words));
        localStorage.setItem('translations', JSON.stringify(this.translations));
      }
    }
  }

  showList(): void {
    this.setVisibility('block', ['wordListSection']);
    this.setVisibility('none', ['flashcardsSection', 'testSection', 'userDashboard']);
  }

  showFlashcards(): void {
    this.setVisibility('none', ['wordListSection']);
    this.setVisibility('block', ['flashcardsSection']);
    this.setVisibility('none', ['testSection', 'userDashboard']);
  }

  showNextFlashcard(): void {
    if (this.words.length === 0) {
      alert("Brak słów do nauki.");
      return;
    }

    const flashcardFront = document.querySelector('.flashcard-front') as HTMLElement;
    const flashcardBack = document.querySelector('.flashcard-back') as HTMLElement;
    const selectedLanguage = (document.querySelector('input[name="flashcardSide"]:checked') as HTMLInputElement).value;

    if (selectedLanguage === 'en') {
      flashcardFront.textContent = this.words[this.currentFlashcardIndex];
      flashcardBack.textContent = this.translations[this.currentFlashcardIndex];
    } else {
      flashcardFront.textContent = this.translations[this.currentFlashcardIndex];
      flashcardBack.textContent = this.words[this.currentFlashcardIndex];
    }

    this.currentFlashcardIndex = (this.currentFlashcardIndex + 1) % this.words.length;
  }

  getWordsFromDictionary(): { words: string[], translations: string[] } {
    const wordList = document.getElementById('wordList');
    const words: string[] = [];
    const translations: string[] = [];

    const listItems = wordList?.querySelectorAll('li');
    listItems?.forEach(item => {
      const word = item.querySelector('.word')?.textContent?.trim();
      const translation = item.querySelector('.translation')?.textContent?.trim();
      if (word && translation) {
        words.push(word);
        translations.push(translation);
      }
    });

    return { words, translations };
  }

  generateTest(): void {
    const testContainer = document.getElementById('testSection');
    testContainer!.innerHTML = ''; 

    const { words, translations } = this.getWordsFromDictionary();

    if (words.length === 0 || translations.length === 0) {
      testContainer!.innerHTML = '<p>Brak słów w słowniku. Dodaj słowa, aby stworzyć test.</p>';
      return;
    }

    const questions: any[] = [];

    // Tworzenie pytań typu "Prawda/Fałsz"
    words.forEach((word, index) => {
      const correctTranslation = translations[index];
      const randomTranslation = translations[Math.floor(Math.random() * translations.length)];

      // Losowo wybierz, czy odpowiedź będzie prawidłowa
      const isCorrect = Math.random() > 0.5;
      const displayedTranslation = isCorrect ? correctTranslation : randomTranslation;

      questions.push({
        type: 'trueFalse',
        question: `Czy "${word}" oznacza "${displayedTranslation}"?`,
        correctAnswer: isCorrect
      });
    });

    // Tworzenie pytań otwartych
    words.forEach((word, index) => {
      const correctTranslation = translations[index];

      questions.push({
        type: 'open',
        question: `Jakie jest tłumaczenie słowa "${word}"?`,
        correctAnswer: correctTranslation
      });
    });

    // Wyświetlanie pytań w HTML
    questions.forEach((q, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.className = 'question';

      if (q.type === 'trueFalse') {
        questionDiv.innerHTML = `
          <p>${index + 1}. ${q.question}</p>
          <label><input type="radio" name="q${index}" value="true"> Prawda</label>
          <label><input type="radio" name="q${index}" value="false"> Fałsz</label>
        `;
      } else if (q.type === 'open') {
        questionDiv.innerHTML = `
          <p>${index + 1}. ${q.question}</p>
          <input type="text" name="q${index}" />
        `;
      }

      testContainer!.appendChild(questionDiv);
    });

    //przycisk "Sprawdź odpowiedzi"
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Sprawdź odpowiedzi';
    submitButton.addEventListener('click', () => this.checkTestAnswers(questions));
    testContainer!.appendChild(submitButton);
  }

  checkTestAnswers(questions: any[]): void {
    let correctCount = 0; // Liczba poprawnych odpowiedzi
    const totalQuestions = questions.length;
  
    questions.forEach((q, index) => {
      const userAnswer = document.querySelector(`[name="q${index}"]`);
  
      if (q.type === 'trueFalse') {
        const selectedValue = document.querySelector(`[name="q${index}"]:checked`);
        if (selectedValue) {
          const selectedInput = selectedValue as HTMLInputElement;
          if (String(q.correctAnswer) === selectedInput.value) {
            correctCount++;
            (selectedInput.parentElement as HTMLElement).style.color = 'green';
          } else {
            (selectedInput.parentElement as HTMLElement).style.color = 'red';
          }
        }
      }
  
      if (q.type === 'open') {
        if (userAnswer) {
          const userInput = userAnswer as HTMLInputElement;
          if (userInput.value.trim().toLowerCase() === q.correctAnswer.toLowerCase()) {
            correctCount++;
            (userInput as HTMLElement).style.color = 'green';
          } else {
            (userInput as HTMLElement).style.color = 'red';
          }
        }
      }
    });
  
    // Aktualizowanie statystyk użytkownika
    this.updateUserStats(totalQuestions, correctCount);
  
    // Wyświetlenie wyniku nawet jeśli test jest pusty
    alert(`Twój wynik: ${correctCount} z ${totalQuestions} poprawnych odpowiedzi.`);
  
    const testContainer = document.getElementById('testSection');
    const newTestButton = document.createElement('button');
    newTestButton.textContent = 'Wygeneruj nowy test';
    newTestButton.id = 'newTestButton';
    newTestButton.addEventListener('click', () => this.generateTest());
  
    const existingButton = document.getElementById('newTestButton');
    if (existingButton) {
      existingButton.remove();
    }
  
    testContainer!.appendChild(newTestButton);
  }  

  updateUserStats(totalQuestions: number, correctAnswers: number) {
    const incorrectAnswers = totalQuestions - correctAnswers;

    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {

        const completedTests = parseInt(localStorage.getItem('completedTests') || '0');
        const totalCorrect = parseInt(localStorage.getItem('totalCorrect') || '0');
        const totalIncorrect = parseInt(localStorage.getItem('totalIncorrect') || '0');

    
        localStorage.setItem('completedTests', (completedTests + 1).toString());
        localStorage.setItem('totalCorrect', (totalCorrect + correctAnswers).toString());
        localStorage.setItem('totalIncorrect', (totalIncorrect + incorrectAnswers).toString());

        this.updateDashboard();
    }
  }

  completedTests: number = 0;
  totalCorrect: number = 0;
  totalIncorrect: number = 0;

  updateDashboard(): void {

    if (typeof window !== 'undefined' && window.localStorage) {
      const completedTests = parseInt(localStorage.getItem('completedTests') || '0');
      const totalCorrect = parseInt(localStorage.getItem('totalCorrect') || '0');
      const totalIncorrect = parseInt(localStorage.getItem('totalIncorrect') || '0');

      this.completedTests = completedTests;
      this.totalCorrect = totalCorrect;
      this.totalIncorrect = totalIncorrect;
    } else {
      console.log('localStorage is unavailable');
    }
  }

}

