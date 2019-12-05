import {Component, Input} from '@angular/core';

@Component({
  selector: 'cms-code-project-item',
  styleUrls: [
    './item.component.scss',
  ],
  templateUrl: './item.component.html',
})
export class ItemComponent {
  @Input('item') item;

  constructor() {
    console.log(this.item);
  }
}
