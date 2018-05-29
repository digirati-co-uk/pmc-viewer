import { createStore } from '@canvas-panel/redux/es/index';
import {
  reducer as searchReducer,
  saga as searchSaga,
} from '@canvas-panel/search';
import { search } from '@canvas-panel/search';

export function waitAndSearch(store, q) {
  if (!q) {
    return;
  }
  const state = store.getState();
  if (state && state.search && state.search.service) {
    store.dispatch(search.searchRequest({ q }));
  }
  const unsubscribe = store.subscribe(() => {
    if (store.getState().search.service) {
      unsubscribe();
      store.dispatch(search.searchRequest({ q }));
    }
  });
}

export default function createCustomStore() {
  return createStore(
    {
      search: searchReducer,
    },
    [],
    [searchSaga]
  );
}
