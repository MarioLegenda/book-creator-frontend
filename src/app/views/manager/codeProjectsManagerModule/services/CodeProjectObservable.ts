import {ICodeProject} from "../../../codeEditor/models/ICodeProject";
import {Injectable} from "@angular/core";
import {Observable, ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CodeProjectObservable {
  private observable: ReplaySubject<ICodeProject> = new ReplaySubject();

  emit(codeProject: ICodeProject) {
    this.observable.next(codeProject);
  }

  subscribe(fn) {
    return this.observable.subscribe(fn);
  }
}
