import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import {Store} from '@ngrx/store';
import {textBlockCreated, textBlockMenuClicked} from '../../../../../store/actions';
import {ComponentType} from "../../../../../logic/PageComponent/ComponentType";
import {ComponentTracker} from "../../../../../logic/PageComponent/ComponentTracker";
import {FormGroupHelper} from "../../../../../library/FormGroupHelper";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";
import {PageContextService} from "../../../../../logic/PageComponent/context/PageContextService";
import {TextBlockModel} from "../../../../../model/http/TextBlockModel";
import {IRequestModel} from "../../../../../model/http/IRequestModel";

@Component({
  selector: 'cms-create-text-block',
  styleUrls: ['../../../../../web/styles/blocks/textBlock/text-block-create.component.scss'],
  templateUrl: '../../../../../web/templates/cms/blocks/textBlock/create/text-block.component.html',
})
export class TextBlockComponent {
  constructor(
    private store: Store<any>,
    private componentTracker: ComponentTracker,
    public formGroupHelper: FormGroupHelper,
    private httpClient: HttpClient,
    private pageContext: PageContextService
  ) {}

  textBlockForm = new FormGroup({
    internalName: new FormControl('',{
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(255), (control: AbstractControl) => {
        if (this.componentTracker.hasBy(value => value.internalName === control.value)) {
          return {internalNameUnique: true};
        }

        return null;
      }]
    }),
    shortDescription: new FormControl(''),
  });

  onSubmit() {
    if (this.formGroupHelper.isValid(this.textBlockForm) && this.pageContext.isValidContext()) {
      const url = `${environment.composeBaseUrl()}/api/v1/pages/text-block/add-new-block`;

      const model: IRequestModel = TextBlockModel.create(
        this.textBlockForm.get('internalName').value,
        this.textBlockForm.get('shortDescription').value,
        null,
        this.pageContext.pageUuid,
      );

      this.httpClient.put(url, model).subscribe((res: any) => {
        const component = {
          ...{internalName: res.data.internalName, shortDescription: res.data.shortDescription},
          ...{componentType: ComponentType.TEXT_BLOCK_TYPE}
        };

        this.store.dispatch(textBlockMenuClicked());
        this.store.dispatch(textBlockCreated(component));
      });

    }
  }
}
