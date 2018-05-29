import { createStore } from '@canvas-panel/redux/es/index';
import {
  reducer as searchReducer,
  saga as searchSaga,
} from '@canvas-panel/search';
import { search } from '@canvas-panel/search';

function addInitialSearch(store, q) {
  if (!q) {
    return;
  }
  const unsubscribe = store.subscribe(() => {
    if (store.getState().search.service) {
      unsubscribe();
      store.dispatch(search.searchRequest({ q }));
    }
  });
}

export default function createCustomStore({ initialSearch } = {}) {
  const store = createStore(
    {
      search: searchReducer,
    },
    [],
    [searchSaga]
  );

  addInitialSearch(store, initialSearch);

  return store;
}
