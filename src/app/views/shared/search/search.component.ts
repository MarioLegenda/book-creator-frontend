import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounceTime} from "rxjs/operators";
import {HttpModel} from "../../../model/http/HttpModel";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'cms-search',
  styleUrls: [
    './search.component.scss',
  ],
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  private typeAheadSource = new Subject<string>();
  private typeAheadObservable: Subscription = null;

  @Output('onSearchTermEvent') onSearchTermEvent = new EventEmitter();

  componentState = {
    searchTerm: '',
    placeholder: true,
  };

  ngOnInit() {
    this.subscribeTypeahead();
  }

  onChange() {
    this.typeAheadSource.next(this.componentState.searchTerm);
  }

  onFocus() {
    this.componentState.placeholder = false;
  }

  onBlur() {
    if (!this.componentState.searchTerm) {
      this.componentState.placeholder = true;
    }
  }

  private subscribeTypeahead() {
    this.typeAheadObservable = this.typeAheadSource.pipe(
      debounceTime(500),
    )
      .subscribe(() => {
        this.onSearchTermEvent.emit(this.componentState.searchTerm);
      });
  }
}
