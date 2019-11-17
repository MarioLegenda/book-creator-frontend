import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {IContext} from "./IContext";
import {Store} from "@ngrx/store";
import {PageContext} from "./PageContext";
import {environment} from "../../../../environments/environment";
import {textBlockCreated} from "../../../store/actions";
import {ComponentType} from "../ComponentType";

@Injectable({
  providedIn: 'root',
})
export class PageContextService {
  private page: IContext;

  private contextInitiated = false;

  constructor(
    private httpClient: HttpClient,
    private store: Store<any>
  ) {}

  isValidContext(): boolean {
    if (!this.contextInitiated) return false;

    if (!this.page) return false;

    if (!this.page.uuid) return false;

    return true;
  }

  initContext(activatedRoute: ActivatedRoute) {
    const pageUuid = activatedRoute.snapshot.paramMap.get('pageUuid');

    this.page = new PageContext();
    this.page.uuid = pageUuid;

    const url = `${environment.composeBaseUrl()}/api/v1/pages/get-by-uuid/${pageUuid}`;

/*    this.httpClient.get(url).subscribe((res: object) => {
      // @ts-ignore
      const blocks = res.data.blocks;

      for (const [_, block] of Object.entries(blocks)) {
        (block as any).componentType = ComponentType.TEXT_BLOCK_TYPE;

        this.store.dispatch(textBlockCreated(block as object));
      }
    });*/

    this.contextInitiated = true;
  }

  get pageUuid() {
    return this.page.uuid;
  }
}
