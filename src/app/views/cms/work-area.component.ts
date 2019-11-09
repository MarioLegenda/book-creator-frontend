import {Component} from '@angular/core';
import {ComponentTracker} from "../../logic/pageComponent/ComponentTracker";

@Component({
  selector: 'cms-work-area',
  styleUrls: ['../../web/styles/work-area.component.scss'],
  templateUrl: '../../web/templates/work-area.component.html',
})
export class WorkAreaComponent {
  components = this.componentTracker.components;

  constructor(
    private componentTracker: ComponentTracker
  ) {}
}
