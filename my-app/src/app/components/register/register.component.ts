import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username = '';
  password = '';
  confirmPassword = '';
  learningGoals = '';
  termsAccepted = false;

  constructor(private router: Router) {}

  register() {
    if (!this.username || !this.password || !this.confirmPassword || !this.learningGoals) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Пароли не совпадают.');
      return;
    }

    if (!this.termsAccepted) {
      alert('Вы должны принять условия.');
      return;
    }

    localStorage.setItem('username', this.username);
    localStorage.setItem('password', this.password);

    alert('Вы успешно зарегистрировались!');
    this.router.navigate(['/login']);
  }
}