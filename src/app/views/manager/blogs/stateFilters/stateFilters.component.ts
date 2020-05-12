import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'cms-state-filters',
  styleUrls: [
    './stateFilters.component.scss',
  ],
  templateUrl: './stateFilters.component.html',
})
export class StateFiltersComponent {
  selected: string[] = [];
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
