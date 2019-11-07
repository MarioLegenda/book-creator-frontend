import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'cms-component',
  styleUrls: ['./scss/cms.component.scss'],
  templateUrl: './html/cms.component.html',
})
export class CmsComponent {
  menuSelection: Observable<number>;

  constructor(private store: Store<{ count: number }>) {
    this.menuSelection = store.pipe(select('menuSelection'));
  }
}
