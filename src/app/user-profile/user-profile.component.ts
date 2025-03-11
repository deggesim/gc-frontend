import { Component, EventEmitter, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Utente } from '../model/utente';
import * as globals from '../shared/globals';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'gc-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: false,
})
export class UserProfileComponent {
  @Output() salva: EventEmitter<Utente> = new EventEmitter(true);
  @Output() annulla: EventEmitter<void> = new EventEmitter(true);

  utente: Utente = JSON.parse(localStorage.getItem('utente') as string);
  form = this.fb.group({
    email: [this.utente.email, Validators.required],
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private sharedService: SharedService
  ) {}

  confirm(): void {
    if (this.form.value.newPassword === this.form.value.confirmPassword) {
      const utente: Utente = {
        id: this.utente.id,
        email: this.form.controls.email.value,
        password: this.form.controls.newPassword.value,
      };
      this.salva.emit(utente);
    } else {
      const title = 'Errore password';
      const message = 'Le password non coincidono';
      this.sharedService.notifica(globals.toastType.warning, title, message);
    }
  }
}
