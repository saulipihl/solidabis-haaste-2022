import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FoodData } from 'src/app/models/food-data';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-character-selection',
  templateUrl: './character-selection.component.html',
  styleUrls: ['./character-selection.component.scss']
})
export class CharacterSelectionComponent implements OnInit {

  chosenFighter: FoodData | undefined;

  @Input() foodData: FoodData[] = [];
  @ViewChildren("warrior") warriorDivs: QueryList<ElementRef<HTMLDivElement>> = new QueryList<ElementRef<HTMLDivElement>>();
  @ViewChild("warriors") warriorContainerDiv: ElementRef<HTMLDivElement> | undefined;

  constructor(
    private _eventService: EventService,
  ) { }

  ngOnInit(): void {
  }

  moveWarriors(direction: 'left' | 'right'): void {
    // + 10 because of the gap
    const slideWidth = this.warriorDivs.first.nativeElement.clientWidth + 10;
    if (this.warriorContainerDiv) {
      if (direction === 'left') {
        this.warriorContainerDiv.nativeElement.scrollLeft += slideWidth;
      } else {
        this.warriorContainerDiv.nativeElement.scrollLeft -= slideWidth;
      }
    }
  }

  chooseFighter(food: FoodData): void {
    this.chosenFighter = food;
  }

  onConfirmClicked(): void {
    if (this.chosenFighter) {
      this._eventService.confirmFighter(this.chosenFighter);
    }
  }
}
