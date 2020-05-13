import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Item} from "../../shared/listingFilter/Item";

@Component({
  selector: 'cms-listing-filter',
  styleUrls: [
    './listing-filter.component.scss',
  ],
  templateUrl: './listing-filter.component.html',
})
export class ListingFilterComponent {
  selected: string[] = [];
  @Input('filters') filters: Item[];
  @Output('stateChangedEvent') stateChangedEvent: EventEmitter<string[]> = new EventEmitter<string[]>();

  onToggle(type: string) {
    if (this.selected.includes(type)) {
      const idx: number = this.selected.indexOf(type);

      if (idx !== -1) {
        this.selected.splice(idx, 1);
      }
    } else {
      this.selected.push(type);
    }

    this.stateChangedEvent.emit(this.selected);
  }
}
