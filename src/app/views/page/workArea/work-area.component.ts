import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ComponentTracker} from "../../../logic/PageComponent/ComponentTracker";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import { httpUpdateTextBlock } from 'src/app/store/page/httpActions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'cms-work-area',
  styleUrls: ['./work-area.component.scss'],
  templateUrl: './work-area.component.html',
})
export class WorkAreaComponent implements OnInit {
  components = this.componentTracker.components;

  icons = {
    'list': 'fas fa-list',
  };
  // @ts-ignore
  @ViewChild('workAreaRef') workAreaRef: ElementRef;

  constructor(
    private store: Store<any>,
    private componentTracker: ComponentTracker,
  ) {}

  ngOnInit(): void {
    const h = document.body.offsetHeight;
    this.workAreaRef.nativeElement.setAttribute('style', `min-height: ${h}px`);
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
