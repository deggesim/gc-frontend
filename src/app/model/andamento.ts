import { TipoSpesa } from './tipo-spesa';

export interface Andamento {
  id?: number | null;
  giorno: string;
  descrizione: string;
  costo?: number;
  tipoSpesa: TipoSpesa;
}
