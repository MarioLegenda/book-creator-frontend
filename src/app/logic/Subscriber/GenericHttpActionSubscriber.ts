import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {actionTypes} from "../../store/httpActions";
import {IRequestModel} from "../../model/IRequestModel";
import {CreatePresentationModel} from "../../model/http/CreatePresentationModel";
import {PresentationRepository} from "../../repository/PresentationRepository";
import {viewCreatePresentation} from "../../store/viewActions";
import {PageRepository} from "../../repository/PageRepository";

@Injectable({
  providedIn: 'root',
})
export class GenericHttpActionSubscriber {
  private observable;

  constructor(
    private store: Store<any>,
    private presentationRepository: PresentationRepository,
    private pageRepository: PageRepository,
  ) {
    this.subscribeToHttpActions(store.pipe(select('httpActions')));
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
