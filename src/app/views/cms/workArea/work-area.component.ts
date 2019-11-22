import {Component, EventEmitter, OnDestroy} from '@angular/core';
import {ComponentTracker} from "../../../logic/PageComponent/ComponentTracker";
import {CdkDragDrop} from "@angular/cdk/drag-drop";

@Component({
  selector: 'cms-work-area',
  styleUrls: ['./work-area.component.scss'],
  templateUrl: './work-area.component.html',
})
export class WorkAreaComponent implements OnDestroy {
  components = this.componentTracker.components;

  focusTrackerEvent: EventEmitter<string> = new EventEmitter<string>();

  private focusTracker = {
    focusedIndex: null,
  };

  constructor(
    private componentTracker: ComponentTracker
  ) {}

  ngOnDestroy() {
    this.focusTrackerEvent.unsubscribe();
    this.focusTracker = null;
  }

  drop(event: CdkDragDrop<any>) {
  }

  onTextBlockFocus(index) {
    if (this.focusTracker.focusedIndex === null) {
      return this.focusTracker.focusedIndex = index;
    }

    if (this.focusTracker.focusedIndex === index) {
      this.focusTracker.focusedIndex = index;

      return;
    }

    if (this.focusTracker.focusedIndex !== index) {
      this.focusTrackerEvent.emit(this.focusTracker.focusedIndex);

      this.focusTracker.focusedIndex = index;
    }
  }

  trackByFn(index) {
    return index;
  }
}
