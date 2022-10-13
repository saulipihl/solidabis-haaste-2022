import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FoodData } from '../models/food-data';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private fighterSelectedSubject: Subject<FoodData> = new Subject<FoodData>();
  onFighterConfirmed = this.fighterSelectedSubject.asObservable();

  constructor() { }

  confirmFighter(foodData: FoodData): void {
    this.fighterSelectedSubject.next(foodData);
  }
}
