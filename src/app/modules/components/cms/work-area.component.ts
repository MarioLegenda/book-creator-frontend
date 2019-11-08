import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ComponentTracker} from "../../../services/tracking/ComponentTracker";
import {ComponentFactory} from "../../../services/tracking/ComponentFactory";
import {Observable} from "rxjs";

@Component({
  selector: 'cms-work-area',
  styleUrls: ['./scss/work-area.component.scss'],
  templateUrl: './html/work-area.component.html',
})
export class WorkAreaComponent implements OnInit{
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
      if (!action) return;

      this.componentTracker.add(ComponentFactory.createComponent(action));
    });
  }
}
