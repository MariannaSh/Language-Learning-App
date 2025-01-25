import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeComponent } from './welcome.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';

// Мокаем Router
class RouterStub {
  navigate(commands: any[]) {
    return of(true);  // Возвращаем Observable, чтобы имитировать успешный переход
  }
}

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let router: RouterStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ],
      providers: [
        { provide: Router, useClass: RouterStub }  // Заменяем Router на RouterStub
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);  // Получаем экземпляр Router
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login on goToLogin', () => {
    spyOn(router, 'navigate');  // Шпион на метод navigate
    component.goToLogin();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);  // Проверяем, что navigate был вызван с правильным параметром
  });

  it('should navigate to register on goToRegister', () => {
    spyOn(router, 'navigate');  // Шпион на метод navigate
    component.goToRegister();
    expect(router.navigate).toHaveBeenCalledWith(['/register']);  // Проверяем, что navigate был вызван с правильным параметром
  });
});
