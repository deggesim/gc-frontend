import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Andamento } from '../../model/andamento';
import { AndamentoService } from '../andamento.service';

@Injectable()
export class ListaAndamentoResolver {
  constructor(private andamentoService: AndamentoService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Andamento[] | Observable<Andamento[]> | Promise<Andamento[]> {
    return this.andamentoService.lista();
  }
}
