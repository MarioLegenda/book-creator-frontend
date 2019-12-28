import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {actionTypes, httpRemoveFileFinished} from "../../editor/httpActions";
import {viewEditorShowFile} from "../../editor/viewActions";
import {FileRepository} from "../../../repository/FileRepository";
import {TabSession} from "../../sessions/TabSession";

@Injectable({
  providedIn: 'root',
})
export class HttpActionSubscriber {
  constructor(
    private store: Store<any>,
    private tabSession: TabSession,
    private fileRepository: FileRepository,
  ) {
    this.subscribeToHttpActions(store.pipe(select('editorHttpActions')));
  }

  private subscribeToHttpActions(observable: Observable<any>) {
    observable.subscribe((action: any) => {
      if (!action) {
        return;
      }

      switch (action.type) {
        case actionTypes.EDITOR_HTTP_GET_FILE_CONTENT: {
          if (this.tabSession.has(action.id)) return;

          this.fileRepository.getFileContent(action.codeProjectUuid, action.id).subscribe((res: any) => {
            action.content = res.data.content;

            this.store.dispatch(viewEditorShowFile(action));
          });

          break;
        }

        case actionTypes.EDITOR_HTTP_REMOVE_FILE: {
          this.fileRepository.removeFileById({
            data: {
              codeProjectUuid: action.codeProjectUuid,
              fileId: action.id,
            }
          }).subscribe(() => {
            this.store.dispatch(httpRemoveFileFinished(action));
          });

          break;
        }
      }
    });
  }

  destroy() {
  }
}
