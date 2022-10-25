import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  @Input() className: string = 'progress-bar';
  @Input() icon: string | undefined;
  @Input() maxValue: number | undefined;
  @Input() currentValue: number | undefined;

  constructor() { }
}
