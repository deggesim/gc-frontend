import { TipoSpesa } from './tipo-spesa';

export interface Andamento {
  id?: number | null;
  giorno: Date;
  descrizione: string;
  costo?: number;
  tipoSpesa: TipoSpesa;
}
