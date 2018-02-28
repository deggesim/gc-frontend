import { TipoSpesa } from './tipo-spesa';

export interface Andamento {
    id?: number;
    giorno: Date;
    descrizione: string;
    costo?: number;
    tipoSpesa: TipoSpesa;
}
