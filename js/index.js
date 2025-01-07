const apiKey = '6c70285b-82de-4439-83ac-8a80b0865f56:fx';

// Pokazuje wybraną sekcję, ukrywając pozostałe
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.add('hidden'));
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }
}

// Funkcja do wyświetlenia sekcji logowania
function showLoginSection() {
    document.getElementById("welcome-section").classList.add("hidden"); // Ukryj sekcję powitalną
    document.getElementById("register-section").classList.add("hidden"); // Ukryj sekcję rejestracji
    document.getElementById("login-section").classList.remove("hidden"); // Pokaż sekcję logowania
}

// Funkcja do wyświetlenia sekcji rejestracji
function showRegisterSection() {
    document.getElementById("welcome-section").classList.add("hidden"); // Ukryj sekcję powitalną
    document.getElementById("login-section").classList.add("hidden"); // Ukryj sekcję logowania
    document.getElementById("register-section").classList.remove("hidden"); // Pokaż sekcję rejestracji
}

// Funkcja do powrotu do sekcji powitalnej
function showWelcomeSection() {
    document.getElementById("login-section").classList.add("hidden"); // Ukryj sekcję logowania
    document.getElementById("register-section").classList.add("hidden"); // Ukryj sekcję rejestracji
    document.getElementById("welcome-section").classList.remove("hidden"); // Pokaż sekcję powitalną
}

// Pokazuje główną sekcję po zalogowaniu
function showMainSection() {
    showSection('main-section');
}

// Pokazuje sekcję nauki
function showFlashcardSection() {
    showSection('flashcard-section');
}

// Pokazuje sekcję ze słownikiem
function showDictionarySection() {
    showSection('dictionary-section');
}

// Funkcja do logowania
function loginUser() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (username && password) {
        alert(`Witaj, ${username}!`);
        showMainSection();
    } else {
        alert('Proszę wprowadzić poprawne dane logowania.');
    }
}

// Funkcja do rejestracji
function registerUser() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (username && password) {
        alert(`Zarejestrowano pomyślnie! Teraz możesz się zalogować, ${username}.`);
        showLoginSection();
    } else {
        alert('Proszę wypełnić wszystkie pola.');
    }
}

// Funkcja do rozpoczęcia nauki
function startLearning() {
    const language = document.getElementById('language').value;
    const level = document.getElementById('level').value;

    if (language && level) {
        alert(`Rozpoczęcie nauki języka: ${language}, poziom: ${level}`);
        const exerciseSection = document.getElementById('exercise-section');
        exerciseSection.classList.remove('hidden');
        loadExercise();
    } else {
        alert('Proszę wybrać język i poziom.');
    }
}

// Ładowanie ćwiczenia (prosty przykład)
function loadExercise() {
    const exerciseText = document.getElementById('exercise-text');
    exerciseText.textContent = 'Przetłumacz słowo "hello" na wybrany język.';
}

// Sprawdzanie odpowiedzi użytkownika
function checkAnswer() {
    const userAnswer = document.getElementById('user-answer').value.toLowerCase();
    if (userAnswer === 'cześć') { 
        alert('Dobra odpowiedź!');
    } else {
        alert('Spróbuj ponownie!');
    }
}

let words = [];  // Przechowujemy dodane słowa
let translations = [];  // Przechowujemy tłumaczenia
let currentFlashcardIndex = 0;  // Indeks aktualnej karty flashcard

