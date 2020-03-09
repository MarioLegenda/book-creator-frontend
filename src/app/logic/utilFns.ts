import {BlogState} from "./BlogState";
import {httpChangeBlogState} from "../store/page/httpActions";
import {AppContext} from "./PageComponent/context/AppContext";

export function getMaxPosition(components: any[]): number {
  let max: number = 0;
  for (const c of components) {
    if (c.position > max) {
      max = c.position;
    }
  }

  return max;
}

export function addPosition(component, components: any[]) {
  const max: number = getMaxPosition(components);

  component.position = max + 1;

  return component;
}

export function changeState(appContext: AppContext, store) {
  const currState = appContext.knowledgeSource.state;

  if (currState === BlogState.CHANGED) return;
  if (currState === BlogState.DRAFT) return;

  const stateObj = {
    uuid: appContext.knowledgeSource.uuid,
    state: BlogState.CHANGED,
    hashtags: null,
  };

  appContext.updateSource('state', BlogState.CHANGED);

  store.dispatch(httpChangeBlogState(stateObj));
}
