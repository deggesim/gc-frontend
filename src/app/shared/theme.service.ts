// theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ThemeService {
  private _theme = new BehaviorSubject<string>('dark');
  theme$ = this._theme.asObservable();

  setTheme(theme: string): void {
    this._theme.next(theme);
  }

  getTheme(): string {
    return this._theme.value;
  }

  darkMode = () => {
    return this._theme.value === 'dark';
  };
}
