import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-confirm-button',
  templateUrl: './confirm-button.component.html',
  styleUrls: ['./confirm-button.component.scss']
})
export class ConfirmButtonComponent implements OnInit, OnDestroy {
  @Input() visible: boolean = true;
  @Input() textTranslationId: string = 'UI.Confirm';
  @Input() enableDisabling: boolean = true;
  @Output() onConfirmClicked: EventEmitter<void> = new EventEmitter<void>();
  fightStateChangedSubscription: Subscription | undefined;
  disabled: boolean = false;
  
  constructor(
    private _eventService: EventService,
  ) { }

  ngOnInit(): void {
    this.fightStateChangedSubscription = this._eventService.onFightStateChanged.subscribe(fightOngoing => {
      if (!this.enableDisabling) {
        return;
      }
      this.disabled = fightOngoing;
    })
  }

  ngOnDestroy(): void {
    this.fightStateChangedSubscription?.unsubscribe();
  }

  onClick(): void {
    this.onConfirmClicked.next();
  }
}
