import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Utente } from '../model/utente';

@Component({
  selector: 'gc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() login: EventEmitter<Utente> = new EventEmitter(true);
  @Output() annulla: EventEmitter<void> = new EventEmitter(true);

  form = this.fb.group({
    email: [null as string | null, Validators.required],
    password: [null as string | null, Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  confirm(): void {
    const utente: Utente = {
      email: this.form.value.email as string,
      password: this.form.value.password as string,
    };
    this.login.emit(utente);
  }
}
