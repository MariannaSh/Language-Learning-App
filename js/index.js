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
function showLearningSection() {
    showSection('learning-section');
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

// Dodawanie słowa do słownika
function addToDictionary() {
    const newWord = document.getElementById('new-word').value;
    if (newWord) {
        const list = document.getElementById('dictionary-list');
        const listItem = document.createElement('li');
        listItem.textContent = newWord;
        list.appendChild(listItem);
        document.getElementById('new-word').value = '';
    } else {
        alert('Proszę wprowadzić słowo.');
    }
}

// Funkcja do wylogowania
function logout() {
    alert('Wylogowano.');
    document.getElementById("main-section").classList.add("hidden"); // Ukryj sekcję główną
    document.getElementById("welcome-section").classList.remove("hidden"); // Pokaż sekcję powitalną
}
