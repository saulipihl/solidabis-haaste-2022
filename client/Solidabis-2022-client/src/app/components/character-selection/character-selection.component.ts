import { Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FoodData } from 'src/app/models/food-data';
import { EventService } from 'src/app/services/event.service';
import { FoodWarriorComponent } from '../food-warrior/food-warrior.component';

@Component({
  selector: 'app-character-selection',
  templateUrl: './character-selection.component.html',
  styleUrls: ['./character-selection.component.scss']
})
export class CharacterSelectionComponent {

  chosenFighter: FoodData | undefined;

  @Input() foodData: FoodData[] = [];
  @ViewChildren("warrior") warriorDivs: QueryList<FoodWarriorComponent> = new QueryList<FoodWarriorComponent>();
  @ViewChild("warriors") warriorContainerDiv: ElementRef<HTMLDivElement> | undefined;

  constructor(
    private _eventService: EventService,
  ) { }

  moveWarriors(direction: 'left' | 'right'): void {
    // + 20 because of the gap
    this.warriorDivs.first
    const slideWidth = this.warriorDivs.first.elementRef.nativeElement.clientWidth + 20;
    if (this.warriorContainerDiv) {
      if (direction === 'left') {
        this.warriorContainerDiv.nativeElement.scrollLeft += slideWidth;
      } else {
        this.warriorContainerDiv.nativeElement.scrollLeft -= slideWidth;
      }
    }
  }

  onFighterClicked(food: FoodData): void {
    this.chosenFighter = food;
  }

  onConfirmClicked(): void {
    if (this.chosenFighter) {
      this._eventService.confirmFighter(this.chosenFighter);
      setTimeout(() => {
        document.getElementById('battle-card')?.scrollIntoView({ behavior: 'smooth' });
      }, 10)
    }
  }
}
