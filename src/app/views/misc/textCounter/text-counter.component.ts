import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'cms-text-counter',
  styleUrls: [
    './text-counter.component.scss',
  ],
  templateUrl: './text-counter.component.html',
})
export class TextCounterComponent implements OnChanges {
  @Input('text') text: string;
  @Input('max') max: number;

  current: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.text.currentValue !== changes.text.previousValue) {
      this.current = changes.text.currentValue.length;
    }
  }
}
