import { Component, ElementRef, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FoodData } from 'src/app/models/food-data';

@Component({
  selector: 'app-food-warrior',
  templateUrl: './food-warrior.component.html',
  styleUrls: ['./food-warrior.component.scss']
})
export class FoodWarriorComponent implements OnChanges {
  @Input() foodInput: FoodData | undefined;
  @Input() selected: boolean = false;
  @Output() onFighterClicked: EventEmitter<FoodData> = new EventEmitter<FoodData>();
  food: FoodData | undefined;

  constructor(
    public elementRef: ElementRef,
  ) { }

  ngOnChanges(): void {
    this.food = undefined; // Unless the reference is broken, the translations aren't updated.
    requestAnimationFrame(() => {
      this.food = this.foodInput;
    });
  }

  chooseFighter(): void {
    if (this.foodInput) {
      this.onFighterClicked.next(this.foodInput);
    }
  }
}
