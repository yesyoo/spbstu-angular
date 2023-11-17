import { Injectable } from '@angular/core';
import { StatisticRestService } from '../statistic-rest/statistic-rest.service';
import { Observable, map } from 'rxjs';
import { ICustomStatisticUser } from '../../models/statistic';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private staisticUserRest: StatisticRestService) { }
  
  getUserStatistic(): Observable<ICustomStatisticUser[]> {
    return this.staisticUserRest.getUserStatistic().pipe(
      map((data) => {
        const newDataArr: ICustomStatisticUser[] = [];
        data.forEach((el) => {
          const newDataObj: ICustomStatisticUser = {
            id: el.id,
            name: el.name,
            city: el.address.city,
            company: el.company.name,
            phone: el.phone,
            street: el.address.street
          };
          newDataArr.push(newDataObj)
        })
        return newDataArr
      })
    )
  };
};
