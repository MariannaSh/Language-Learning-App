import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private router: Router) {}

  loginUser(): void {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (this.username === storedUsername && this.password === storedPassword) {
      alert(`Welcome, ${this.username}!`);
      this.router.navigate(['/main']);
    } else {
      alert('Invalid login credentials.');
    }
  }
}
