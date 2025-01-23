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

function showTestSection() {
    showSection('test-section');
}

function showDashboardSection() {
    showSection('dashboard-section')
}

// Pokazuje sekcję ze słownikiem
function showDictionarySection() {
    showSection('dictionary-section');
}

// Funkcja do logowania
function loginUser() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
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
    const confirmPassword = document.getElementById('confirm-password').value;
    const learningGoals = document.getElementById('learning-goals').value;
    const termsAccepted = document.getElementById('terms-checkbox').checked;

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

    console.log('Rejestracja udana!');
    console.log('Użytkownik:', username);
    console.log('Cele nauki:', learningGoals);

    localStorage.setItem('username', username); //zapisujemy danne uzytkownika
    localStorage.setItem('password', password);

    showMainSection();
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

        localStorage.setItem('words', JSON.stringify(words));
        localStorage.setItem('translations', JSON.stringify(translations));

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

function loadWords() {
    const storedWords = JSON.parse(localStorage.getItem('words')) || [];
    const storedTranslations = JSON.parse(localStorage.getItem('translations')) || [];

    words = storedWords;
    translations = storedTranslations;

    const wordList = document.getElementById('wordList');
    wordList.innerHTML = ''; // Wyczyść istniejącą listę

    storedWords.forEach((word, index) => {
        const translation = storedTranslations[index];
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="word">${word}</span> - <span class="translation">${translation}</span>
            <button class="delete-btn">Usuń</button>
        `;

        listItem.querySelector('.delete-btn').addEventListener('click', () => {
            deleteWord(listItem, word, translation);
        });

        wordList.appendChild(listItem);
    });
}

function deleteWord(listItem, word, translation) {
    const wordList = document.getElementById('wordList');
    wordList.removeChild(listItem);

    const wordIndex = words.indexOf(word);
    if (wordIndex > -1) {
        words.splice(wordIndex, 1);
        translations.splice(wordIndex, 1);

        // Zaktualizuj localStorage
        localStorage.setItem('words', JSON.stringify(words));
        localStorage.setItem('translations', JSON.stringify(translations));
    }
}



// Funkcja do przełączania na zakładkę z listą słów
function showList() {
    document.getElementById('wordListSection').style.display = 'block';
    document.getElementById('flashcardsSection').style.display = 'none';
    document.getElementById('testSection').style.display = 'none';
    document.getElementById('userDashboard').style.display = 'none';
}

// Funkcja do przełączania na zakładkę flashcards
function showFlashcards() {
    document.getElementById('wordListSection').style.display = 'none';
    document.getElementById('flashcardsSection').style.display = 'block';
    document.getElementById('testSection').style.display = 'none';
    document.getElementById('userDashboard').style.display = 'none';
    
}

//wyświetlanie następnej flashcard
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

function logout() {
    alert('Wylogowano.');
    document.getElementById("main-section").classList.add("hidden");
    document.getElementById("test-section").classList.add("hidden");
    document.getElementById("dictionary-section").classList.add("hidden");
    document.getElementById("flashcard-section").classList.add("hidden");
    document.getElementById("dashboard-section").classList.add("hidden");
    document.getElementById("welcome-section").classList.remove("hidden");
    
}

// Funkcja do pobierania słów i tłumaczeń z zakładki "Twój słownik"
function getWordsFromDictionary() {
    const wordList = document.getElementById('wordList');
    const words = [];
    const translations = [];

    // Pobierz wszystkie elementy z listy
    const listItems = wordList.querySelectorAll('li');
    listItems.forEach(item => {
        const word = item.querySelector('.word')?.textContent.trim();
        const translation = item.querySelector('.translation')?.textContent.trim();
        if (word && translation) {
            words.push(word);
            translations.push(translation);
        }
    });

    return { words, translations };
}

function generateTest() {
    const testContainer = document.getElementById('testSection');
    testContainer.innerHTML = ''; // Wyczyść poprzedni test

    // Pobierz dane słów i tłumaczeń z zakładki "Twój słownik"
    const { words, translations } = getWordsFromDictionary();

    if (words.length === 0 || translations.length === 0) {
        testContainer.innerHTML = '<p>Brak słów w słowniku. Dodaj słowa, aby stworzyć test.</p>';
        return;
    }

    const questions = [];

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

        testContainer.appendChild(questionDiv);
    });

    //przycisk "Sprawdź odpowiedzi"
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Sprawdź odpowiedzi';
    submitButton.addEventListener('click', () => checkTestAnswers(questions));
    testContainer.appendChild(submitButton);
}

function checkTestAnswers(questions) {
    let correctCount = 0; // Liczba poprawnych odpowiedzi
    let totalQuestions = questions.length;

    questions.forEach((q, index) => {
        const userAnswer = document.querySelector(`[name="q${index}"]`);

        if (q.type === 'trueFalse') {
            const selectedValue = document.querySelector(`[name="q${index}"]:checked`);
            if (selectedValue && String(q.correctAnswer) === selectedValue.value) {
                correctCount++;
                selectedValue.parentElement.style.color = 'green';
            } else if (selectedValue) {
                selectedValue.parentElement.style.color = 'red';
            }
        }

        if (q.type === 'open') {
            if (userAnswer && userAnswer.value.trim().toLowerCase() === q.correctAnswer.toLowerCase()) {
                correctCount++;
                userAnswer.style.color = 'green';
            } else if (userAnswer) {
                userAnswer.style.color = 'red';
            }
        }
    });

    // Aktualizowanie statystyk użytkownika
    updateUserStats(totalQuestions, correctCount);

    // Wyświetlenie wyniku nawet jeśli test jest pusty
    alert(`Twój wynik: ${correctCount} z ${totalQuestions} poprawnych odpowiedzi.`);

    const testContainer = document.getElementById('testSection');
    const newTestButton = document.createElement('button');
    newTestButton.textContent = 'Wygeneruj nowy test';
    newTestButton.id = 'newTestButton';
    newTestButton.addEventListener('click', generateTest);

    const existingButton = document.getElementById('newTestButton');
    if (existingButton) {
        existingButton.remove();
    }

    testContainer.appendChild(newTestButton);
}

function updateUserStats(totalQuestions, correctAnswers) {
    const incorrectAnswers = totalQuestions - correctAnswers;

    // Pobierz aktualne statystyki z localStorage
    const completedTests = parseInt(localStorage.getItem('completedTests')) || 0;
    const totalCorrect = parseInt(localStorage.getItem('totalCorrect')) || 0;
    const totalIncorrect = parseInt(localStorage.getItem('totalIncorrect')) || 0;

    // Zaktualizuj statystyki
    localStorage.setItem('completedTests', completedTests + 1);
    localStorage.setItem('totalCorrect', totalCorrect + correctAnswers);
    localStorage.setItem('totalIncorrect', totalIncorrect + incorrectAnswers);

    // Zaktualizuj wyświetlanie na pulpicie użytkownika (jeśli istnieje)
    updateDashboard();
}

function updateDashboard() {
    const completedTests = parseInt(localStorage.getItem('completedTests')) || 0;
    const totalCorrect = parseInt(localStorage.getItem('totalCorrect')) || 0;
    const totalIncorrect = parseInt(localStorage.getItem('totalIncorrect')) || 0;

    const dashboard = document.getElementById('userDashboard');
    if (dashboard) {
        dashboard.innerHTML = `
            <h2>Pulpit użytkownika</h2>
            <p>Wykonane testy: ${completedTests}</p>
            <p>Poprawne odpowiedzi: ${totalCorrect}</p>
            <p>Błędne odpowiedzi: ${totalIncorrect}</p>
        `;
    }
}



function showTest() {
    document.getElementById('wordListSection').style.display = 'none';
    document.getElementById('flashcardsSection').style.display = 'none';
    document.getElementById('userDashboard').style.display = 'none';
    document.getElementById('testSection').style.display = 'block';

    
}

function showDashboard() {
    document.getElementById('wordListSection').style.display = 'none';
    document.getElementById('flashcardsSection').style.display = 'none';
    document.getElementById('userDashboard').style.display = 'block';
    document.getElementById('testSection').style.display = 'none';
}


window.addEventListener('DOMContentLoaded', () => {
    loadWords(); // Funkcja, która ładuje słowa z localStorage
    updateDashboard(); // Funkcja do załadowania pulpitu użytkownika
});

