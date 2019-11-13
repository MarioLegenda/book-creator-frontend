import {Component} from '@angular/core';
import {ComponentTracker} from "../../logic/pageComponent/ComponentTracker";
import {CdkDragDrop} from "@angular/cdk/drag-drop";

@Component({
  selector: 'cms-work-area',
  styleUrls: ['../../web/styles/work-area.component.scss'],
  templateUrl: '../../web/templates/cms/work-area.component.html',
})
export class WorkAreaComponent {
  components = this.componentTracker.components;

  constructor(
    private componentTracker: ComponentTracker
  ) {}

  drop(event: CdkDragDrop<any>) {
    console.log(event);
  }
}
