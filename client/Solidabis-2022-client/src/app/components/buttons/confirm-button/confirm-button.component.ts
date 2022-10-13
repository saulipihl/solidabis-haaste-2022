import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-button',
  templateUrl: './confirm-button.component.html',
  styleUrls: ['./confirm-button.component.scss']
})
export class ConfirmButtonComponent {
  @Input() visible: boolean = true;
  @Input() textTranslationId: string = 'UI.Confirm';
  @Output() onConfirmClicked: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }

  onClick(): void {
    this.onConfirmClicked.next();
  }
}
