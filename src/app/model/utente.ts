import { Token } from './token';

export interface Utente {
  id?: number;
  email: string;
  password: string;
  tokens?: Token[];
}
