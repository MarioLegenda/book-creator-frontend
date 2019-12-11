import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {PresentationRepository} from "../../../repository/PresentationRepository";
import {PageRepository} from "../../../repository/PageRepository";
import {viewCreatePresentation} from "../../knowledgeSource/viewActions";
import {CreatePresentationModel} from "../../../model/http/CreatePresentationModel";
import {IRequestModel} from "../../../model/IRequestModel";
import {actionTypes} from "../../knowledgeSource/httpActions";

@Injectable({
  providedIn: 'root',
})
export class HttpActionSubscriber {
  private observable;

  constructor(
    private store: Store<any>,
    private presentationRepository: PresentationRepository,
    private pageRepository: PageRepository,
  ) {
    this.subscribeToHttpActions(store.pipe(select('knowledgeSourceHttpActions')));
  }

  private subscribeToHttpActions(observable: Observable<any>) {
    this.observable = observable.subscribe((action: any) => {
      if (!action) {
        return;
      }

      switch (action.type) {
        case actionTypes.HTTP_CREATE_PRESENTATION: {
          this.createPresentation(action).then((data: any) => {
            this.store.dispatch(viewCreatePresentation(data));
          });
        }
      }
    });
  }

  private async createPresentation(action) {
    const model: IRequestModel = CreatePresentationModel.create(
      action.name,
      action.shortDescription,
      action.uuid,
      action.longDescription
    );

    const presentationData: any = await this.presentationRepository.createPresentation(model).toPromise();
    const emptyPage: any = await this.pageRepository.createEmptyPage().toPromise();

    return {
      presentation: presentationData.data,
      emptyPage: emptyPage.data,
    }
  }

  destroy() {
    this.observable.unsubscribe();
  }
}
