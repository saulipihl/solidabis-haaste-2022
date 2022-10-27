import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { FoodData } from 'src/app/models/food-data';
import { EventService } from 'src/app/services/event.service';


@Component({
  selector: 'app-food-warrior',
  templateUrl: './food-warrior.component.html',
  styleUrls: ['./food-warrior.component.scss'],
})
export class FoodWarriorComponent implements OnInit, OnChanges, OnDestroy {
  @Input() foodInput: FoodData | undefined;
  @Input() selected: boolean = false;
  @Output() onFighterClicked: EventEmitter<FoodData> = new EventEmitter<FoodData>();
  food: FoodData | undefined;
  foodName: string = '';
  eventServiceSubscription: Subscription | undefined;
  disabled: boolean = false;

  constructor(
    public elementRef: ElementRef,
    private _eventService: EventService,
    private _translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.eventServiceSubscription = this._eventService.onFightStateChanged.subscribe(fightOngoing => {
      this.disabled = fightOngoing;
    });
  }

  ngOnChanges(): void {
    this.foodName = this.foodInput?.foodNameTranslationId ? this._translate.instant(this.foodInput.foodNameTranslationId) : '';
    requestAnimationFrame(() => {
      this.food = this.foodInput;
    });
  }

  ngOnDestroy(): void {
    this.eventServiceSubscription?.unsubscribe();
  }

  chooseFighter(): void {
    if (this.foodInput && !this.disabled) {
      this.onFighterClicked.next(this.foodInput);
    }
  }
}
