import { combineReducers } from 'redux';

import userSlice from '../slices/user';
import uiSlce from '../slices/ui';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  ui: uiSlce.reducer,
});

export default rootReducer;
