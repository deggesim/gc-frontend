import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utente } from '../model/utente';
import * as globals from '../shared/globals';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Output() salva: EventEmitter<any> = new EventEmitter(true);
  @Output() annulla: EventEmitter<any> = new EventEmitter(true);

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    const utente: Utente = JSON.parse(localStorage.getItem('utente'));
    this.form = this.fb.group({
      id: utente.id,
      email: [utente.email, Validators.required],
      newPassword: [undefined, Validators.required],
      confirmPassword: [undefined, Validators.required],
    });
  }

  confirm(): void {
    if (this.form.value.newPassword === this.form.value.confirmPassword) {
      const utente: Utente = {
        id: this.form.value.id,
        email: this.form.value.email,
        password: this.form.value.newPassword,
      };
      this.salva.emit(utente);
    } else {
      const title = 'Errore password';
      const message = 'Le password non coincidono';
      this.sharedService.notifica(globals.toastType.warning, title, message);
    }
  }

}
