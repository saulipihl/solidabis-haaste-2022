import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FoodData } from 'src/app/models/food-data';

@Component({
  selector: 'app-food-warrior',
  templateUrl: './food-warrior.component.html',
  styleUrls: ['./food-warrior.component.scss']
})
export class FoodWarriorComponent implements OnInit {
  @Input() food: FoodData | undefined;
  @Input() selected: boolean = false;
  @Output() onFighterClicked: EventEmitter<FoodData> = new EventEmitter<FoodData>();

  constructor(
    public elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
  }

  chooseFighter(): void {
    if (this.food) {
      this.onFighterClicked.next(this.food);
    }
  }
}
