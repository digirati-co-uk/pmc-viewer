import { createStore } from '@canvas-panel/redux/es/index';
import {
  reducer as searchReducer,
  saga as searchSaga,
} from '@canvas-panel/search';

export default function createCustomStore() {
  return createStore(
    {
      search: searchReducer,
    },
    [],
    [searchSaga]
  );
}
