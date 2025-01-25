import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  constructor(private router: Router) {}

  // Переход на страницу логина
  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Переход на страницу регистрации
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
