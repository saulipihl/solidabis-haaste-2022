import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { randomInt } from 'src/app/common/functions';
import { FoodData } from 'src/app/models/food-data';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit, OnDestroy {
  @Input() foodData: FoodData[] = [];
  selectedFighter: FoodData | undefined;
  fighterConfirmedSubscription: Subscription | undefined;
  enemyFighter: FoodData | undefined;

  constructor(
    private _eventService: EventService,
  ) { }

  ngOnInit(): void {
    this.chooseRandomEnemy();
    this.fighterConfirmedSubscription = this._eventService.onFighterConfirmed.subscribe((fighter: FoodData) => {
      this.selectedFighter = fighter;
    });
  }

  ngOnDestroy(): void {
    this.fighterConfirmedSubscription?.unsubscribe();
  }

  onStartFightClicked(): void {

  }

  /**
   * Choose a new enemy randomly.
   * Only not random thing is that the enemy can't be the same as the previous enemy.
   */
  chooseRandomEnemy(): void {
    const availableFighters = this.foodData.filter(food => food.foodNameTranslationId !== this.enemyFighter?.foodNameTranslationId);
    const randomIndex: number = randomInt(0, availableFighters.length - 1);
    this.enemyFighter = availableFighters[randomIndex];
  }
}
