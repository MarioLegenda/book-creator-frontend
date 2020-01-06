import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ComponentTracker} from "../../../logic/PageComponent/ComponentTracker";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {httpCreateTextBlock, httpUpdateTextBlock} from 'src/app/store/page/httpActions';
import {Store} from '@ngrx/store';
import {addPosition} from "../../../logic/utilFns";

@Component({
  selector: 'cms-work-area',
  styleUrls: ['./work-area.component.scss'],
  templateUrl: './work-area.component.html',
})
export class WorkAreaComponent implements OnInit, OnDestroy {
  components = [];

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

    this.componentTracker.subscribe((value, type: string) => {
      if (value === null) return;

      switch (type) {
        case 'position': {
          const idx = this.components.findIndex(val => val.value.position === value);

          this.components.splice(idx, 1);

          break;
        }
        case 'component': {
          this.components.push(addPosition(value, this.components));

          break;
        }
        case 'array': {
          for (const c of value) {
            addPosition(c, value);
          }

          this.components = value;
        }
      }
    });
  }

  ngOnDestroy() {
    this.componentTracker.destroy();
    this.components = [];
  }

  onBlockAdded(type: string) {
    switch (type) {
      case 'text-block': {
        this.store.dispatch(httpCreateTextBlock({position: this.componentTracker.getNextPosition()}));
      }
    }
  }

  drop(event: CdkDragDrop<any>) {
    const previous: any = this.components[event.previousIndex];
    const current: any = this.components[event.currentIndex];

    const temp = previous.value.position;
    previous.value.position = current.value.position;
    current.value.position = temp;

    this.store.dispatch(httpUpdateTextBlock(this.createTextModel(previous)));
    this.store.dispatch(httpUpdateTextBlock(this.createTextModel(current)));

    moveItemInArray(this.components, event.previousIndex, event.currentIndex);
  }

  private createTextModel(component): any {
    const model: any = {};
    model.blockUuid = component.value.blockUuid;
    model.text = component.value.text;
    model.position = component.value.position;

    return model;
  }
}
