import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Statistica } from '../../model/statistica';
import { StatisticheService } from '../statistiche.service';

@Injectable()
export class SpesaMensileResolver implements Resolve<Statistica[]> {

  constructor(
    private statisticaService: StatisticheService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Statistica[] | Observable<Statistica[]> | Promise<Statistica[]> {
    return this.statisticaService.spesa('M');
  }

}
