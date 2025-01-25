import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(username: string, password: string): boolean {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    return username === storedUsername && password === storedPassword;
  }

  register(username: string, password: string): void {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  }
}