import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {actionTypes} from "../../store/httpActions";
import {HttpClient} from "@angular/common/http";
import {IRequestModel} from "../../model/http/IRequestModel";
import {CreatePresentationModel} from "../../model/http/CreatePresentationModel";
import {PresentationRepository} from "../../repository/PresentationRepository";
import {viewCreatePresentation} from "../../store/viewActions";

@Injectable({
  providedIn: 'root',
})
export class GenericHttpActionSubscriber {
  constructor(
    private store: Store<any>,
    private presentationRepository: PresentationRepository,
  ) {
    this.subscribeToHttpActions(store.pipe(select('httpActions')));
  }

  private subscribeToHttpActions(observable: Observable<any>) {
    observable.subscribe((action: any) => {
      if (!action) {
        return;
      }

      switch (action.type) {
        case actionTypes.HTTP_CREATE_PRESENTATION: {
          this.createPresentation(action);
        }
      }
    });
  }

  private createPresentation(action) {
    const model: IRequestModel = CreatePresentationModel.create(
      action.name,
      action.shortDescription,
      action.uuid,
      action.longDescription
    );

    this.presentationRepository.createPresentation(model).subscribe((body: any) => {
      this.store.dispatch(viewCreatePresentation(body.data));
    })
  }
}
