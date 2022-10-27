import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FoodData } from '../models/food-data';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private fighterSelectedSubject: Subject<FoodData> = new Subject<FoodData>();
  onFighterConfirmed = this.fighterSelectedSubject.asObservable();

  // Used to inform components that fight is ongoing, e.g. for disabling them
  private fightStateSubject: Subject<boolean> = new Subject<boolean>();
  onFightStateChanged = this.fightStateSubject.asObservable();

  constructor() { }

  confirmFighter(foodData: FoodData): void {
    this.fighterSelectedSubject.next(foodData);
  }

  fightStateChanged(fightOngoing: boolean): void {
    this.fightStateSubject.next(fightOngoing);
  }
}
