import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Statistica } from '../../model/statistica';
import { StatisticheService } from '../statistiche.service';

@Injectable()
export class SpesaResolver {
  constructor(private statisticaService: StatisticheService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Statistica[] | Observable<Statistica[]> | Promise<Statistica[]> {
    const period = route.data['period'] ? route.data['period'] : 'M';
    return this.statisticaService.spesa(period);
  }
}
