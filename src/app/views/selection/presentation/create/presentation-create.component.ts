import {Component} from '@angular/core';
import {PresentationCreateModel} from "./services/PresentationCreateModel";
import {Store} from "@ngrx/store";
import {HttpActionSubscriber} from "../../../../store/subscriber/knowledgeSource/HttpActionSubscriber";
import {ViewActionSubscriber} from "../../../../store/subscriber/knowledgeSource/ViewActionSubscriber";
import {httpCreatePresentation} from "../../../../store/knowledgeSource/httpActions";

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
    private genericHttpActionSubscriber: HttpActionSubscriber,
    private genericViewActionSubscriber: ViewActionSubscriber,
  ) {}

  onSubmit() {
    this.store.dispatch(httpCreatePresentation(this.model));
  }
}