// Funkcja do dodawania słowa do listy i tłumaczenia
async function addWord() {
    const wordInput = document.getElementById('wordInput');
    const word = wordInput.value.trim();
    const languageSelect = document.getElementById('languageSelect');
    const selectedLanguage = languageSelect.value;

    if (word === "") {
        alert("Proszę wpisać słowo.");
        return;
    }

    // Wybieramy odpowiedni język tłumaczenia
    const targetLanguage = (selectedLanguage === 'en') ? 'pl' : 'en';  // Jeśli wybrano "en" to tłumaczymy na polski, jeśli "pl" to na angielski.

    try {
        console.log(`Tłumaczymy słowo: ${word} z języka ${selectedLanguage} na język ${targetLanguage}`);

        // Jeśli tłumaczymy z angielskiego na polski
        let wordToTranslate, translation;
        if (selectedLanguage === 'en') {
            wordToTranslate = word;  // Angielskie słowo
            translation = await translateWord(wordToTranslate, 'en', 'pl');  // Tłumaczymy na polski
        } else {
            translation = word;  // Tłumaczenie jest już polskie
            wordToTranslate = await translateWord(word, 'pl', 'en');  // Tłumaczymy na angielski
        }

        // Logowanie, aby sprawdzić, co zwraca API
        console.log(`Słowo do dodania: ${wordToTranslate}, Tłumaczenie: ${translation}`);

        // Dodajemy słowo i tłumaczenie do listy
        words.push(wordToTranslate);
        translations.push(translation);

        const wordList = document.getElementById('wordList');

        // Sprawdzamy, czy wordList istnieje
        if (wordList) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span class="word">${wordToTranslate}</span> - <span class="translation">${translation}</span>
                <button class="delete-btn">Usuń</button>
            `;

            // Dodajemy funkcję usuwania po kliknięciu
            listItem.querySelector('.delete-btn').addEventListener('click', () => {
                deleteWord(listItem, wordToTranslate, translation);
            });

            wordList.appendChild(listItem);
        } else {
            console.error("Nie znaleziono elementu wordList.");
        }

        // Wyczyść pole wejściowe
        wordInput.value = '';
    } catch (error) {
        console.error("Błąd podczas tłumaczenia:", error);
        alert("Wystąpił błąd podczas tłumaczenia słowa.");
    }
}

// Funkcja do usuwania słowa z listy
function deleteWord(listItem, word, translation) {
    const wordList = document.getElementById('wordList');

    // Usuwamy element z listy
    wordList.removeChild(listItem);

    // Usuwamy dane z tablicy `words` i `translations`
    const wordIndex = words.indexOf(word);
    if (wordIndex > -1) {
        words.splice(wordIndex, 1);
        translations.splice(wordIndex, 1);
    }
}

// Funkcja do tłumaczenia słowa
async function translateWord(word, selectedLanguage, targetLanguage) {
    // Jeśli język źródłowy to polski, dodajemy odpowiednią informację
    let sourceLang = selectedLanguage === 'pl' ? 'pl' : 'en';  // Jeśli 'pl' to polski, jeśli nie, to angielski

    // W przypadku tłumaczenia z polskiego na angielski, Deepl może wymagać jawnego podania języka źródłowego
    const url = `https://api-free.deepl.com/v2/translate?auth_key=${apiKey}&text=${word}&source_lang=${sourceLang}&target_lang=${targetLanguage}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
        throw new Error(data.error.message);
    }

    return data.translations[0].text;
}

// Funkcja do przełączania na zakładkę z listą słów
function showList() {
    document.getElementById('wordListSection').style.display = 'block';
    document.getElementById('flashcardsSection').style.display = 'none';
}

// Funkcja do przełączania na zakładkę flashcards
function showFlashcards() {
    document.getElementById('wordListSection').style.display = 'none';
    document.getElementById('flashcardsSection').style.display = 'block';
    //showNextFlashcard();
}

// Funkcja do wyświetlania następnej flashcard
function showNextFlashcard() {
    if (words.length === 0) {
        alert("Brak słów do nauki.");
        return;
    }

    const flashcard = document.getElementById('flashcard');
    const flashcardFront = document.querySelector('.flashcard-front');
    const flashcardBack = document.querySelector('.flashcard-back');

    // Sprawdzenie, jaki język ma być na przedniej stronie
    const selectedLanguage = document.querySelector('input[name="flashcardSide"]:checked').value;

    if (selectedLanguage === 'en') {
        // Angielski na przodzie, polski na tyle
        flashcardFront.textContent = words[currentFlashcardIndex];
        flashcardBack.textContent = translations[currentFlashcardIndex];
    } else {
        // Polski na przodzie, angielski na tyle
        flashcardFront.textContent = translations[currentFlashcardIndex];
        flashcardBack.textContent = words[currentFlashcardIndex];
    }

    // Ustawienie indeksu na kolejną kartę (cyklicznie)
    currentFlashcardIndex = (currentFlashcardIndex + 1) % words.length;
}

// Funkcja do wylogowania
function logout() {
    alert('Wylogowano.');
    document.getElementById("main-section").classList.add("hidden");
    document.getElementById("dictionary-section").classList.add("hidden");
    document.getElementById("flashcard-section").classList.add("hidden"); // Ukryj sekcję główną
    document.getElementById("welcome-section").classList.remove("hidden"); // Pokaż sekcję powitalną
}
