import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ComponentTracker} from "../../logic/pageComponent/ComponentTracker";
import {ComponentFactory} from "../../logic/pageComponent/ComponentFactory";
import {Observable} from "rxjs";

@Component({
  selector: 'cms-work-area',
  styleUrls: ['../../web/styles/work-area.component.scss'],
  templateUrl: '../../web/templates/work-area.component.html',
})
export class WorkAreaComponent implements OnInit {
  private textBlockActions: Observable<any>;

  components = this.componentTracker.components;

  constructor(
    private store: Store<any>,
    private componentTracker: ComponentTracker
  ) {
    this.textBlockActions = store.pipe(select('textBlockActions'));
  }

  ngOnInit(): void {
    this.textBlockActions.subscribe((action) => {
      if (!action) {
        return;
      }

      console.log(action);

      const name: string = action.internalName;

      this.componentTracker.add(name, ComponentFactory.createComponent(action));
    });
  }
}
