import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  questions: { text: string; correct: string; answer?: string }[] = [];

  generateTest() {
    // Пример: создаем тест с фиксированными вопросами
    this.questions = [
      { text: 'Как переводится "Hello"?', correct: 'Привет' },
      { text: 'Как переводится "World"?', correct: 'Мир' }
    ];
  }

  checkAnswers() {
    const correctCount = this.questions.filter((q) => q.answer?.toLowerCase() === q.correct.toLowerCase()).length;
    alert(`Вы ответили правильно на ${correctCount} из ${this.questions.length} вопросов.`);
  }
}
