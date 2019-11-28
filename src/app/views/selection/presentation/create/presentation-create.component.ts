import {Component} from '@angular/core';
import {PresentationCreateModel} from "./services/PresentationCreateModel";

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

  onSubmit() {
    console.log(this.model);
  }
}
