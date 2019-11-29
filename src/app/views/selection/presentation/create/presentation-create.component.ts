import {Component} from '@angular/core';
import {PresentationCreateModel} from "./services/PresentationCreateModel";
import {Store} from "@ngrx/store";
import {httpCreatePresentation} from "../../../../store/httpActions";
import {GenericHttpActionSubscriber} from "../../../../logic/Subscriber/GenericHttpActionSubscriber";
import {GenericViewActionSubscriber} from "../../../../logic/Subscriber/GenericViewActionSubscriber";

@Component({
  selector: 'cms-presentation-create',
  styleUrls: [
    './../../global.scss',
    './presentation-create.component.scss',
  ],
  templateUrl: './presentation-create.component.html',
})
export class PresentationCreateComponent {
  model: PresentationCreateModel = new PresentationCreateModel();

  constructor(
    private store: Store<any>,
    private genericHttpActionSubscriber: GenericHttpActionSubscriber,
    private genericViewActionSubscriber: GenericViewActionSubscriber,
  ) {}

  onSubmit() {
    this.store.dispatch(httpCreatePresentation(this.model));
  }
}
