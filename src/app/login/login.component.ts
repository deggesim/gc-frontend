import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utente } from '../model/utente';
import { AuthService } from '../services/auth.service';
import * as globals from '../shared/globals';
import { SharedService } from '../shared/shared.service';
@Component({
  selector: 'gc-login',
  templateUrl: './login.component.html',
  standalone: false,
})
export class LoginComponent {
  form = this.fb.group({
    email: [null as string | null, Validators.required],
    password: [null as string | null, Validators.required],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private sharedService: SharedService
  ) {}

  public login() {
    const utente: Utente = {
      email: this.form.value.email as string,
      password: this.form.value.password as string,
    };
    this.authService.login(utente).subscribe(() => {
      const title = 'Login';
      const message = 'Login effettuato correttamente';
      this.sharedService.notifica(globals.toastType.success, title, message);
      this.router.navigate(['/home']);
    });
  }
}
