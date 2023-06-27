import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Statistica } from '../../model/statistica';
import { StatisticheService } from '../statistiche.service';

@Injectable()
export class BollettaResolver implements Resolve<Statistica[]> {
  constructor(private statisticaService: StatisticheService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Statistica[] | Observable<Statistica[]> | Promise<Statistica[]> {
    const period = route.data['period'] ? route.data['period'] : 'M';
    return this.statisticaService.bolletta(period);
  }
}
