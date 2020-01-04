import {Component, EventEmitter, OnDestroy} from '@angular/core';
import {ComponentTracker} from "../../../logic/PageComponent/ComponentTracker";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import { httpUpdateTextBlock } from 'src/app/store/page/httpActions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'cms-work-area',
  styleUrls: ['./work-area.component.scss'],
  templateUrl: './work-area.component.html',
})
export class WorkAreaComponent implements OnDestroy {
  components = this.componentTracker.components;

  focusTrackerEvent: EventEmitter<string> = new EventEmitter<string>();

  icons = {
    'list': 'fas fa-list',
  };

  private focusTracker = {
    focusedIndex: null,
  };

  constructor(
    private store: Store<any>,
    private componentTracker: ComponentTracker
  ) {}

  ngOnDestroy() {
    this.focusTrackerEvent.unsubscribe();
    this.focusTracker = null;
  }

  drop(event: CdkDragDrop<any>) {
    const previous: number = event.previousIndex;
    const current: number = event.currentIndex;

    const previousPosition = this.components[previous].value.position;
    const currentPosition = this.components[current].value.position;

    this.components[previous].value.position = currentPosition;
    this.components[current].value.position = previousPosition;

    const temp = this.components[previous];
    this.components[previous] = this.components[current];
    this.components[current] = temp;

    this.store.dispatch(httpUpdateTextBlock(this.createTextModel(this.components[current])));
    this.store.dispatch(httpUpdateTextBlock(this.createTextModel(this.components[previous])));
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

  private createTextModel(component): any {
    const model: any = {};
    model.blockUuid = component.value.blockUuid;
    model.text = component.value.text;
    model.position = component.value.position;

    return model;
  }
}
